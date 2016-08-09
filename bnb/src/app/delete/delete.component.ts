import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import {ActivationStates } from '../shared/async.states';
import { environment } from '../environment';
import { UUIDDto } from '../shared/uuid.dto';

@Component({
  moduleId: module.id,
  selector: 'app-delete',
  templateUrl: 'delete.component.html',
  styleUrls: ['delete.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class DeleteComponent implements OnInit {
  public activatedStates = ActivationStates;
  private currentState = ActivationStates.ASYNC_PENDING;
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
    let body = JSON.stringify(new UUIDDto(this.uuid));
    console.log(this.uuid);
    console.log(this.id);
    this.http.delete(environment.API_ENDPOINT + '/teams/' + this.id, body, { headers: headers })
      .subscribe(
        response => {
          this.currentState = ActivationStates.ASYNC_SUCCESSFUL;
        },
        error => {
          this.currentState = ActivationStates.ASYNC_ERROR;
        }
      );
  }

}
