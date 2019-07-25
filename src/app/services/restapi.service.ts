import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Apiresponse} from '../entities/apiresponse';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private httpClient: HttpClient, private alertService: AlertService) { }

  public getWebsites(): Observable<any> {
    const jsonFile = `./assets/json/source.json`;
    return this.httpClient.get(jsonFile)
      .pipe(map((res: Apiresponse) => {
        if (res.status === 200) {
          return res.data;
        } else {
          this.alertService.showAlert('Error', 'error', 'error');
          return [];
        }
      }), catchError((error) => of([error])) );
  }
}
