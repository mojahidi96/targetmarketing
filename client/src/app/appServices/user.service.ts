import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { statusReqBody } from 'src/app/appStore/utils';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = environment.API_URL;
  csrftoken = sessionStorage.getItem('csrf');
  getHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRF-Token': this.csrftoken,
    'Authorization': 'Basic dG1jdGVzdDppbnRlbEAwMQ==' // ' + btoa('username:password') // dG1jdGVzdDppbnRlbEAwMQ=='
  });
  headers = { headers: this.getHeaders };
  constructor(private http: HttpClient) { }
  /* CRUD operations for all users */
  createuser(user) {
    const url = `${this.BASE_URL}entity/user?_format=json`;
    return this.http.post(url, user, this.headers);
  }

  editUser(reqData) {
    const url = `${this.BASE_URL}user/${reqData.id}?_format=json`;
    return this.http.patch(url, reqData.user, this.headers);
  }

  deleteUser(deleteUser) {
    const url = `${this.BASE_URL}user/${deleteUser.id}?_format=json`;
    return this.http.patch(url, statusReqBody(deleteUser.status), this.headers);
  }

  getUserByID(userId) {
    const url = `${this.BASE_URL}user/${userId}?_format=json`;
    return this.http.get(url, this.headers);
  }

  getUsers() {
    const url = `${this.BASE_URL}api/v1/users?_format=json`;
    return this.http.get(url, this.headers);
  }
}
