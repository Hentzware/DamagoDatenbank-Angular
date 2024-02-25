import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Class} from "../entities/Class";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private httpClient: HttpClient) {
  }

  public add(name: string): Observable<void> {
    return this.httpClient.post<void>(environment.apiBaseUrl + "/klassen", {
      name: name
    });
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/klassen/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiBaseUrl + `/klassen/${id}?permanent=true`);
  }

  public get(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(environment.apiBaseUrl + "/klassen?deleted=false");
  }

  public getById(id: string): Observable<Class> {
    return this.httpClient.get<Class>(environment.apiBaseUrl + `/klassen/${id}`);
  }

  public getDeleted(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(environment.apiBaseUrl + "/klassen?deleted=true");
  }

  public update(klasse: Class): Observable<void> {
    return this.httpClient.put<void>(environment.apiBaseUrl + `/klassen/${klasse.id}`, klasse);
  }
}
