import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../entities/Person";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  constructor(private http: HttpClient) {
  }

  public add(person: Person): Observable<string> {
    return this.http.post<string>(environment.apiBaseUrl + environment.apiPersonsUrl, person);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + environment.apiPersonsUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + environment.apiPersonsUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.apiBaseUrl + environment.apiPersonsUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Person> {
    return this.http.get<Person>(environment.apiBaseUrl + environment.apiPersonsUrl + `/${id}`);
  }

  public getDeleted(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.apiBaseUrl + environment.apiPersonsUrl + "?deleted=true");
  }

  public update(person: Person): Observable<void> {
    return this.http.put<void>(environment.apiBaseUrl + environment.apiPersonsUrl + `/${person.id}`, person);
  }

}
