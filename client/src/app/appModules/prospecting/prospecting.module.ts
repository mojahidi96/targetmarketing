import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProspectingComponent } from './prospecting.component';
import { routing } from './prospecting.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProspectDetailComponent } from 'src/app/appModules/prospecting/pages/prospect-detail/prospect-detail.component';
import { ProspectListComponent } from './pages/prospect-list/prospect-list.component';
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';
import { MomentModule } from 'ngx-moment';
// tslint:disable-next-line:max-line-length
import { ProspectingSidebarUserListComponent } from 'src/app/appModules/prospecting/components/prospecting-sidebar-user-list/prospecting-sidebar-user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const components = [
  ProspectingComponent, ProspectDetailComponent, ProspectListComponent, ProspectingSidebarUserListComponent
];

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    MomentModule,
    NgbModule,
    SharedModule,
    NgxSmoothDnDModule,
  ],
  declarations: components,
  exports: components

})
export class ProspectingModule { }
