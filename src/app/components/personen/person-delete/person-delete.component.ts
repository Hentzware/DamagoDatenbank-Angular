import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PersonService} from "../../../core/services/person.service";
import {concatMap} from "rxjs";
import {AdresseService} from "../../../core/services/adresse.service";

@Component({
  selector: 'app-person-delete',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    MatLabel
  ],
  templateUrl: './person-delete.component.html',
  styleUrl: './person-delete.component.css'
})
export class PersonDeleteComponent {
  public nachname: string;
  public vorname: string;

  constructor(private dialogRef: MatDialogRef<PersonDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private personService: PersonService,
              private adresseService: AdresseService) {
    this.nachname = data.person.nachname;
    this.vorname = data.person.vorname;
  }

  public deletePerson(): void {
    this.personService.delete(this.data.person.id).pipe(
      concatMap(() => {
          return this.adresseService.delete(this.data.person.adresse.id);
        }
      )
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
