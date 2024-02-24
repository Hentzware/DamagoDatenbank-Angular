import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Raum} from "../entities/Raum";

@Injectable({
  providedIn: 'root'
})
export class RaumService {
  constructor(private http: HttpClient) {
  }

  public add(raum: Raum): Observable<string> {
    return this.http.post<string>(environment.apiBaseUrl + "/raeume", raum);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/raeume/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/raeume/${id}?permanent=true`);
  }

  public get(): Observable<Raum[]> {
    return this.http.get<Raum[]>(environment.apiBaseUrl + "/raeume?deleted=false");
  }

  public getById(id: string): Observable<Raum> {
    return this.http.get<Raum>(environment.apiBaseUrl + `/raeume/${id}`);
  }

  public getDeleted(): Observable<Raum[]> {
    return this.http.get<Raum[]>(environment.apiBaseUrl + "/raeume?deleted=true");
  }

  public update(raum: Raum): Observable<void> {
    return this.http.put<void>(environment.apiBaseUrl + `/raeume/${raum.id}`, raum);
  }
}
