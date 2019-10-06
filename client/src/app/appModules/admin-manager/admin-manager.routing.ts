import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../../appGuards/authentication.guard';
import { AdminManagerComponent } from './admin-manager.component';
import { UserPageComponent } from './pages/user-page/user-page.component';


// routes
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    component: AdminManagerComponent,
    children: [{
      path: 'users',
      component: UserPageComponent
    }]
  },
];

export const AdminRouting: ModuleWithProviders = RouterModule.forChild(routes);
