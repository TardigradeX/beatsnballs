import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, REACTIVE_FORM_DIRECTIVES  } from '@angular/forms';
import {AsyncStates} from '../shared/async.states';
import { Http, Headers } from '@angular/http';
import {CustomValidators} from '../shared/custom-validators';
import {Player, Team} from '../teams/teams.data';
import {environment} from '../environment';

@Component({
  moduleId: module.id,
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class RegistrationComponent implements OnInit {

  public asyncStates = AsyncStates; // Have to declare it so that template can see it.
  private currentState = AsyncStates.NONE;
  private form: FormGroup;

  constructor(fb: FormBuilder, public http: Http) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, CustomValidators.mailFormat])],
      'team_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'playerOne': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'playerTwo': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'playerThree': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    let player1: Player = new Player(value.playerOne);
    let player2: Player = new Player(value.playerTwo);
    let player3: Player = new Player(value.playerThree);
    let playerList = [player1, player2, player3];
    let team:Team = new Team(value.team_name, value.email, null, playerList);


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(team);
    this.currentState  = AsyncStates.ASYNC_PENDING;

    console.log(team);

    this.http.post(environment.API_ENDPOINT + '/teams', body, { headers: headers })
      .subscribe(
        response => {
          console.log(response.text());
          this.currentState  = AsyncStates.ASYNC_SUCCESSFUL;
        },
        error => {
          alert(error.text());
          this.currentState  = AsyncStates.ASYNC_ERROR;
        }
      );
  }

}
