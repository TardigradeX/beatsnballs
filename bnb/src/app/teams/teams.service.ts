import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';


@Injectable()
export class TeamsService {

  constructor(private http: Http) {
  }

  getTeams() {
    return this.http.get(
      environment.API_ENDPOINT + '/teams'
    );
  };
}
