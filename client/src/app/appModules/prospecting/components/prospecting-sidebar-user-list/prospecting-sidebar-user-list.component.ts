import { Component, OnInit } from '@angular/core';

import { ContainerComponent, DraggableComponent, IDropResult } from 'ngx-smooth-dnd';

import { PROSPECTLIST } from 'src/app/appStore/interfaces/lists';
import { ProspectingService } from 'src/app/appServices/prospecting.service';
import { applyDrag } from 'src/app/appStore/utils';


@Component({
  selector: 'app-prospecting-sidebar-user-list',
  templateUrl: './prospecting-sidebar-user-list.component.html',
  styleUrls: ['./prospecting-sidebar-user-list.component.scss']
})
export class ProspectingSidebarUserListComponent implements OnInit {
  prospecting: PROSPECTLIST;
  need_analysis: PROSPECTLIST;
  solution: PROSPECTLIST;
  closing: PROSPECTLIST;
  constructor(private pL: ProspectingService) {
    this.getChildPayload1 = this.getChildPayload1.bind(this);
    this.getChildPayload2 = this.getChildPayload2.bind(this);
    this.getChildPayload3 = this.getChildPayload3.bind(this);
    this.getChildPayload4 = this.getChildPayload4.bind(this);
    this.pL.getProspectList('data').subscribe(res => {
      this.prospecting = res['users'].filter((items) => items.stage === 'prospecting');
      this.need_analysis = res['users'].filter((items) => items.stage === 'Need Analysis');
      this.solution = res['users'].filter((items) => items.stage === 'Solution');
      this.closing = res['users'].filter((items) => items.stage === 'Closing');

    });
  }

  ngOnInit() {
  }
  onDrop(collection, dropResult) {
    console.log(dropResult, collection);
    if (dropResult.removedIndex !== null) {
      const fromcollection = collection;
      console.log(fromcollection);
    }
    if (dropResult.addedIndex !== null) {
      const toCollection = collection;
      console.log(toCollection);
      dropResult.payload.stage = toCollection;
    }

    // service call to change the stage of the user post successfull response change here
    this[collection] = applyDrag(this[collection], dropResult);
  }

  getChildPayload1(index) {
    return this.prospecting[index];
  }
  getChildPayload2(index) {
    return this.need_analysis[index];

  }
  getChildPayload3(index) {
    return this.solution[index];

  }
  getChildPayload4(index) {
    return this.closing[index];
  }

}
