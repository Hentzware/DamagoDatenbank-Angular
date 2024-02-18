import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  private BASE_URL : string = "http://localhost:8080/damago/api/v1"

  constructor(private http: HttpClient) {
  }

  getPersons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/personen`)
  }
}
