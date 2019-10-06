import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProspectingComponent } from './prospecting.component';
import { AuthenticationGuard } from 'src/app/appGuards/authentication.guard';


// routes
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    component: ProspectingComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
