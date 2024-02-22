import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../entities/Person";
import {environment} from "../../../environments/environment";
import {Adresse} from "../entities/Adresse";

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<Adresse> {
    return this.http.get<Adresse>(environment.apiBaseUrl + `/adressen/${id}`);
  }

  get(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(environment.apiBaseUrl + "/adressen?deleted=false");
  }

  getDeleted(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(environment.apiBaseUrl + "/adressen?deleted=true");
  }

  add(adresse: Adresse): Observable<string> {
    return this.http.post<string>(environment.apiBaseUrl + "/adressen", adresse);
  }

  update(adresse: Adresse): Observable<void> {
    return this.http.put<void>(environment.apiBaseUrl + `/adressen/${adresse.id}`, adresse);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/adressen/${id}?permanent=false`);
  }

  deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/adressen/${id}?permanent=true`);
  }


}
