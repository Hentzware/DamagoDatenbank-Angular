import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Address} from "../entities/Address";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiAddressesUrl: string = environment.apiBaseUrl + environment.apiAddressesUrl;

  constructor(private http: HttpClient) {
  }

  public add(adresse: Address): Observable<string> {
    return this.http.post<string>(this.apiAddressesUrl, adresse);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiAddressesUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(this.apiAddressesUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiAddressesUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Address> {
    return this.http.get<Address>(this.apiAddressesUrl + `/${id}`);
  }

  public getDeleted(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiAddressesUrl + "?deleted=true");
  }

  public update(adresse: Address): Observable<void> {
    return this.http.put<void>(this.apiAddressesUrl + `/${adresse.id}`, adresse);
  }


}
