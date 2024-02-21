import { Component } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {Router, RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButton,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {
  }

  public navigateTo(target: string) : void {
    this.router.navigateByUrl(target);
  }
}
