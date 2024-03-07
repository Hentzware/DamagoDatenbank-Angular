import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonRole} from "../entities/PersonRole";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PersonRoleService {
  private apiPersonRoleUrl: string = environment.apiBaseUrl + environment.apiPersonRoleUrl;

  constructor(private httpClient: HttpClient) {
  }

  public add(personRolle: PersonRole): Observable<string> {
    return this.httpClient.post<string>(this.apiPersonRoleUrl, personRolle);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPersonRoleUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPersonRoleUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<PersonRole[]> {
    return this.httpClient.get<PersonRole[]>(this.apiPersonRoleUrl);
  }

  public getById(id: string): Observable<PersonRole> {
    return this.httpClient.get<PersonRole>(this.apiPersonRoleUrl + `/${id}`);
  }

  public getDeleted(): Observable<PersonRole[]> {
    return this.httpClient.get<PersonRole[]>(this.apiPersonRoleUrl + "?deleted=true");
  }

  public search(personId: any, roleId: any): Observable<PersonRole[]> {
    return this.httpClient.get<PersonRole[]>(this.apiPersonRoleUrl + `/search?person_id=${personId}&role_id=${roleId}`);
  }

  public update(personRolle: PersonRole): Observable<void> {
    return this.httpClient.put<void>(this.apiPersonRoleUrl + `/${personRolle.id}`, personRolle);
  }
}
