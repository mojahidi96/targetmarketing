import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManagerComponent } from './admin-manager.component';
import { AdminRouting } from './admin-manager.routing';

import { SharedModule } from 'src/app/shared/shared.module';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminSubmenuComponent } from './components/admin-submenu/admin-submenu.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/appPipes/filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    AdminRouting,
    SharedModule,
    FormsModule
  ],
  declarations: [AdminManagerComponent, AdminNavbarComponent, AdminSubmenuComponent, UserPageComponent, FilterPipe]
})
export class AdminManagerModule { }
