import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Role} from "../entities/Role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiRoleUrl: string = environment.apiBaseUrl + environment.apiRoleUrl;

  constructor(private httpClient: HttpClient) {

  }

  public add(name: string): Observable<void> {
    return this.httpClient.post<void>(this.apiRoleUrl, {
      name: name
    })
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiRoleUrl + `/${id}?permanent=false`)
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiRoleUrl + `/${id}?permanent=true`)
  }

  public get(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.apiRoleUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Role> {
    return this.httpClient.get<Role>(this.apiRoleUrl + `/${id}`);
  }

  public getDeleted(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.apiRoleUrl + "?deleted=true");
  }

  public search(name: string): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.apiRoleUrl + `/search?name=${name}`);
  }

  public update(role: Role): Observable<void> {
    return this.httpClient.put<void>(this.apiRoleUrl + `/${role.id}`, role);
  }
}
