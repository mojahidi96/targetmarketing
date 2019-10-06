import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getAllUserList, getUserDataById, getCRUDisSuccess } from '../../../../appStore/reducers/app.reducer';
import { UserService } from '../../../../appServices/user.service';
import { userTypes } from '../../../../appStore/app.const';
import { USER, PROSPECT, CHAMBER, SALESREP, USERLIST } from '../../../../appStore/interfaces/user';
import { DeleteUser, EditUser, GetAllUser, GetUserById, CreateUser } from '../../../../appStore/actions/user-crud.actions';
import { Observable } from 'rxjs';
import { refineUser, refineUserList } from '../../../../appStore/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, OnDestroy {
  selectedUser;
  @Output() openModalEvent = new EventEmitter();
  modalMode = false;
  users: Array<USERLIST> = [];
  searchText: string;
  alluserTypes = userTypes;
  userlist: Observable<Array<any>>;
  openModal = false;
  selectedUserType;
  isUpdate = false;
  header = 'Choose User Type';
  selectedId: string;
  userType = this.alluserTypes.default;
  currentUSerUid = 0;
  superUserId = '1';
  getUserById;
  userList;
  CRUDisSuccess;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private store: Store<AppState>, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userlist = this.store.select(getAllUserList);
    this.getUser();
    this.currentUSerUid = JSON.parse(sessionStorage.getItem('user'))['uid'];
  }
  addUser() {
    this.openModalEvent.emit(true);
  }

  getSearchText(data) {
    this.searchText = data;
  }

  setSelectedUser(userlist: USERLIST) {

    // console.log('before');
    this.selectedUserType = null;
    this.selectedUser = {};
    this.isUpdate = true;
    this.store.dispatch(new GetUserById(userlist.uid));
    this.getUserById = this.store.select<any>(getUserDataById).subscribe(userDetails => {
      if (userDetails) {
        const filterUserDetails = refineUser(userDetails, userlist.role);
        this.selectedUserType = userlist.role;
        if (filterUserDetails) {
          this.selectedUser = filterUserDetails;
        }
        this.selectedId = userlist.uid;
      }
    });
  }
  formSubmit(userDetails: USER | PROSPECT | CHAMBER | SALESREP) {
    let reqBody;
    if (this.isUpdate) {
      reqBody = {
        'id': this.selectedId,
        'user': userDetails
      };
      this.store.dispatch(new EditUser(reqBody));
    } else {
      this.store.dispatch(new CreateUser(userDetails));
    }

    this.CRUDisSuccess = this.store.select(getCRUDisSuccess).subscribe(response => {
      console.log(response);
      this.getUser();
    });
  }

  deleteUser(id) {
    if (this.currentUSerUid === id) { return; }
    if (id === this.superUserId) {                  // TODO: Prevent super user from delete
      this.toastr.info('Super user cannot be deleted', 'Information', {
        timeOut: 3000,
      });
      return;
    } else {
      const deleteObject = { id: id, status: false };
      this.store.dispatch(new DeleteUser(deleteObject));
    }
  }

  getUser() {
    this.store.dispatch(new GetAllUser('getUser'));
    this.userList = this.userlist.subscribe(users => {
      this.users = refineUserList(users);
    });
  }

  setUserType(userType) {
    this.selectedUserType = userType;
    this.isUpdate = false;
    this.closeBtn.nativeElement.click();
    this.resetForCreate();
  }

  resetForCreate() {
    this.selectedUser = {};
    this.selectedId = null;
  }
  closeForm() {
    this.selectedUserType = null;
    this.selectedId = null;
  }
  closeModal() {
    this.userType = this.alluserTypes.default;
  }
  ngOnDestroy() {
    if (this.getUserById !== undefined) { this.getUserById.unsubscribe(); }
    if (this.userList !== undefined) { this.userList.unsubscribe(); }
    if (this.CRUDisSuccess !== undefined) { this.CRUDisSuccess.unsubscribe(); }
  }
}
