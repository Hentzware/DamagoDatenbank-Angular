import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PersonPhone} from "../entities/PersonPhone";

@Injectable({
  providedIn: 'root'
})
export class PersonPhoneService {
  private apiPersonPhoneUrl: string = environment.apiBaseUrl + environment.apiPersonPhoneUrl;

  constructor(private httpClient: HttpClient) { }

  public add(personPhone: PersonPhone): Observable<void> {
    return this.httpClient.post<void>(this.apiPersonPhoneUrl, personPhone);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPersonPhoneUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPersonPhoneUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<PersonPhone[]> {
    return this.httpClient.get<PersonPhone[]>(this.apiPersonPhoneUrl + "?deleted=false");
  }

  public getById(id: string): Observable<PersonPhone> {
    return this.httpClient.get<PersonPhone>(this.apiPersonPhoneUrl + `/${id}`);
  }

  public getDeleted(): Observable<PersonPhone[]> {
    return this.httpClient.get<PersonPhone[]>(this.apiPersonPhoneUrl + "?deleted=true");
  }

  public search(person_id: string, phone_id: string): Observable<PersonPhone[]> {
    return this.httpClient.get<PersonPhone[]>(this.apiPersonPhoneUrl + `/search?person_id=${person_id}&phone_id=${phone_id}`);
  }

  public update(personPhone: PersonPhone): Observable<void> {
    return this.httpClient.put<void>(this.apiPersonPhoneUrl + `/${personPhone.id}`, personPhone);
  }
}
