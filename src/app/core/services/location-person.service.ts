import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocationPerson} from "../entities/LocationPerson";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationPersonService {

  constructor(private httpClient: HttpClient) { }

  public add(locationPerson: LocationPerson): Observable<string> {
    return this.httpClient.post<string>(environment.apiBaseUrl + environment.apiLocationPersonUrl, locationPerson);
  }

  public getById(id: string): Observable<LocationPerson> {
    return this.httpClient.get<LocationPerson>(environment.apiBaseUrl + environment.apiLocationPersonUrl + `/${id}`);
  }

  public update(locationPerson: LocationPerson): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseUrl + environment.apiLocationPersonUrl + `/${locationPerson.id}`, locationPerson);
  }

  public get(): Observable<LocationPerson[]> {
    return this.httpClient.get<LocationPerson[]>(environment.apiBaseUrl + environment.apiLocationPersonUrl + "?deleted=false");
  }

  public getDeleted(): Observable<LocationPerson[]> {
    return this.httpClient.get<LocationPerson[]>(environment.apiBaseUrl + environment.apiLocationPersonUrl + "?deleted=true");
  }

  public search(location_id: string, person_id: string): Observable<LocationPerson[]> {
    return this.httpClient.get<LocationPerson[]>(environment.apiBaseUrl + environment.apiLocationPersonUrl + `/search?location_id=${location_id}&person_id=${person_id}`);
  }
}
