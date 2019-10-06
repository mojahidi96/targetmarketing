import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './appStore/reducers/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './appStore/effects/auth.effects';
import { HttpHandlerService } from './appServices/interceptors/http-handler.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppComponent } from './app.component';
import { UserCrudEffects } from './appStore/effects/userCrud.effects';
import { ToastrModule } from 'ngx-toastr';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { SignInComponent } from './appModules/registration/signin/sign-in.component';
import { SignoutComponent } from './shared/signout/signout.component';
import { AuthService } from './appServices/auth.service';

import { ErrorHandlerService } from './appServices/interceptors/error-handler.service';
import { ErrorHandler } from '@angular/core';


export const appImports = [
  BrowserModule,
  BrowserAnimationsModule,
  ToastrModule.forRoot({
    positionClass: 'toast-bottom-right'
  }),
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  AppRoutingModule,
  SharedModule,
  StoreModule.forRoot(reducers, {}),
  EffectsModule.forRoot([AuthEffects, UserCrudEffects]),
  StoreRouterConnectingModule,
  StoreDevtoolsModule.instrument()
];

export const appDeclarations = [
  AppComponent,
  NotfoundComponent,
  SignInComponent,
  SignoutComponent,
];

export const appProviders = [
  AuthService,
  { provide: ErrorHandler, useClass: ErrorHandlerService },

];
