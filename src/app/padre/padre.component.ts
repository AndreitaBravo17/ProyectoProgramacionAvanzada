import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.scss']
})
export class PadreComponent {

  title = 'admin-panel-layout';
  sideBarOpen: Boolean = true;

  signin: Boolean = true;


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
