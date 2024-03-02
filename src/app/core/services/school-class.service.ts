import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {SchoolClass} from "../entities/SchoolClass";

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {
  private apiSchoolClassUrl: string = environment.apiBaseUrl + environment.apiSchoolClassesUrl;

  constructor(private httpClient: HttpClient) {
  }

  public add(name: string): Observable<void> {
    return this.httpClient.post<void>(this.apiSchoolClassUrl, {
      name: name
    });
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiSchoolClassUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiSchoolClassUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<SchoolClass[]> {
    return this.httpClient.get<SchoolClass[]>(this.apiSchoolClassUrl + "?deleted=false");
  }

  public getById(id: string): Observable<SchoolClass> {
    return this.httpClient.get<SchoolClass>(this.apiSchoolClassUrl + `/${id}`);
  }

  public getDeleted(): Observable<SchoolClass[]> {
    return this.httpClient.get<SchoolClass[]>(this.apiSchoolClassUrl + "?deleted=true");
  }

  public search(name: string): Observable<SchoolClass[]> {
    return this.httpClient.get<SchoolClass[]>(this.apiSchoolClassUrl + `/search?name=${name}`);
  }

  public update(schoolClass: SchoolClass): Observable<void> {
    return this.httpClient.put<void>(this.apiSchoolClassUrl + `/${schoolClass.id}`, schoolClass);
  }
}
