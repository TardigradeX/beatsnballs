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
            result.push(new Team(team.team_name, '', team.rank, players));
          });
        }
        return result;
      })
      .subscribe(
        responseData => this.loadedTeams = responseData.reverse(),
        error => console.log('NO DATA AVAILABLE'));

  }
  ngOnInit() {

  }

}
