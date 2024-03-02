import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Inventory} from "../entities/Inventory";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiInventoryUrl: string = environment.apiBaseUrl + environment.apiInventoriesUrl;

  constructor(private http: HttpClient) {
  }

  public add(inventory: Inventory): Observable<string> {
    return this.http.post<string>(this.apiInventoryUrl, inventory);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiInventoryUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(this.apiInventoryUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiInventoryUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(this.apiInventoryUrl + `/${id}`);
  }

  public getDeleted(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiInventoryUrl + "?deleted=true");
  }

  public update(inventory: Inventory): Observable<void> {
    return this.http.put<void>(this.apiInventoryUrl + `/${inventory.id}`, inventory);
  }

}
