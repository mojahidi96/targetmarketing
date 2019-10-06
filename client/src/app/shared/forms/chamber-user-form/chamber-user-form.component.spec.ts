import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberUserFormComponent } from './chamber-user-form.component';

describe('ChamberUserFormComponent', () => {
  let component: ChamberUserFormComponent;
  let fixture: ComponentFixture<ChamberUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamberUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamberUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
