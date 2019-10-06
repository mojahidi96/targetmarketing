import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './signin/sign-in.component';
import { AuthenticationRouting } from './registration.routing';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRouting,
    SharedModule,
    FormsModule
  ],
  declarations: [SignInComponent]
})
export class AuthenticationModule { }
