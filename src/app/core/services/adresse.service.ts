import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(private httpClient: HttpClient) {
  }
}
