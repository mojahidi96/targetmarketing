import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searchInput = new EventEmitter();
  searchText: string = null;
  constructor() { }

  ngOnInit() {

  }
  
  onSearchChange(value) {
    this.searchInput.emit(value);
  }
}
