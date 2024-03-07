import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PersonSchoolClass} from "../entities/PersonSchoolClass";


@Injectable({
  providedIn: 'root'
})
export class PersonSchoolClassService {
  private apiPersonSchoolClassUrl: string = environment.apiBaseUrl + environment.apiPersonSchoolClassUrl;

  constructor(private httpClient: HttpClient) {
  }

  public add(personSchoolClass: PersonSchoolClass): Observable<string> {
    return this.httpClient.post<string>(this.apiPersonSchoolClassUrl, personSchoolClass);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPersonSchoolClassUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiPersonSchoolClassUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<PersonSchoolClass[]> {
    return this.httpClient.get<PersonSchoolClass[]>(this.apiPersonSchoolClassUrl);
  }

  public getById(id: string): Observable<PersonSchoolClass> {
    return this.httpClient.get<PersonSchoolClass>(this.apiPersonSchoolClassUrl + `/${id}`);
  }

  public getDeleted(): Observable<PersonSchoolClass[]> {
    return this.httpClient.get<PersonSchoolClass[]>(this.apiPersonSchoolClassUrl + "?deleted=true");
  }

  public search(personId: any, schoolClassId: any): Observable<PersonSchoolClass[]> {
    return this.httpClient.get<PersonSchoolClass[]>(this.apiPersonSchoolClassUrl + `/search?person_id=${personId}&school_class_id=${schoolClassId}`);
  }

  public update(personSchoolClass: PersonSchoolClass): Observable<void> {
    return this.httpClient.put<void>(this.apiPersonSchoolClassUrl + `/${personSchoolClass.id}`, personSchoolClass);
  }
}
