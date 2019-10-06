import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState, isAuthenticated } from 'src/app/appStore/reducers/app.reducer';
import { Go } from 'src/app/appStore/actions/router.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private store: Store<AppState>, private route: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authenticatedObservable = this.store.select(isAuthenticated);

    // redirect to sign in page if user is not authenticated
    authenticatedObservable.subscribe(authenticated => {
      if (!authenticated) {
        sessionStorage.clear();
        this.route.navigateByUrl('/login');
      }
    });

    return authenticatedObservable;
  }
}
