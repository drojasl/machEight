import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbaPlayerDataI } from '../../models/interfaces/nba-player-data.interface';

@Injectable({
  providedIn: 'root'
})
export class NbaPlayersService {
  private _urlService = 'https://mach-eight.uc.r.appspot.com/';

  constructor(private _http: HttpClient) { }

  public getNbaPlayersData() :Observable<NbaPlayerDataI> {
    // Get data from API
    return this._http.get<NbaPlayerDataI>(this._urlService);
  }
}
