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

  getAdress(id: string): Observable<Adresse> {
    return this.http.get<Adresse>(environment.apiBaseUrl + `/adressen/${id}`);
  }

  getAdresses(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(environment.apiBaseUrl + "/adressen?deleted=false");
  }

  getDeletedAdresses(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(environment.apiBaseUrl + "/adressen?deleted=true");
  }

  addAdress(adresse: Adresse): Observable<void> {
    return this.http.post<void>(environment.apiBaseUrl + "/adressen", adresse);
  }

  updateAdress(adresse: Adresse): Observable<void> {
    return this.http.put<void>(environment.apiBaseUrl + `/adressen/${adresse.id}`, adresse);
  }

  deleteAdress(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/adressen/${id}?permanent=false`);
  }

  deleteAdressPermanent(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/adressen/${id}?permanent=true`);
  }


}
