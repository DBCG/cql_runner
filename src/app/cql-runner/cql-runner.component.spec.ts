import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CqlRunnerComponent } from './cql-runner.component';

describe('CqlRunnerComponent', () => {
  let component: CqlRunnerComponent;
  let fixture: ComponentFixture<CqlRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CqlRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CqlRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
