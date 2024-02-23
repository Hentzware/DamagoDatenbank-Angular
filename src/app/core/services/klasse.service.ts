import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Klasse} from "../entities/Klasse";

@Injectable({
  providedIn: 'root'
})
export class KlasseService {

  constructor(private httpClient: HttpClient) {
  }
  public getById(id: string): Observable<Klasse> {
    return this.httpClient.get<Klasse>(environment.apiBaseUrl + `/klassen/${id}`);
  }

  public get(): Observable<Klasse[]> {
    return this.httpClient.get<Klasse[]>(environment.apiBaseUrl + "/klassen?deleted=false");
  }

  public getDeleted(): Observable<Klasse[]> {
    return this.httpClient.get<Klasse[]>(environment.apiBaseUrl + "/klassen?deleted=true");
  }

  public add(name: string): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + "/klassen", {
      name: name
    });
  }

  public update(klasse: Klasse): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseUrl + `/klassen/${klasse.id}`, klasse);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/klassen/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/klassen/${id}?permanent=true`);
  }
}
