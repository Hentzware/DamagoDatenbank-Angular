import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-person-search',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './person-search.component.html',
  styleUrl: './person-search.component.css'
})
export class PersonSearchComponent {
  constructor(public dialogRef: MatDialogRef<PersonSearchComponent>) {
  }

  public onCloseClick(): void {
    this.dialogRef.close();
  }
}
