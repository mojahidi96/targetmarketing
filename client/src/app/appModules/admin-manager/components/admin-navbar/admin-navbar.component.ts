import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appStore/reducers/app.reducer';
import { LogOut } from 'src/app/appStore/actions/auth.actions';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  @Input() username = 'Guest';
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new LogOut({ 'xtoken': sessionStorage.getItem('csrf') }));
  }
}
