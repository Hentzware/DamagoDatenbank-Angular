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

  public getLocation(id: string): Observable<Standort> {
    return this.httpClient.get<Standort>(environment.apiBaseUrl + `/standorte/${id}`)
  }

  public getLocations(): Observable<Standort[]> {
    return this.httpClient.get<Standort[]>(environment.apiBaseUrl + "/standorte?deleted=false");
  }

  public getDeletedLocations(): Observable<Standort[]> {
    return this.httpClient.get<Standort[]>(environment.apiBaseUrl + "/standorte?deleted=true");
  }

  public addLocation(standort: Standort): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + "/standorte", standort)
  }

  public updateLocation(standort: Standort): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + "/standorte", standort);
  }

  public deleteLocation(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/standorte/${id}?permanent=false`);
  }

  public deleteLocationPermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/standorte/${id}?permanent=true`);
  }
}
