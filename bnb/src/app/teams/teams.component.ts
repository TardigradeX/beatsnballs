import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import {Team, Player} from './teams.data';
import {TeamsService} from './teams.service';


@Component({
  moduleId: module.id,
  selector: 'app-teams',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.css'],
  providers: [TeamsService],
})
export class TeamsComponent implements OnInit {

  private loadedTeams: Team[];


  constructor(private teamsService: TeamsService) {
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

    this.teamsService.getTeams()
      .map( (responseData: Response) => {
        return responseData.json();
      })
      .map((teams: Array<any>) => {
        let result: Array<Team> = [];
        if (teams) {
          teams.forEach((team) => {
            let players = [];
            team.players.forEach((player) => {
              players.push(new Player(player.player_name));
            });
            result.push(new Team(team.team_name, team.rank, players));
          });
        }
        return result;
      })
      .subscribe(
        responseData => this.loadedTeams = responseData,
        error => console.log('NO DATA AVAILABLE'));

  }
  ngOnInit() {

  }

}
