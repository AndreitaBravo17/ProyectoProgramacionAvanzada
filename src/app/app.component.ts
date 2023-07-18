import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,

  ) {}

  ngOnInit(): void {
    // if (this.authService.loggedIn()) {//Si esta logueado lo redirecciona al dashboard
    //   this.router.navigate(['/dashboard']);
    // }
    // this.router.navigate(['/login']);//en caso de que no este logueado lo redirecciona al login
  }
  // title = 'admin-panel-layout';
  // sideBarOpen: Boolean = true;

  // signin: Boolean = true;


  // sideBarToggler() {
  //   this.sideBarOpen = !this.sideBarOpen;
  // }
}
