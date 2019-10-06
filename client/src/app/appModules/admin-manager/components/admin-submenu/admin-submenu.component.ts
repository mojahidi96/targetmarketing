import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PROSPECT, USER, CHAMBER, SALESREP } from '../../../../appStore/interfaces/user';
import { Store } from '@ngrx/store';
import { AppState, getCRUDisSuccess, getCRUDisFail, getUserDataById } from '../../../../appStore/reducers/app.reducer';
import { CreateUser } from '../../../../appStore/actions/user-crud.actions';
import { Observable } from 'rxjs';
import { userTypes, adminSubmenuNames } from '../../../../appStore/app.const';



@Component({
  selector: 'app-admin-submenu',
  templateUrl: './admin-submenu.component.html',
  styleUrls: ['./admin-submenu.component.scss']
})
export class AdminSubmenuComponent implements OnInit {
  @Output() selectedItem = new EventEmitter();
  alluserTypes = userTypes;
  menuNames = adminSubmenuNames;
  istitle = false;
  @Input() selectedUserType = userTypes.default;
  modalMode = true;
  @Input() openModal;
  crudIsSuccess;
  crudIsFail;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.openModal = false;
    this.crudIsSuccess = this.store.select(getCRUDisSuccess).subscribe(response => {
      if (response !== null) {
        this.setDefault();
      }
    });
    this.crudIsFail = this.store.select(getCRUDisFail).subscribe(response => {
      if (response !== null) {
        this.setDefault();
      }
    });

  }

  sideBarEvent(name) {
    this.selectedItem.emit(name);
  }

  Modal() {
    this.openModal = !this.openModal;
    this.setDefault();
  }

  setDefault() {
    this.selectedUserType = userTypes.default;
  }
  setUserType(event) {
    this.selectedUserType = event.target.value;
  }

  formSubmission(event: USER | PROSPECT | CHAMBER | SALESREP) {
    this.store.dispatch(new CreateUser(event));
  }

  OnDestroy() {
    this.crudIsSuccess.unsubscribe();
    this.crudIsFail.unsubscribe();
  }
}
