// Directive responsible for CodeMirror configuration and injection

import { Directive, EventEmitter, Input, Output, AfterViewInit, ElementRef } from '@angular/core';
import * as CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple';
import { EditorType } from './code-mirror.model';

// Add CQL as simple mode
// Can potentially go with a full mode definition as we develop editor features
CodeMirror.defineSimpleMode('cql', {
  start: [

    {regex: /\/\/.*/, token: 'comment'},
    {regex: /\/\*/, token: 'comment', next: 'comment'},

    {regex: /'(?:[^\\]|\\.)*?(?:'|$)/, token: 'string'},
    {regex: /'(?:[^\\]|\\.)*?(?:'|$)/, token: 'string-2'},

    {regex: /[\{\[\(]/, indent: true},
    {regex: /[\}\]\)]/, dedent: true},

    {
      regex: /\b(context +)(Patient|Population)\b/,
      token: [ 'keyword', null ]
    },

    {
      regex: /\b(predecessor +of|successor +of|singleton +from)\b/,
      token: 'keyword'
    },

    {
      regex: /\b(year|month|day|hour|minute|second|millisecond|timezone|date|time) +from\b/,
      token: 'keyword'
    },

    {
      regex: /\b(years|months|days|hours|minutes|seconds|milliseconds) +between\b/,
      token: 'keyword'
    },

    {
      regex: /\b(width +of|such that)\b/,
      token: 'keyword'
    },

    {
      regex: /\b(Coalesce|is +null|is +not +null)\b/,
      token: 'keyword'
    },

    {
      regex: /\b(difference)( +in +)(years|months|days|hours|minutes|seconds|milliseconds)( +between)\b/,
      token: ['keyword', 'keyword', 'keyword', 'keyword']
    },

    {
      regex: /\b(start|end)( +of)\b/,
      token: ['keyword', 'keyword']
    },

    {
      regex: /\b(properly +)(contains|includes|during|included +in)\b/,
      token: ['keyword', 'keyword']
    },

    {
      regex: /\b(contains|includes|during|included +in)\b/,
      token: ['keyword', 'keyword']
    },

    {
      regex: /\b(properly +)(between)\b/,
      token: ['keyword', 'keyword']
    },

    {
      regex: /\b(same +)(year|month|day|hour|minute|second|millisecond)( +)(or +before|or +after|as)\b/,
      token: ['keyword', 'keyword', null, 'keyword']
    },

    {
      regex: /\b(same +)(or +before|or +after|as)\b/,
      token: ['keyword', 'keyword']
    },

    {
      regex: /\b(properly +)(within +)(\d+)(\s+)(year|month|day|hour|minute|second|millisecond)( +of)\b/,
      token: ['keyword', 'keyword', 'number', null, 'keyword', 'keyword']
    },

    {
      regex: /\b(properly +)(within +)(\d+)(\s+)(years|months|days|hours|minutes|seconds|milliseconds)( +of)\b/,
      token: ['keyword', 'keyword', 'number', null, 'keyword', 'keyword']
    },

    {
      regex: /\b(within +)(\d+)(\s+)(years|months|days|hours|minutes|seconds|milliseconds)( +of)\b/,
      token: ['keyword', 'number', null, 'keyword', 'keyword']
    },

    {
      regex: /\b(year|month|day|hour|minute|second|millisecond)( +or +)(less|more)( +)(before|after)\b/,
      token: ['keyword', 'keyword', 'keyword', null, 'keyword']
    },

    {
      regex: /\b(years|months|days|hours|minutes|seconds|milliseconds)( +or +)(less|more)( +)(before|after)\b/,
      token: ['keyword', 'keyword', 'keyword', 'keyword', 'keyword']
    },

    {
      regex: /\b(year|month|day|hour|minute|second|millisecond)( +)(before|after)\b/,
      token: ['keyword', null, 'keyword']
    },

    {
      regex: /\b(years|months|days|hours|minutes|seconds|milliseconds)( +)(before|after)\b/,
      token: ['keyword', null, 'keyword']
    },

    {
      regex: /\b(CalculateAge)(In)(Years|Months|Days|Hours|Minutes|Seconds)(At)\b/,
      token: ['keyword', 'keyword', 'keyword', 'keyword']
    },

    {
      regex: /\b(CalculateAge)(In)(Years|Months|Days|Hours|Minutes|Seconds)\b/,
      token: ['keyword', 'keyword', 'keyword']
    },

    {
      regex: /\b(Age)(In)(Years|Months|Days|Hours|Minutes|Seconds)(At)\b/,
      token: ['keyword', 'keyword', 'keyword', 'keyword']
    },

    {
      regex: /\b(Age)(In)(Years|Months|Days|Hours|Minutes|Seconds)\b/,
      token: ['keyword', 'keyword', 'keyword']
    },

    {
      regex: /\b(sort +)(ascending|descending)( +by)(.*)(ascending|descending)\b/,
      token: ['keyword', 'keyword', 'keyword', null, 'keyword']
    },

    {
      regex: /\b(sort +)(asc|desc)( +by)(.*)(asc|desc)\b/,
      token: ['keyword', 'keyword', 'keyword', null, 'keyword']
    },

    {
      regex: /\b(sort +)(by)(.*)(ascending|descending)\b/,
      token: ['keyword', 'keyword', null, 'keyword']
    },

    {
      regex: /\b(sort +)(by)(.*)(asc|desc)\b/,
      token: ['keyword', 'keyword', null, 'keyword']
    },

    {
      regex: /\b(by)(.*)(ascending|descending)\b/,
      token: ['keyword', null, 'keyword']
    },

    {
      regex: /\b(by)(.*)(asc|desc)\b/,
      token: ['keyword', null, 'keyword']
    },

    {
      regex: /\B\@\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\b/,
      token: 'tag'
    },

    {
      regex: /\B\@\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/,
      token: 'tag'
    },

    {
      regex: /\B\@\d{4}-\d{2}-\d{2}T\d{2}:\d{2}\b/,
      token: 'tag'
    },

    {
      regex: /\B\@\d{4}-\d{2}-\d{2}T\d{2}\b/,
      token: 'tag'
    },

    {
      regex: /\B\@\d{4}-\d{2}-\d{2}\b/,
      token: 'tag'
    },

    {
      regex: /\B\@\d{4}-\d{2}\b/,
      token: 'tag'
    },

    {
      regex: /\B\@\d{4}\b/,
      token: 'tag'
    },

    {
      regex: /\B\@T\d{2}:\d{2}:\d{2}\b/,
      token: 'tag'
    },

    {
      regex: /\B\@T\d{2}:\d{2}:\d{2}\b/,
      token: 'tag'
    },

    {
      regex: /\B\@T\d{2}:\d{2}\b/,
      token: 'tag'
    },

    {
      regex: /\B\@T\d{2}\b/,
      token: 'tag'
    },

    {
      sol: true,
      regex: /(after|all|and|as|asc|ascending|before|between|by|called|case|cast|codesystem|codesystems|collapse|contains|convert|day|days|default|define|desc|descending|difference|display|distinct|div|duration|during|else|end|ends|except|exists|flatten|from|function|hour|hours|if|implies|in|include|includes|intersect|is|let|library|maximum|meets|millisecond|milliseconds|minimum|minute|minutes|mod|month|months|not|occurs|of|or|overlaps|parameter|predecessor|private|public|return|same|singleton|second|seconds|start|starts|successor|then|to|union|using|valueset|version|week|weeks|where|when|with|within|without|xor|year|years)\b/,
      token: 'keyword'
    },

    {
      regex: /(\w\W|\W)(after|all|and|as|asc|ascending|before|between|by|called|case|cast|codesystem|codesystems|collapse|contains|convert|day|days|default|define|desc|descending|difference|display|distinct|div|duration|during|else|end|ends|except|exists|flatten|from|function|hour|hours|if|implies|in|include|includes|intersect|is|let|library|maximum|meets|millisecond|milliseconds|minimum|minute|minutes|mod|month|months|not|occurs|of|or|overlaps|parameter|predecessor|private|public|return|same|singleton|second|seconds|start|starts|successor|then|to|union|using|valueset|version|week|weeks|where|when|with|within|without|xor|year|years)\b/,
      token: [null, 'keyword']
    },

    {
      sol: true,
      regex: /(Any|Boolean|Code|Concept|DateTime|Decimal|Integer|Interval|List|Quantity|String|Time|Tuple|AllTrue|AnyTrue|Avg|Count|Max|Min|Median|Mode|PopulationStdDev|PopulationVariance|StdDev|Sum|Variance|First|IndexOf|Last|Length|Now|TimeOfDay|Today|Combine|Length|Lower|PositionOf|Split|Substring|Upper|Abs|Ceiling|Floor|Log|Ln|Round|Truncate|ToBoolean|ToConcept|ToDateTime|ToDecimal|ToInteger|ToQuantity|ToString|ToTime)\b/,
      token: 'builtin'
    },

    {
      regex: /(\w\W|\W)(Any|Boolean|Code|Concept|DateTime|Decimal|Integer|Interval|List|Quantity|String|Time|Tuple|AllTrue|AnyTrue|Avg|Count|Max|Min|Median|Mode|PopulationStdDev|PopulationVariance|StdDev|Sum|Variance|First|IndexOf|Last|Length|Now|TimeOfDay|Today|Combine|Length|Lower|PositionOf|Split|Substring|Upper|Abs|Ceiling|Floor|Log|Ln|Round|Truncate|ToBoolean|ToConcept|ToDateTime|ToDecimal|ToInteger|ToQuantity|ToString|ToTime)\b/,
      token: [null, 'builtin']
    },

    {
      sol: true,
      regex: /(true|false|null)\b/,
      token: 'atom'
    },

    {
      regex: /(\w\W|\W)[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?\b/i,
      token: 'number'
    },

    {
      regex: /(\w\W|\W)(true|false|null)\b/,
      token: [null, 'atom']
    }


  ],
  // The multi-line comment state.
  comment: [
    {regex: /.*?\*\//, token: 'comment', next: 'start'},
    {regex: /.*/, token: 'comment'}
  ],
  // The meta property contains global information about the mode.
  meta: {
    dontIndentStates: ['comment'],
    lineComment: '//'
  }
});

