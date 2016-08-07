import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [NavbarComponent]
})
export class AppComponent {
  title = 'app works NOT!';
}
