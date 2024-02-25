import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Role} from "../entities/Role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) {

  }

  public add(name: string): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + "/rollen", {
      name: name
    })
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/rollen/${id}?permanent=false`)
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/rollen/${id}?permanent=true`)
  }

  public get(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(environment.apiBaseUrl + "/rollen?deleted=false");
  }

  public getById(id: string): Observable<Role> {
    return this.httpClient.get<Role>(environment.apiBaseUrl + `/rollen/${id}`);
  }

  public getDeleted(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(environment.apiBaseUrl + "/rollen?deleted=true");
  }

  public update(rolle: Role): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseUrl + `/rollen/${rolle.id}`, rolle);
  }
}
