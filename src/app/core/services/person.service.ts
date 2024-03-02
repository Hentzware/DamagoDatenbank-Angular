import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../entities/Person";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  private apiPersonUrl: string = environment.apiBaseUrl + environment.apiPersonUrl;

  constructor(private http: HttpClient) {
  }

  public add(person: Person): Observable<string> {
    return this.http.post<string>(this.apiPersonUrl, person);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiPersonUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(this.apiPersonUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiPersonUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Person> {
    return this.http.get<Person>(this.apiPersonUrl + `/${id}`);
  }

  public getDeleted(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiPersonUrl + "?deleted=true");
  }

  public update(person: Person): Observable<void> {
    return this.http.put<void>(this.apiPersonUrl + `/${person.id}`, person);
  }

}
