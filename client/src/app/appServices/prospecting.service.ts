import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProspectingService {
  constructor(private http: HttpClient) { }

  getProspectList(requestChamberId) {
    return this.http.get('./assets/list.json');
  }

  updateProspectDetail(requestdata) {
    return this.http.get('./assets/list.json');
  }
  getProspectsByType(requestdata) {
    return this.http.get('./assets/list.json');
  }
  stageProspect(requestdata) {
    return this.http.get('./assets/list.json');
  }
  addProspect(requestdata) {
    return this.http.post('./assets/list.json', requestdata);
  }
  getProspectDetailById(id) {
    return this.http.get('./assets/mock-prospecting.json');
  }
  getProspectProductAndIndustries(id) {
    return this.http.get('./assets/mock-prospecting.json');
  }

}
