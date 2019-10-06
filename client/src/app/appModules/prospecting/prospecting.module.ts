import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProspectingComponent } from './prospecting.component';
import { routing } from './prospecting.routing';

const components = [
  ProspectingComponent
];

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: components,
  exports: components

})
export class ProspectingModule { }
