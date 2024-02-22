import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Rolle} from "../entities/Rolle";

@Injectable({
  providedIn: 'root'
})
export class RolleService {

  constructor(private httpClient: HttpClient) {

  }

  public getById(id: string): Observable<Rolle> {
    return this.httpClient.get<Rolle>(environment.apiBaseUrl + `/rollen/${id}`);
  }

  public get(): Observable<Rolle[]> {
    return this.httpClient.get<Rolle[]>(environment.apiBaseUrl + "/rollen?deleted=false");
  }

  public getDeleted(): Observable<Rolle[]> {
  return this.httpClient.get<Rolle[]>(environment.apiBaseUrl + "/rollen?deleted=true");
}

public add(name: string): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + "/rollen", {
      name : name
    })
}
public update(rolle: Rolle): Observable<void>{
    return this.httpClient.put<void>(environment.apiBaseUrl + `/rollen/${rolle.id}`, rolle);
}
public delete(id: string): Observable<void>{
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/rollen/${id}?permanent=false`)
}
public deletePermanent(id: string):Observable<void>{
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/rollen/${id}?permanent=true`)
}
}
