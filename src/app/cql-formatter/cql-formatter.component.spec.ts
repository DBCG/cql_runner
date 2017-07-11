import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CqlFormatterComponent } from './cql-formatter.component';

describe('CqlFormatterComponent', () => {
  let component: CqlFormatterComponent;
  let fixture: ComponentFixture<CqlFormatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CqlFormatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CqlFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
