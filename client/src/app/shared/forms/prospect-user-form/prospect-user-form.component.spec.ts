import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectUserFormComponent } from './prospect-user-form.component';

describe('ProspectUserFormComponent', () => {
  let component: ProspectUserFormComponent;
  let fixture: ComponentFixture<ProspectUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
