import { provideRouter, RouterConfig } from '@angular/router';
import { TeamsComponent } from '../teams/teams.component';
import { RanksComponent } from '../ranks/ranks.component';
import { RegistrationComponent } from '../registration/registration.component';

export const APP_ROUTES: RouterConfig = [

  {path: '', redirectTo: '/teams', terminal: true},
  {path: 'teams', component: TeamsComponent},
  {path: 'ranks', component: RanksComponent},
  {path: 'registration', component: RegistrationComponent}

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(APP_ROUTES)
];
