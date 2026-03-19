import { async, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RunnerComponent } from './runner.component';
import { ApiService } from '../../shared/api/api.service';
import { ConfigService } from '../config/config.service';

describe('RunnerComponent', () => {
  let component: RunnerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RunnerComponent],
      providers: [ApiService, ConfigService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideTemplate(RunnerComponent, '<div></div>')
    .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(RunnerComponent);
    component = fixture.componentInstance;
    component.oValue = '';
    // Stub updateOutput to avoid accessing codeEditors QueryList
    spyOn(component as any, 'updateOutput');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('processResponses should handle null responses', () => {
    component.processResponses(null);
    expect(component.oValue).not.toContain('undefined');
  });

  it('processResponses should handle empty parameter array', () => {
    component.processResponses({ parameter: [] });
    expect(component.oValue).toBe('\n');
  });

  it('processResponses should format a simple value response', () => {
    const responses = {
      parameter: [
        { name: 'Result', valueInteger: 42 }
      ]
    };
    component.processResponses(responses);
    expect(component.oValue).toContain('>> Result');
    expect(component.oValue).toContain('42');
  });

  it('processResponses should format a string value response', () => {
    const responses = {
      parameter: [
        { name: 'Greeting', valueString: 'hello' }
      ]
    };
    component.processResponses(responses);
    expect(component.oValue).toContain('>> Greeting');
    expect(component.oValue).toContain('hello');
  });

  it('processResponses should format a resource response', () => {
    const responses = {
      parameter: [
        { name: 'Patient', resource: { resourceType: 'Patient', id: '123' } }
      ]
    };
    component.processResponses(responses);
    expect(component.oValue).toContain('>> Patient');
    expect(component.oValue).toContain('123');
  });

  it('processResponses should format a boolean value response', () => {
    const responses = {
      parameter: [
        { name: 'IsActive', valueBoolean: true }
      ]
    };
    component.processResponses(responses);
    expect(component.oValue).toContain('>> IsActive');
    expect(component.oValue).toContain('true');
  });

  it('processResponses should handle multiple parameters', () => {
    const responses = {
      parameter: [
        { name: 'A', valueInteger: 1 },
        { name: 'B', valueString: 'two' }
      ]
    };
    component.processResponses(responses);
    expect(component.oValue).toContain('>> A');
    expect(component.oValue).toContain('>> B');
  });

  it('processResponses should handle parameter with no value', () => {
    const responses = {
      parameter: [
        { name: 'Empty' }
      ]
    };
    component.processResponses(responses);
    expect(component.oValue).toContain('>> Empty');
  });
});
