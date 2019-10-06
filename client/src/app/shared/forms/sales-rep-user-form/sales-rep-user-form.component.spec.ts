import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRepUserFormComponent } from './sales-rep-user-form.component';

describe('SalesRepUserFormComponent', () => {
  let component: SalesRepUserFormComponent;
  let fixture: ComponentFixture<SalesRepUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRepUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRepUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
