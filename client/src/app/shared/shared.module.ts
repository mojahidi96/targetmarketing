import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchComponent } from './forms/search/search.component';
import { ChamberUserFormComponent } from './forms/chamber-user-form/chamber-user-form.component';
import { ProspectUserFormComponent } from './forms/prospect-user-form/prospect-user-form.component';
import { SalesRepUserFormComponent } from './forms/sales-rep-user-form/sales-rep-user-form.component';
import { AdminUserFormComponent } from './forms/admin-user-form/admin-user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [SearchComponent,
    ChamberUserFormComponent,
    ProspectUserFormComponent,
    SalesRepUserFormComponent,
    AdminUserFormComponent,
    ModalComponent],
  exports: [SearchComponent, ChamberUserFormComponent, ProspectUserFormComponent, SalesRepUserFormComponent,
    AdminUserFormComponent, ModalComponent]
})
export class SharedModule { }
