import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonRolle} from "../entities/PersonRolle";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PersonRolleService {

  constructor(private httpClient: HttpClient) { }

  public add(personRolle: PersonRolle): Observable<string> {
    return this.httpClient.post<string>(environment.apiBaseUrl + "/person-rolle", personRolle);
  }

  public getById(id: string): Observable<PersonRolle> {
    return this.httpClient.get<PersonRolle>(environment.apiBaseUrl + `/person-rolle/${id}`);
  }

  public update(personRolle: PersonRolle): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseUrl + `person-rolle/${personRolle.id}`, personRolle);
  }

  public get(): Observable<PersonRolle[]> {
    return this.httpClient.get<PersonRolle[]>(environment.apiBaseUrl + "/person-rolle");
  }

  public getDeleted(): Observable<PersonRolle[]> {
    return this.httpClient.get<PersonRolle[]>(environment.apiBaseUrl + "/person-rolle?deleted=true");
  }
}
