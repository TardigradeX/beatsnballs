import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import { DROPDOWN_DIRECTIVES } from "ng2-dropdown";

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
