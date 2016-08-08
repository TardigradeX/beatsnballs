/**
 * Created by daniel on 07.08.16.
 */
export class Team {
  private team_name: string;
  private rank: number;
  private players: Player[];

  constructor(team_name: string, rank: number, players: Player[]) {
    this.team_name = team_name;
    this.rank = rank;
    this.players = players;
  }


  get Team_name(): string{
      return this.team_name;
      }

  get Rank(): number{
      return this.rank;
      }

  get Players(): Player[]{
      return this.players;
      }
}

/**
 * Created by daniel on 07.08.16.
 */
export class Player {
  private player_name: string;


  constructor(player_name: string) {
    this.player_name = player_name;
  }


    get Player_name(): string {
      return this.player_name;
    }
}
