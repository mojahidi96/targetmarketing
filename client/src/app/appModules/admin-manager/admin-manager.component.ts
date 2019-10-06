import { Component, OnInit } from '@angular/core';
import { submenuName } from 'src/app/appStore/app.const';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.scss']
})
export class AdminManagerComponent implements OnInit {
  username;
  menuItems = submenuName;
  selectedMenu;
  isOpenModal;

  constructor() {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    if (userInfo)
      this.username = userInfo['name'];
  }

  ngOnInit() {
    this.selectedMenu = this.menuItems.users;
  }
  updateSelection(event) {
    this.selectedMenu = event;
  }

  openModal(event) {
    this.isOpenModal = event;
  }
}
