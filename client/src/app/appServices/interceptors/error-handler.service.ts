import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private _injector: Injector) { }

  handleError(error: any) {
    if (error.rejection) {
      const router = this._injector.get(Router);
      router.navigate(['serviceerror/' + error.rejection.status]);
    } else {

      try {
        console.error(`An error occurred`);
      } catch (e) { /* do nothing */ }
    }

    // rethrow error
    throw error;
  }
}
