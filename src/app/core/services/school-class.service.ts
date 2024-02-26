import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {SchoolClass} from "../entities/SchoolClass";

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {
  private apiSchoolClassesUrl: string = environment.apiBaseUrl + environment.apiSchoolClassesUrl;

  constructor(private httpClient: HttpClient) {
  }

  public add(name: string): Observable<void> {
    return this.httpClient.post<void>(this.apiSchoolClassesUrl, {
      name: name
    });
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiSchoolClassesUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiSchoolClassesUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<SchoolClass[]> {
    return this.httpClient.get<SchoolClass[]>(this.apiSchoolClassesUrl + "?deleted=false");
  }

  public getById(id: string): Observable<SchoolClass> {
    return this.httpClient.get<SchoolClass>(this.apiSchoolClassesUrl + `/${id}`);
  }

  public getDeleted(): Observable<SchoolClass[]> {
    return this.httpClient.get<SchoolClass[]>(this.apiSchoolClassesUrl + "?deleted=true");
  }

  public update(schoolClass: SchoolClass): Observable<void> {
    return this.httpClient.put<void>(this.apiSchoolClassesUrl + `/${schoolClass.id}`, schoolClass);
  }
}
