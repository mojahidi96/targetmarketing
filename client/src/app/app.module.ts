import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { appDeclarations, appImports, appProviders } from './app.component.imports';

@NgModule({
  declarations: [
    ...appDeclarations
  ],
  imports: [
    ...appImports
  ],
  providers: [...appProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
