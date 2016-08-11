import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import {AsyncStates } from '../shared/async.states';
import { environment } from '../environment';

@Component({
  moduleId: module.id,
  selector: 'app-delete',
  templateUrl: 'delete.component.html',
  styleUrls: ['delete.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class DeleteComponent implements OnInit {
  public asyncStates = AsyncStates;
  private currentState = AsyncStates.ASYNC_PENDING;
  private uuid: string;
  private id: string;
  private sub: any;

  constructor(private route: ActivatedRoute, public http: Http){
  }

  ngOnInit() {

    this.sub = this.route
      .params
      .subscribe(params => {
        this.uuid = params['uuid'];
        this.id = params['id'];
      });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('uuid', this.uuid);
    this.http.delete(environment.API_ENDPOINT + '/teams/' + this.id, { headers: headers })
      .subscribe(
        response => {
          this.currentState = AsyncStates.ASYNC_SUCCESSFUL;
        },
        error => {
          this.currentState = AsyncStates.ASYNC_ERROR;
        }
      );
  }

}
