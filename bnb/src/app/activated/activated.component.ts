import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import {ActivationStates } from './activation.states';
import { environment } from '../environment';
import { ActivationDto } from './activation.dto';

@Component({
  moduleId: module.id,
  selector: 'app-acivated',
  templateUrl: 'activated.component.html',
  styleUrls: ['activated.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class ActivatedComponent implements OnInit {
  public activatedStates = ActivationStates;
  private currentState = ActivationStates.ACTIVATION_PENDING;
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
    let body = JSON.stringify(new ActivationDto(this.uuid));
    console.log(this.uuid);
    console.log(this.id);
    this.http.put(environment.API_ENDPOINT + '/teams/' + this.id, body, { headers: headers })
      .subscribe(
        response => {
          this.currentState = ActivationStates.ACTIVATION_SUCCESSFUL;
        },
        error => {
          this.currentState = ActivationStates.ACTIVATION_DENIED;
        }
      );
  }

}
