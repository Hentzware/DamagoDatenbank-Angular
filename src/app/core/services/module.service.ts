import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Module} from "../entities/Module";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiModuleUrl: string = environment.apiBaseUrl + environment.apiModuleUrl;

  constructor(private httpClient: HttpClient) {
  }

  public add(name: string, description: string): Observable<void> {
    return this.httpClient.post<void>(this.apiModuleUrl, {
      name: name, description: description
    });
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiModuleUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiModuleUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<Module[]> {
    return this.httpClient.get<Module[]>(this.apiModuleUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Module> {
    return this.httpClient.get<Module>(this.apiModuleUrl + `/${id}`);
  }

  public getDeleted(): Observable<Module[]> {
    return this.httpClient.get<Module[]>(this.apiModuleUrl + "?deleted=true");
  }

  public update(module: Module): Observable<void> {
    return this.httpClient.put<void>(this.apiModuleUrl + `/${module.id}`, module);
  }
}
