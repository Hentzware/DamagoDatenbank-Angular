import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Adresse} from "../entities/Adresse";
import {environment} from "../../../environments/environment";
import {Inventar} from "../entities/Inventar";

@Injectable({
  providedIn: 'root'
})
export class InventarService {

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<Inventar> {
    return this.http.get<Inventar>(environment.apiBaseUrl + `/inventar/${id}`);
  }

  get(): Observable<Inventar[]> {
    return this.http.get<Inventar[]>(environment.apiBaseUrl + "/inventar?deleted=false");
  }

  getDeleted(): Observable<Inventar[]> {
    return this.http.get<Inventar[]>(environment.apiBaseUrl + "/inventar?deleted=true");
  }

  add(inventar: Inventar): Observable<string> {
    return this.http.post<string>(environment.apiBaseUrl + "/inventar", inventar);
  }

  update(inventar: Inventar): Observable<void> {
    return this.http.put<void>(environment.apiBaseUrl + `/inventar/${inventar.id}`, inventar);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/inventar/${id}?permanent=false`);
  }

  deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/inventar/${id}?permanent=true`);
  }

}
