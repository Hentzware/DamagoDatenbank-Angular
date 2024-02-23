import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Person} from "../../../core/entities/Person";
import {PersonService} from "../../../core/services/person.service";
import {AdresseService} from "../../../core/services/adresse.service";
import {PersonAdresseService} from "../../../core/services/person.adresse.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {concatMap} from "rxjs";

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css'
})
export class PersonEditComponent {
  public person: Person;

  constructor(private personService: PersonService,
              private adresseService: AdresseService,
              private personAdresseService: PersonAdresseService,
              private dialogRef: MatDialogRef<PersonEditComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.person = data.person;
  }

  public save(): void {
    this.personService.update(this.person).pipe(
      concatMap(() => {
        return this.adresseService.update(this.person.adresse);
      })
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
