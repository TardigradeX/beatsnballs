import { provideRouter, RouterConfig } from '@angular/router';
import { TeamsComponent } from '../teams/teams.component';
import { RanksComponent } from '../ranks/ranks.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ActivatedComponent } from '../activated/activated.component';
import { DeleteComponent } from '../delete/delete.component';
import {WelcomeComponent} from '../welcome/welcome.component';

export const APP_ROUTES: RouterConfig = [

  {path: '', redirectTo: '/welcome', terminal: true},
  {path: 'teams', component: TeamsComponent},
  {path: 'ranks', component: RanksComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'activation', component: ActivatedComponent},
  {path: 'delete', component: DeleteComponent},
  {path: 'welcome', component: WelcomeComponent}

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(APP_ROUTES)
];
