import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, REACTIVE_FORM_DIRECTIVES  } from '@angular/forms';
import {AsyncStates} from '../shared/async.states';
import { Http, Headers } from '@angular/http';

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
      'email': ['', Validators.compose([Validators.required, CustomValidators.lowerCaseLetters, Validators.minLength(4)])],
      'team_name': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'playerOne': ['', Validators.required],
      'playerTwo': ['', Validators.required],
      'playerThree': ['', Validators.compose([Validators.required, CustomValidators.mailFormat])],
    });
  }

  ngOnInit() {
  }

}
