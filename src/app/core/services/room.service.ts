import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Room} from "../entities/Room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiRoomUrl: string = environment.apiBaseUrl + environment.apiRoomUrl;

  constructor(private http: HttpClient) {
  }

  public add(room: Room): Observable<string> {
    return this.http.post<string>(this.apiRoomUrl, room);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiRoomUrl + `/${id}?permanent=false`);
  }

  public deletePermanent(id: string): Observable<void> {
    return this.http.delete<void>(this.apiRoomUrl + `/${id}?permanent=true`);
  }

  public get(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiRoomUrl + "?deleted=false");
  }

  public getById(id: string): Observable<Room> {
    return this.http.get<Room>(this.apiRoomUrl + `/${id}`);
  }

  public getDeleted(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiRoomUrl + "?deleted=true");
  }

  public search(name: string, nr: string): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiRoomUrl + `/search?name=${name}&nr=${nr}`);
  }

  public update(raum: Room): Observable<void> {
    return this.http.put<void>(this.apiRoomUrl + `/${raum.id}`, raum);
  }
}
