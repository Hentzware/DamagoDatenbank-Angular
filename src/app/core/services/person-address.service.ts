import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PersonAddress} from "../entities/PersonAddress";

@Injectable({
  providedIn: 'root'
})
export class PersonAddressService {
  private apiPersonAddressUrl: string = environment.apiBaseUrl + environment.apiPersonAddressUrl;

  constructor(private httpClient: HttpClient) {
  }

  public add(personAdresse: PersonAddress): Observable<void> {
    return this.httpClient.post<void>(this.apiPersonAddressUrl, personAdresse);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPersonAddressUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPersonAddressUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<PersonAddress[]> {
    return this.httpClient.get<PersonAddress[]>(this.apiPersonAddressUrl + "?deleted=false");
  }

  public getById(id: string): Observable<PersonAddress> {
    return this.httpClient.get<PersonAddress>(this.apiPersonAddressUrl + `/${id}`);
  }

  public getDeleted(): Observable<PersonAddress[]> {
    return this.httpClient.get<PersonAddress[]>(this.apiPersonAddressUrl + "?deleted=true");
  }

  public search(person_id: string, adresse_id: string): Observable<PersonAddress[]> {
    return this.httpClient.get<PersonAddress[]>(this.apiPersonAddressUrl + `/search?personId=${person_id}&adresseId=${adresse_id}`);
  }

  public update(personAdresse: PersonAddress): Observable<void> {
    return this.httpClient.put<void>(this.apiPersonAddressUrl + `/${personAdresse.id}`, personAdresse);
  }
}
