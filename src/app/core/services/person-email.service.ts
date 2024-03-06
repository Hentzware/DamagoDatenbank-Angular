import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PersonPhone} from "../entities/PersonPhone";
import {PersonEmail} from "../entities/PersonEmail";

@Injectable({
  providedIn: 'root'
})
export class PersonEmailService {
  private apiPersonEmailUrl: string = environment.apiBaseUrl + environment.apiPersonEmailUrl;

  constructor(private httpClient: HttpClient) { }

  public add(personEmail: PersonEmail): Observable<void> {
    return this.httpClient.post<void>(this.apiPersonEmailUrl, personEmail);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPersonEmailUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPersonEmailUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<PersonEmail[]> {
    return this.httpClient.get<PersonEmail[]>(this.apiPersonEmailUrl + "?deleted=false");
  }

  public getById(id: string): Observable<PersonEmail> {
    return this.httpClient.get<PersonEmail>(this.apiPersonEmailUrl + `/${id}`);
  }

  public getDeleted(): Observable<PersonEmail[]> {
    return this.httpClient.get<PersonEmail[]>(this.apiPersonEmailUrl + "?deleted=true");
  }

  public search(person_id: string, email_id: string): Observable<PersonEmail[]> {
    return this.httpClient.get<PersonEmail[]>(this.apiPersonEmailUrl + `/search?person_id=${person_id}&email_id=${email_id}`);
  }

  public update(personEmail: PersonEmail): Observable<void> {
    return this.httpClient.put<void>(this.apiPersonEmailUrl + `/${personEmail.id}`, personEmail);
  }
}
