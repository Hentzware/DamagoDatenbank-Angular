import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Standort} from "../entities/Standort";
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

  public add(name: string): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + "/module", {
      name: name
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
