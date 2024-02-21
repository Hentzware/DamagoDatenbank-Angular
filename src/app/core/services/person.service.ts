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

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(environment.apiBaseUrl + `/personen/${id}`);
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.apiBaseUrl + "/personen?deleted=false");
  }

  getDeletedPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.apiBaseUrl + "/personen?deleted=true");
  }

  addPerson(person: Person): Observable<void> {
    return this.http.post<void>(environment.apiBaseUrl + "/personen", person);
  }

  updatePerson(person: Person): Observable<void> {
    return this.http.put<void>(environment.apiBaseUrl + "/personen", person);
  }

  deletePerson(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/personen/${id}?permanent=false`);
  }

  deletePersonPermanent(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + `/personen/${id}?permanent=true`);
  }

  public searchPersons(nachname: string, vorname: string, geburtsdatum: Date): Observable<Person[]> {
    return this.http.get<Person[]>(environment.apiBaseUrl + `/personen/search?nachname=${nachname}&vorname=${vorname}&geburtsdatum=${geburtsdatum}`);
  }
}
