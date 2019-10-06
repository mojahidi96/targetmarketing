import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { defineUser } from 'src/app/appStore/utils';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = environment.API_URL;
  csrftoken = sessionStorage.getItem('stoken');
  headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('content-type', 'application/hal+json')
    .set('X-CSRF-Token', this.csrftoken);
  constructor(private http: HttpClient) { }
  /* CRUD operations for all users */
  createuser(user) {
    console.log(user);
    const getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-Token': this.csrftoken,
      'Authorization': 'Basic YWRtaW46aW50ZWxAMDE='
    });
    const url = `${this.BASE_URL}entity/user?_format=json`;
    return this.http.post(url, user, { headers: getHeaders });
  }

  editUser(user) {
    const url = `${this.BASE_URL}entity/user?_format=json`;
    return this.http.post(url, user);
  }

  deleteUser(userID) {
    const url = `${this.BASE_URL}deleteUser`;
    return this.http.post(url, userID);
  }

  getUserByID(userId) {
    const getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-Token': this.csrftoken,
      'Authorization': 'Basic YWRtaW46aW50ZWxAMDE='
    });
    const url = `${this.BASE_URL}user/${userId}?_format=json`;
    return this.http.get(url, { headers: getHeaders });
  }

  getUsers() {
    const getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-Token': sessionStorage.getItem('csrf')
    });
    const url = `${this.BASE_URL}users?_format=json`;
    return this.http.get(url, { headers: getHeaders });
  }
}