export interface ICodeMirrorConfig {
  value?: string;
  mode?: string;
  theme?: string;
  lineNumbers?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  matchBrackets?: boolean;
  autoCloseBrackets?: boolean;
  styleActiveLine?: boolean;
  rulers?: any;
}
export class CodeMirrorConfig implements ICodeMirrorConfig {
  EditorType = EditorType;
  value?: string;
  mode = 'cql';
  theme: string;
  lineNumbers?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  matchBrackets?: boolean;
  autoCloseBrackets?: boolean;
  styleActiveLine?: boolean;
  rulers?: any;

  constructor(_type: EditorType) {
    if (_type == EditorType.input) {
      this.value = '// Enter your CQL script here and press \'Run\'\n// The results are displayed in the console to the right\n';
      this.lineNumbers = true;
      this.readOnly = false;
      this.autoFocus = true;
      this.matchBrackets = true;
      this.autoCloseBrackets = true;
      this.styleActiveLine = true;
      this.rulers = [{color: '#efefef', column: 70, lineStyle: 'solid'}];
    } else {
      this.readOnly = true;
      this.theme = 'monokai';
      this.mode = '';
    }
  }
}

@Directive ({
  selector: '[cql-code-mirror]'
})
export class CodeMirrorDirective implements AfterViewInit {


  public _type: EditorType;

  // Defaults
  private _config: ICodeMirrorConfig;
  set value(value) {
    this._config.value = value;
    this.editor.setValue(value);
  }

  get value(): string {
    const selection = this.editor.getSelection();
    return selection.length > 0 ? selection : this.editor.getValue();
  }

  constructor(private _el: ElementRef) { }

  editor: CodeMirror.EditorFromTextArea;

  ngAfterViewInit() {
    this._config = new CodeMirrorConfig(this._type);
    this.editor = CodeMirror.fromTextArea(this._el.nativeElement, this._config);
  }

  @Input() set type(type) {
    this._type = type;
  } get type(): EditorType {
    return this._type;
  }

}
