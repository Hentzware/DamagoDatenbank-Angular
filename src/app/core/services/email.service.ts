import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Email} from "../entities/Email";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiEmailUrl: string = environment.apiBaseUrl + environment.apiEmailUrl;

  constructor(private httpClient: HttpClient) { }

  public add(email: Email): Observable<void> {
    return this.httpClient.post<void>(this.apiEmailUrl, email);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiEmailUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiEmailUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<Email[]> {
    return this.httpClient.get<Email[]>(this.apiEmailUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Email> {
    return this.httpClient.get<Email>(this.apiEmailUrl + `/${id}`);
  }

  public getDeleted(): Observable<Email[]> {
    return this.httpClient.get<Email[]>(this.apiEmailUrl + "?deleted=true");
  }

  public search(email: string): Observable<Email[]> {
    return this.httpClient.get<Email[]>(this.apiEmailUrl + `/search?email=${email}`);
  }

  public update(email: Email): Observable<void> {
    return this.httpClient.put<void>(this.apiEmailUrl + `/${email.id}`, email);
  }
}
