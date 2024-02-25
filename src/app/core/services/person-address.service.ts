import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PersonAddress} from "../entities/PersonAddress";

@Injectable({
  providedIn: 'root'
})
export class PersonAddressService {

  constructor(private httpClient: HttpClient) {
  }

  public add(personAdresse: PersonAddress): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + "/person-adresse", personAdresse);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/person-adresse/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/person-adresse/${id}?permanent=true`);
  }

  public get(): Observable<PersonAddress[]> {
    return this.httpClient.get<PersonAddress[]>(environment.apiBaseUrl + "/person-adresse?deleted=false");
  }

  public getById(id: string): Observable<PersonAddress> {
    return this.httpClient.get<PersonAddress>(environment.apiBaseUrl + `/person-adresse/${id}`);
  }

  public getDeleted(): Observable<PersonAddress[]> {
    return this.httpClient.get<PersonAddress[]>(environment.apiBaseUrl + "/person-adresse?deleted=true");
  }

  public search(person_id: string, adresse_id: string): Observable<PersonAddress[]> {
    return this.httpClient.get<PersonAddress[]>(environment.apiBaseUrl + `/person-adresse/search?personId=${person_id}&adresseId=${adresse_id}`);
  }

  public update(personAdresse: PersonAddress): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseUrl + `/person-adresse/${personAdresse.id}`, personAdresse);
  }
}
