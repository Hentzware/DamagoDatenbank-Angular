import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Standort} from "../entities/Standort";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StandortService {
  constructor(private httpClient: HttpClient) {
  }

  public add(name: string): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + "/standorte", {
      name: name
    });
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/standorte/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/standorte/${id}?permanent=true`);
  }

  public get(): Observable<Standort[]> {
    return this.httpClient.get<Standort[]>(environment.apiBaseUrl + "/standorte?deleted=false");
  }

  public getById(id: string): Observable<Standort> {
    return this.httpClient.get<Standort>(environment.apiBaseUrl + `/standorte/${id}`);
  }

  public getDeleted(): Observable<Standort[]> {
    return this.httpClient.get<Standort[]>(environment.apiBaseUrl + "/standorte?deleted=true");
  }

  public update(standort: Standort): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseUrl + `/standorte/${standort.id}`, standort);
  }
}
