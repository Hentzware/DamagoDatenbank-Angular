import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocationPerson} from "../entities/LocationPerson";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationPersonService {
  private apiLocationPersonUrl: string = environment.apiBaseUrl + environment.apiLocationPersonUrl;

  constructor(private httpClient: HttpClient) {
  }

  public add(locationPerson: LocationPerson): Observable<string> {
    return this.httpClient.post<string>(this.apiLocationPersonUrl, locationPerson);
  }

  public get(): Observable<LocationPerson[]> {
    return this.httpClient.get<LocationPerson[]>(this.apiLocationPersonUrl + "?deleted=false");
  }

  public getById(id: string): Observable<LocationPerson> {
    return this.httpClient.get<LocationPerson>(this.apiLocationPersonUrl + `/${id}`);
  }

  public getDeleted(): Observable<LocationPerson[]> {
    return this.httpClient.get<LocationPerson[]>(this.apiLocationPersonUrl + "?deleted=true");
  }

  public search(location_id: any, person_id: any): Observable<LocationPerson[]> {
    return this.httpClient.get<LocationPerson[]>(this.apiLocationPersonUrl + `/search?location_id=${location_id}&person_id=${person_id}`);
  }

  public update(locationPerson: LocationPerson): Observable<void> {
    return this.httpClient.put<void>(this.apiLocationPersonUrl + `/${locationPerson.id}`, locationPerson);
  }
}
