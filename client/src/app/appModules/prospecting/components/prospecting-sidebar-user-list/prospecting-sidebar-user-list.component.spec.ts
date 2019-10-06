import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectingSidebarUserListComponent } from './prospecting-sidebar-user-list.component';

describe('ProspectingSidebarUserListComponent', () => {
  let component: ProspectingSidebarUserListComponent;
  let fixture: ComponentFixture<ProspectingSidebarUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectingSidebarUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectingSidebarUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
