import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { industryList, productList, industrySortType, prospectList } from 'src/assets/mock-prospecting';


@Component({
  selector: 'app-prospect-list',
  templateUrl: './prospect-list.component.html',
  styleUrls: ['./prospect-list.component.scss']
})
export class ProspectListComponent implements OnInit {

  @Output() prospect = new EventEmitter();
  constructor() { }
  industries;
  products;
  industrySortTypes;
  prospects;
  ngOnInit() {
    this.industries = industryList;
    this.products = productList;
    this.industrySortTypes = industrySortType;
    this.prospects = prospectList;
  }
  emitProspect(event) {
    this.prospect.emit(event);
  }
}
