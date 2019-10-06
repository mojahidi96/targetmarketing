import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/appServices/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {
  private serverURL: string = environment.API_URL;
  private headers = new HttpHeaders()
    // .set('Accept', 'application/json')
    // .set('content-type', 'application/hal+json')
    .set('cache-control', 'no-cache')
    .set('postman-token', '670b2a8b-dd5a-f5a9-f280-ab2b03849226');

  constructor(private http: HttpClient) { }

  getURL(url: string): string {
    return this.serverURL + url;
  }

}
