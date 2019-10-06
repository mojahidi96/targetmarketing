import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {
  id; // status error code;
  message;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    switch (this.id) {
      case '404': this.message = 'Page not found'; break;
      case '400': this.message = 'Bad Request'; break;
      case '401': this.message = 'Not Authorized to visit that page'; break;
      case '403': this.message = 'Request Forbidden'; break;
      case '408': this.message = 'Request Timeout'; break;
      case '500': this.message = 'Internal Server Error'; break;
      case '503': this.message = 'Service Unavailable'; break;
      default: this.message = 'Under Construction';
    }
  }

  ngOnInit() {

  }

}
