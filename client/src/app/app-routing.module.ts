import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './appModules/registration/signin/sign-in.component';
import { SignoutComponent } from './shared/signout/signout.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'prospecting',
    loadChildren: './appModules/prospecting/prospecting.module#ProspectingModule'
  },
  {
    path: 'dashboard',
    loadChildren: './appModules/admin-manager/admin-manager.module#AdminManagerModule'
  },
  {
    path: 'prospecting',
    loadChildren: './appModules/prospecting/prospecting.module#ProspectingModule'
  },
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'logout',
    component: SignoutComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'serviceerror/:id',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: 'serviceerror/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
