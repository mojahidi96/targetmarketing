import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getAppAuthState } from 'src/app/appStore/reducers/app.reducer';
import { AuthService } from './appServices/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private route: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.events.filter(event => event instanceof NavigationStart).subscribe((event: NavigationStart) => {
      console.log(event.url);
      if (event.url === '/login') {
        sessionStorage.removeItem('appState');
      } else {
        this.store.select(getAppAuthState).subscribe(appState => {
          sessionStorage.setItem('appState', JSON.stringify(appState));
        });
      }
    });

  }
}
