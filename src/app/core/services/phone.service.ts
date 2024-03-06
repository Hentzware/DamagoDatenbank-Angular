import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Phone} from "../entities/Phone";

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private apiPhoneUrl: string = environment.apiBaseUrl + environment.apiPhoneUrl;

  constructor(private httpClient: HttpClient) { }

  public add(phone: Phone): Observable<void> {
    return this.httpClient.post<void>(this.apiPhoneUrl, phone);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPhoneUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPhoneUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<Phone[]> {
    return this.httpClient.get<Phone[]>(this.apiPhoneUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Phone> {
    return this.httpClient.get<Phone>(this.apiPhoneUrl + `/${id}`);
  }

  public getDeleted(): Observable<Phone[]> {
    return this.httpClient.get<Phone[]>(this.apiPhoneUrl + "?deleted=true");
  }

  public search(phone: string): Observable<Phone[]> {
    return this.httpClient.get<Phone[]>(this.apiPhoneUrl + `/search?phone=${phone}`);
  }

  public update(phone: Phone): Observable<void> {
    return this.httpClient.put<void>(this.apiPhoneUrl + `/${phone.id}`, phone);
  }
}
