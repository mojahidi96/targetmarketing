import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { USER } from '../appStore/interfaces/user';
import { environment } from 'src/environments/environment';
// import * as Waterwheel from 'waterwheel/dist/waterwheel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = environment.API_URL;
  headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('content-type', 'application/json');
  constructor(private http: HttpClient) { }

  getToken(): string {
    return sessionStorage.getItem('csrf');
  }

  logout(token) {
    const getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.BASE_URL}user/logout?csrf_token=${token}`;
    return this.http.post(url, '');
  }

  logIn(name: string, pass: string): Observable<any> {
    const getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.BASE_URL}api/users/login`;
    return this.http.post<USER>(url, { email: name, password: pass }, { headers: getHeaders });
  }

  signUp(email: string, password: string): Observable<USER> {
    const url = `${this.BASE_URL}api/users/register`;
    return this.http.post<USER>(url, { email, password });
  }

  getSessionToken() {
    const url = `${this.BASE_URL}rest/session/token`;
    return this.http.get(url);
  }
}
