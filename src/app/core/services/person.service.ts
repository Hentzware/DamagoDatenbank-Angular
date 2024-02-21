import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../entities/Person";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  private BASE_URL : string = "http://localhost:8080/damago/api/v1"

  constructor(private http: HttpClient) {
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.BASE_URL}/personen`)
  }

  public searchPersons(nachname: string, vorname: string, geburtsdatum: Date): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.BASE_URL}/personen/search?nachname=${nachname}&vorname=${vorname}&geburtsdatum=${geburtsdatum}`);
  }
}
