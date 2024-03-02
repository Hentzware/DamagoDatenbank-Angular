import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "../entities/Location";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiLocationUrl: string = environment.apiBaseUrl + environment.apiLocationsUrl;

  constructor(private httpClient: HttpClient) {
  }

  public add(name: string): Observable<void> {
    return this.httpClient.post<void>(this.apiLocationUrl, {
      name: name
    });
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiLocationUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiLocationUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.apiLocationUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Location> {
    return this.httpClient.get<Location>(this.apiLocationUrl + `/${id}`);
  }

  public getDeleted(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.apiLocationUrl + "?deleted=true");
  }

  public update(standort: Location): Observable<void> {
    return this.httpClient.put<void>(this.apiLocationUrl + `/${standort.id}`, standort);
  }
}
