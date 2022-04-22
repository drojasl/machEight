import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NbaPlayersService } from './services/nba-players/nba-players.service';
import { Observable, throwError } from 'rxjs';
import { NbaPlayerDataI } from './models/interfaces/nba-player-data.interface';
import { NbaPlayerI } from './models/interfaces/nba-player.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public nbaPlayersData: NbaPlayerDataI;
  public displayLoading: boolean = true;
  public displayNoMatchMessage: boolean = false;
  public pairsOfPlayers = new Array();

  constructor(
    private _translateService: TranslateService,
    private _nbaPlayersService: NbaPlayersService
  ) {
    this.nbaPlayersData = {
      values:[]
    };
  }

  public ngOnInit(): void {
    this._nbaPlayersService.getNbaPlayersData().subscribe(data => {
      this.nbaPlayersData = data;
      this.displayLoading = false;
    });
  }

  public selectLanguage(event: any) {
    this._translateService.use(event.target.value)
  }

  public submitValue(event: number) :void {
    this.displayNoMatchMessage = false;
    this.pairsOfPlayers = new Array();
    if (event >= 0) {
      this.displayLoading = true;
      this.getPairsOfplayers(event);
      this.displayNoMatchMessage = true;
    }
  }

  public getPairsOfplayers(input_value: number) :void {
    const pairs_of_keys = new Array();
    const pairs_of_players = new Array();
    this.nbaPlayersData.values.forEach(element => {
      const pair_height = input_value - element.h_in;
      if (pair_height > 0) {
        const pairs = this.nbaPlayersData.values.filter(player => Number(player.h_in) === pair_height);
        if (pairs.length) {
          pairs.forEach(subElement => {
            // Validate if is not the same player
            if (element.first_name + element.last_name !== subElement.first_name + subElement.last_name) {
              // Create unique key combination to avoid repeat pairs
              const aux_key = [element.first_name, element.last_name, subElement.first_name, subElement.last_name];
              aux_key.sort();
              const pairKey :string = aux_key[0] + "_" + aux_key[1] + "_" + aux_key[2] + "_" + aux_key[3];

              // Validate if the key was already added
              if (!pairs_of_keys.includes(pairKey)) {
                // Add key and element
                pairs_of_keys.push(pairKey);
                pairs_of_players.push([element, subElement]);
              }
            }
          });
        }
      }
    });
    this.pairsOfPlayers = pairs_of_players;
    this.displayLoading = false;
  }
}
