import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PersonService} from "./services/person.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, NgFor} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    NgFor,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'damago-datenbank-angular';
  data: any[] = [];

  constructor(private personService: PersonService) {
  }

  ngOnInit(): void {
    this.personService.getPersons().subscribe(result => this.data = result);
  }
}
