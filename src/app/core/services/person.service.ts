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
    return this.http.post<string>(environment.apiBaseUrl + "/personen", person);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/personen/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/personen/${id}?permanent=true`);
  }

  public get(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.apiBaseUrl + "/personen?deleted=false");
  }

  public getById(id: string): Observable<Person> {
    return this.http.get<Person>(environment.apiBaseUrl + `/personen/${id}`);
  }

  public getDeleted(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.apiBaseUrl + "/personen?deleted=true");
  }

  public update(person: Person): Observable<void> {
    return this.http.put<void>(environment.apiBaseUrl + `/personen/${person.id}`, person);
  }

}
