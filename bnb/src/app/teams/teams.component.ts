import { Component, OnInit } from '@angular/core';
import {Team, Player} from './teams.data';

@Component({
  moduleId: module.id,
  selector: 'app-teams',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.css'],
})
export class TeamsComponent implements OnInit {

  private loadedTeams: Team[];

  constructor() {
    this.loadedTeams = new Array();
    let players1 = [new Player('Harald'), new Player('Helmut')];
    let Team1 = new Team('Winners', 1, players1);

    let players2 = [new Player('Marco'), new Player('Jürgen')];
    let Team2 = new Team('Losers', 2, players2);

    let players3 = [new Player('Jessica'), new Player('Andrea')];
    let Team3 = new Team('Someones', 3, players3);

    this.loadedTeams.push(Team1);
    this.loadedTeams.push(Team2);
    this.loadedTeams.push(Team3);
  }
  ngOnInit() {
  }

}
