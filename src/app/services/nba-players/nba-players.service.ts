import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NbaPlayerDataI } from '../../models/interfaces/nba-player-data.interface';

@Injectable({
  providedIn: 'root'
})
export class NbaPlayersService {
  private _urlService = 'https://mach-eight.uc.r.appspot.com/';

  constructor(private _http: HttpClient) { }

  public getNbaPlayersData() :Observable<NbaPlayerDataI> {
    return this._http.get<NbaPlayerDataI>(this._urlService);
  }
}
