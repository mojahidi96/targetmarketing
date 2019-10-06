import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getAppAuthState, isAuthenticated } from 'src/app/appStore/reducers/app.reducer';
import { AuthService } from './appServices/auth.service';

import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  getRoutes;
  authenticated;
  appAuthState;
  constructor(private route: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.events.pipe(filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      if (event.url === '/login') {
        const authenticatedObservable = this.store.select(isAuthenticated);
        this.authenticated = authenticatedObservable.subscribe(authenticated => {
          if (!authenticated) {
            sessionStorage.clear();
          } else {
            this.route.navigateByUrl('/dashboard');
          }
        });
      } else {
        this.appAuthState = this.store.select(getAppAuthState).subscribe(appState => {
          sessionStorage.setItem('appState', JSON.stringify(appState));
        });
      }
    });
  }

  ngOnDestroy() {
  }
}
