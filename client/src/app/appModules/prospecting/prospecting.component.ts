import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { USER, PROSPECT } from 'src/app/appStore/interfaces/user';
import { AppState, getCRUDisSuccess } from 'src/app/appStore/reducers/app.reducer';
import { EditUser, CreateUser } from 'src/app/appStore/actions/user-crud.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './prospecting.component.html',
  styleUrls: ['./prospecting.component.scss']
})
export class ProspectingComponent implements OnInit {
  isUpdate = false;
  selectedId: string;
  CRUDisSuccess;
  selectedProspect;
  constructor(private store: Store<AppState>) {

  }
  SelectProspectevent(event) {
    this.selectedProspect = event;
  }
  ngOnInit() { }

  formSubmit(userDetails: PROSPECT) {
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
    });
  }
}
