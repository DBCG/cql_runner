import { Component, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import * as glob from '../menu/example';
import { Configuration } from '../config/config.model';
import { ConfigService } from '../config/config.service';
import { CodeMirrorDirective } from '../../shared/code-mirror/code-mirror.directive';
import { EditorType } from '../../shared/code-mirror/code-mirror.model';
import { environment } from 'src/environments/environment';

@Component ({
  selector: 'app-runner',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css'],
  providers: [ ApiService ]
})

export class RunnerComponent {
  constructor(private apiService: ApiService, private configService: ConfigService) {
    this.config = configService.config;
  }


  EditorType = EditorType;
  @ViewChildren(CodeMirrorDirective) codeEditors: QueryList<CodeMirrorDirective>;
  error = '';
  running = false;

  oValue: string;
  private config: Configuration;

  output = 'Error formatting CQL code';

  private readonly CQL_TYPE_URL = 'http://hl7.org/fhir/StructureDefinition/cqf-cqlType';
  private readonly EMPTY_LIST_URL = 'http://hl7.org/fhir/StructureDefinition/cqf-isEmptyList';
  getInputEditor() {
    return this.codeEditors.find((mirror) => mirror.type === EditorType.input);
  }

  run() {
    this.clear();
    if (!this.running) {
      this.running = true;
      const input = this.codeEditors.find((mirror) => mirror.type === EditorType.input);
      this.config.value = input.value;
      this.apiService.post(this.config)
        .forEach(responses => {
          this.processResponses(responses);
          this.running = false;
        })
        .catch(error => {
          this.error = error;
          this.running = false;
          this.oValue += '>> Engine Service call failed: ' + error + '\n';
          this.updateOutput();
        });
    }
  }

  processResponses(responses: any) {
    this.oValue += '\n';

    if (!responses || !responses.parameter || !Array.isArray(responses.parameter)) {
      this.oValue += '>> No results returned.\n';
      this.updateOutput();
      return;
    }

    // Group parameters by name to support list-valued results (multiple entries with the same name)
    const groups = new Map<string, any[]>();
    for (const p of responses.parameter) {
      const name = p && p.name ? p.name : '(unnamed)';
      let bucket = groups.get(name);
      if (!bucket) {
        bucket = [];
        groups.set(name, bucket);
      }
      bucket.push(p);
    }

    for (const [name, items] of groups.entries()) {
      const first = items[0];
      const typeHint = this.getCqlType(first);

      // Determine whether this is a list-valued result according to the CQL IG mapping for $cql/
      // - Lists are represented as multiple Parameters entries with the same name
      // - Empty lists are indicated via cqf-isEmptyList on _valueBoolean
      // - Lists of lists use part elements named "element"
      const isList = items.length > 1 || this.isExplicitList(items[0]);

      if (isList) {
        if (this.isEmptyList(items[0])) {
          this.oValue += `>> ${name}${typeHint ? ' (' + typeHint + ')' : ''}: { }\n`;
          continue;
        }

        // Build a single CQL-style list representation: { a, b, c } or nested { { ... }, { ... } }
        const elements: any[] = [];
        for (const it of items) {
          if (Array.isArray(it.part) && it.part.length > 0 && it.part.every((pt: any) => pt && pt.name === 'element')) {
            // list-of-lists element
            const inner = it.part.map((pt: any) => this.extractValueFromPart(pt));
            elements.push(inner);
          } else {
            const vKey = this.getValueKey(it);
            const val = vKey ? it[vKey] : (it.resource ? it.resource : (it.part ? this.extractTuple(it.part) : undefined));
            elements.push(val);
          }
        }
        const cqlList = this.toCqlList(elements);
        this.oValue += `>> ${name}${typeHint ? ' (' + typeHint + ')' : ''}: ${cqlList}\n`;
      } else {
        // Single (non-list) result
        const it = first;
        const vKey = this.getValueKey(it);
        const val = vKey ? it[vKey] : (it.resource ? it.resource : (it.part ? this.extractTuple(it.part) : undefined));
        const formatted = this.formatValue(val, 2);
        this.oValue += `>> ${name}${typeHint ? ' (' + typeHint + ')' : ''}: ${formatted}\n`;
      }
    }

    this.updateOutput();
  }

  displayOutput() {
    const input = this.codeEditors.find((mirror) => mirror.type === EditorType.input);
    input.value = this.output;
  }

  setConfig(config: Configuration) {
    this.config = config;
  }

  clear() {
    this.oValue = '';
    const output = this.codeEditors.find((mirror) => mirror.type === EditorType.output);
    output.value = '';
  }

  private updateOutput() {
    const output = this.codeEditors.find((mirror) => mirror.type === EditorType.output);
    output.value = this.oValue;
  }

  private getCqlType(param: any): string | undefined {
    const ext = Array.isArray(param?.extension) ? param.extension : [];
    const match = ext.find((e: any) => e?.url === this.CQL_TYPE_URL && typeof e?.valueString === 'string');
    return match?.valueString;
  }

  private isEmptyList(param: any): boolean {
    const exts = param?._valueBoolean?.extension;
    if (!Array.isArray(exts)) {
      return false;
    }
    return exts.some((e: any) => e?.url === this.EMPTY_LIST_URL && e?.valueBoolean === true);
  }

  private isExplicitList(param: any): boolean {
    // Multiple entries with the same name are handled by grouping, but
    // a single entry can still represent a list-of-lists via part.name === 'element'
    if (this.isEmptyList(param)) {
      return true;
    }
    if (Array.isArray(param?.part) && param.part.length > 0) {
      return param.part.every((pt: any) => pt?.name === 'element');
    }
    return false;
  }

  private getValueKey(obj: any): string | null {
    if (!obj || typeof obj !== 'object') {
      return null;
    }
    const key = Object.keys(obj).find(k => k.startsWith('value') && !k.startsWith('_value'));
    return key || null;
  }

  private extractTuple(parts: any[]): any {
    // Build an object from parts; duplicate names become arrays
    const out: any = {};
    if (!Array.isArray(parts)) {
      return out;
    }
    for (const p of parts) {
      const val = this.extractValueFromPart(p);
      if (p && typeof p.name === 'string') {
        if (out.hasOwnProperty(p.name)) {
          if (Array.isArray(out[p.name])) {
            out[p.name].push(val);
          } else {
            out[p.name] = [out[p.name], val];
          }
        } else {
          out[p.name] = val;
        }
      }
    }
    return out;
  }

  private extractValueFromPart(part: any): any {
    if (!part) {
      return undefined;
    }
    const vKey = this.getValueKey(part);
    if (vKey) {
      return part[vKey];
    }
    if (part.resource) {
      return part.resource;
    }
    if (Array.isArray(part.part)) {
      return this.extractTuple(part.part);
    }
    return undefined;
  }

  private formatValue(val: any, indent: number = 0): string {
    if (val === undefined) { return 'undefined'; }
    if (val === null) { return 'null'; }
    const pad = ' '.repeat(indent);
    switch (typeof val) {
      case 'string':
      case 'number':
      case 'boolean':
        return String(val);
      default:
        try {
          return JSON.stringify(val, null, 2)
            .split('\n')
            .map((l: string) => pad + l)
            .join('\n');
        } catch {
          return String(val);
        }
    }
  }

  private toCqlScalar(val: any): string {
    if (val === undefined || val === null) { return 'null'; }
    const t = typeof val;
    if (t === 'number' || t === 'bigint') { return String(val); }
    if (t === 'boolean') { return val ? 'true' : 'false'; }
    if (t === 'string') { return `'${val.replace(/'/g, '\'\'')}'`; }
    // For complex objects (e.g., resources/tuples), fall back to compact JSON
    try {
      return JSON.stringify(val);
    } catch {
      return String(val);
    }
  }

  private toCqlList(arr: any[]): string {
    const items = arr.map((el) => Array.isArray(el) ? this.toCqlList(el) : this.toCqlScalar(el));
    return `{ ${items.join(', ')} }`;
  }

  getExample() {
    // const rand = Math.floor(Math.random() * glob.examples.length);
    return glob.examples[1].cql;
  }
}
