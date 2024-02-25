import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonStandort} from "../entities/PersonStandort";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonStandortService {

  constructor(private httpClient: HttpClient) { }

  public add(personStandort: PersonStandort): Observable<string> {
    return this.httpClient.post<string>(environment.apiBaseUrl + "/person-standort", personStandort);
  }

  public getById(id: string): Observable<PersonStandort> {
    return this.httpClient.get<PersonStandort>(environment.apiBaseUrl + `/person-standort/${id}`);
  }

  public update(personStandort: PersonStandort): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseUrl + `person-standort/${personStandort.id}`, personStandort);
  }

  public get(): Observable<PersonStandort[]> {
    return this.httpClient.get<PersonStandort[]>(environment.apiBaseUrl + "/person-standort");
  }

  public getDeleted(): Observable<PersonStandort[]> {
    return this.httpClient.get<PersonStandort[]>(environment.apiBaseUrl + "/person-standort?deleted=true");
  }
}
