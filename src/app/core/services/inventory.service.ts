import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Inventory} from "../entities/Inventory";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiInventoriesUrl: string = environment.apiBaseUrl + environment.apiInventoriesUrl;

  constructor(private http: HttpClient) {
  }

  public add(inventory: Inventory): Observable<string> {
    return this.http.post<string>(this.apiInventoriesUrl, inventory);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiInventoriesUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(this.apiInventoriesUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiInventoriesUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(this.apiInventoriesUrl + `/${id}`);
  }

  public getDeleted(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiInventoriesUrl + "?deleted=true");
  }

  public update(inventory: Inventory): Observable<void> {
    return this.http.put<void>(this.apiInventoriesUrl + `/${inventory.id}`, inventory);
  }

}
