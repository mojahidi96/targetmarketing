import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { userList, prospectUserDetails } from 'src/assets/mock-users';
import { AppState, getAllUserList, getUserDataById } from 'src/app/appStore/reducers/app.reducer';
import { UserService } from 'src/app/appServices/user.service';
import { userTypes } from 'src/app/appStore/app.const';
import { USER, PROSPECT, CHAMBER, SALESREP, USERLIST } from 'src/app/appStore/interfaces/user';
import { DeleteUser, EditUser, GetAllUser, GetUserById, CreateUser } from 'src/app/appStore/actions/user-crud.actions';
import { Observable } from 'rxjs';
import { refineUser } from 'src/app/appStore/utils';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  selectedUser;
  @Output() openModalEvent = new EventEmitter();
  modalMode = false;
  users: Array<USERLIST>;
  searchText: string;
  alluserTypes = userTypes;
  userlist: Observable<Array<any>>;
  openModal = false;
  selectedUserType;
  isUpdate = false;
  header = 'Choose User Type';
  selectedId: string;
  userType = this.alluserTypes.default;
  constructor(private store: Store<AppState>, private userService: UserService) { }

  ngOnInit() {
    this.userlist = this.store.select(getAllUserList);
    this.users = userList;
  }
  addUser() {
    this.openModalEvent.emit(true);
  }

  getSearchText(data) {
    this.searchText = data;
  }

  setSelectedUser(userlist: USERLIST) {

    this.selectedUserType = userlist.role;
    this.selectedUser = {};

    this.store.dispatch(new GetUserById(userlist.uid));
    this.store.select<any>(getUserDataById).subscribe(userDatails => {
      //  this.selectedUser = prospectUserDetails[userlist.role];
      if (userDatails) {
        const filterUserDetails = refineUser(userDatails, userlist.role);
        if (filterUserDetails) {
          this.selectedUser = filterUserDetails;
        }
        // this.selectedUserType = userlist.role;
        this.selectedId = userlist.uid;
        this.isUpdate = true;
      }
    });
  }
  updateUser(userDetails: USER | PROSPECT | CHAMBER | SALESREP) {
    if (this.isUpdate) {
      this.store.dispatch(new EditUser(userDetails));
    } else {
      this.store.dispatch(new CreateUser(userDetails));
    }
  }

  deleteUser(id) {
    this.store.dispatch(new DeleteUser(id));
  }

  getUser() {
    this.store.dispatch(new GetAllUser('chamber'));
    this.userlist.subscribe(res => {
      console.log(res);
    });
  }

  Modal() {
    this.userType = this.alluserTypes.default;
    this.openModal = !this.openModal;
  }

  setUserType(userType) {
    this.selectedUserType = userType;
    this.isUpdate = false;
    this.openModal = false;
    this.resetForCreate();
  }

  resetForCreate() {
    this.selectedUser = {};
    this.selectedId = '';
  }
  // resetForUpdate() {
  //   this.selectedUserType = userlist.role;
  //   this.selectedId = userlist.uid;
  //   this.isUpdate = true;
  // }


}
