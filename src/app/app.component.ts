import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NbaPlayersService } from './services/nba-players/nba-players.service';
import { NbaPlayerDataI } from './models/interfaces/nba-player-data.interface';

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
    // Load NBA Playeres Data from API
    this._nbaPlayersService.getNbaPlayersData().subscribe(data => {
      this.nbaPlayersData = data;
      // Hide spinner animation
      this.displayLoading = false;
    });
  }

  public selectLanguage(event: any) {
    this._translateService.use(event.target.value)
  }

  // Function to execute when user click on submit button
  public submitValue(user_value: number) :void {
    this.displayNoMatchMessage = false;
    this.pairsOfPlayers = new Array();

    if (user_value >= 0) {
      this.displayLoading = true;
      this.getPairsOfplayers(user_value);
      this.displayNoMatchMessage = true;
    }
  }

  public getPairsOfplayers(input_value: number) :void {
    // Array to save the key that represent a pair
    const pairs_of_keys = new Array();
    // Array to save the pairs
    const pairs_of_players = new Array();

    this.nbaPlayersData.values.forEach(element => {
      const pair_height = input_value - element.h_in;
      if (pair_height > 0) {
        // Get the players with the necessary height
        const pairs = this.nbaPlayersData.values.filter(player => Number(player.h_in) === pair_height);
        if (pairs.length) {
          pairs.forEach(subElement => {
            // Validate if is not the same player
            if (element.first_name + element.last_name !== subElement.first_name + subElement.last_name) {
              // Create unique combination key to avoid repeat pairs
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
    // Assign results to display in the view
    this.pairsOfPlayers = pairs_of_players;
    // Hide spinner animation
    this.displayLoading = false;
  }
}
