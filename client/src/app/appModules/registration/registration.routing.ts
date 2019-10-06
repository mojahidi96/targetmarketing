import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './signin/sign-in.component';

// routes
const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
];

export const AuthenticationRouting: ModuleWithProviders = RouterModule.forChild(routes);
