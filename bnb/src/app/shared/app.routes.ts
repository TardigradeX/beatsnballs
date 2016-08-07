import { provideRouter, RouterConfig } from '@angular/router';
import { TeamsComponent } from '../teams/teams.component';
import { RanksComponent } from '../ranks/ranks.component';

export const APP_ROUTES: RouterConfig = [

  {path: '', redirectTo: '/teams', terminal: true},
  {path: 'teams', component: TeamsComponent},
  {path: 'ranks', component: RanksComponent},

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(APP_ROUTES)
];
