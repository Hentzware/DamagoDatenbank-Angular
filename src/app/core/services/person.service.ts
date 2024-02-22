import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../entities/Person";
import {environment} from "../../../environments/environment";
import {AddPersonRequest} from "../requests/person/add-person-request";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<Person> {
    return this.http.get<Person>(environment.apiBaseUrl + `/personen/${id}`);
  }

  get(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.apiBaseUrl + "/personen?deleted=false");
  }

  getDeleted(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.apiBaseUrl + "/personen?deleted=true");
  }

  add(person: Person): Observable<string> {
    return this.http.post<string>(environment.apiBaseUrl + "/personen", person);
  }

  update(person: Person): Observable<void> {
    return this.http.put<void>(environment.apiBaseUrl + `/personen/${person.id}`, person);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/personen/${id}?permanent=false`);
  }

  deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/personen/${id}?permanent=true`);
  }

}
