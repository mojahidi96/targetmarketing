import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManagerComponent } from './admin-manager.component';
import { AdminRouting } from './admin-manager.routing';

import { SharedModule } from '../../shared/shared.module';
import { AdminSubmenuComponent } from './components/admin-submenu/admin-submenu.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../appPipes/filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    AdminRouting,
    SharedModule,
    FormsModule
  ],
  declarations: [AdminManagerComponent, AdminSubmenuComponent, UserPageComponent, FilterPipe]
})
export class AdminManagerModule { }
