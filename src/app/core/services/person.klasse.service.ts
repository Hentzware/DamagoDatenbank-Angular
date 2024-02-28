import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonRolle} from "../entities/PersonRolle";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PersonKlasse} from "../entities/PersonKlasse";


@Injectable({
  providedIn: 'root'
})
export class PersonKlasseService {

  constructor(private httpClient: HttpClient) { }

  public add(personKlasse: PersonKlasse): Observable<string> {
    return this.httpClient.post<string>(environment.apiBaseUrl + "/person-klasse", personKlasse);
  }

  public getById(id: string): Observable<PersonKlasse> {
    return this.httpClient.get<PersonKlasse>(environment.apiBaseUrl + `/person-klasse/${id}`);
  }

  public update(personKlasse: PersonKlasse): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseUrl + `person-klasse/${personKlasse.id}`, personKlasse);
  }

  public get(): Observable<PersonKlasse[]> {
    return this.httpClient.get<PersonKlasse[]>(environment.apiBaseUrl + "/person-klasse");
  }

  public getDeleted(): Observable<PersonKlasse[]> {
    return this.httpClient.get<PersonKlasse[]>(environment.apiBaseUrl + "/person-klasse?deleted=true");
  }
}
