import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Standort} from "../entities/Standort";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StandortService {
  constructor(private httpClient: HttpClient) {
  }

  public get(): Observable<Standort[]> {
    return this.httpClient.get<Standort[]>("https://localhost:8080/damago/api/v1/standorte");
  }

  public post(standort: Standort): Observable<void> {
    return this.httpClient.post<void>("https://localhost:8080/damago/api/v1/standorte", standort)
  }

  public delete(standort: Standort): Observable<void> {
    console.log(standort);
    return this.httpClient.delete<void>(`https://localhost:8080/damago/api/v1/standorte/${standort.id}`);
  }
}
