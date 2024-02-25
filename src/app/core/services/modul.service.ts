import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Modul} from "../entities/Modul";

@Injectable({
  providedIn: 'root'
})
export class ModulService {

  constructor(private httpClient: HttpClient) {
  }
  public getById(id: string): Observable<Modul> {
    return this.httpClient.get<Modul>(environment.apiBaseUrl + `/module/${id}`);
  }

  public get(): Observable<Modul[]> {
    return this.httpClient.get<Modul[]>(environment.apiBaseUrl + "/module?deleted=false");
  }

  public getDeleted(): Observable<Modul[]> {
    return this.httpClient.get<Modul[]>(environment.apiBaseUrl + "/module?deleted=true");
  }

  public add(name: string, beschreibung: string): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + "/module", {
      name: name,
      beschreibung: beschreibung
    });
  }

  public update(modul: Modul): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseUrl + `/module/${modul.id}`, modul);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/module/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/module/${id}?permanent=true`);
  }
}
