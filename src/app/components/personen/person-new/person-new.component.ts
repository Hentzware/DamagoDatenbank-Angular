import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Person} from "../../../core/entities/Person";
import {PersonService} from "../../../core/services/person.service";
import {AdresseService} from "../../../core/services/adresse.service";
import {PersonAdresseService} from "../../../core/services/person.adresse.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {MatDatepickerInput} from "@angular/material/datepicker";
import {AddPersonRequest} from "../../../core/requests/person/add-person-request";
import {Adresse} from "../../../core/entities/Adresse";
import {concatMap, map, Observable, startWith} from "rxjs";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";

@Component({
  selector: 'app-person-new',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    DatePipe,
    MatDatepickerInput,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    NgForOf
  ],
  templateUrl: './person-new.component.html',
  styleUrl: './person-new.component.css'
})
export class PersonNewComponent {
  public person: Person;
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(private personService: PersonService,
              private adresseService: AdresseService,
              private personAdresseService: PersonAdresseService,
              private dialogRef: MatDialogRef<PersonNewComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.person = {
      id: "",
      geburtsdatum: "2000-01-01",
      vorname: "",
      nachname: "",
      adresse: {
        land: "",
        ort: "",
        postleitzahl: "",
        id: "",
        strasse: "",
        hausnummer: ""
      }
    };
    this.options = data.nachnamen;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // Fügen Sie eine aBedingung hinzu, um nur dann zu filtern, wenn der Wert mindestens ein Zeichen lang ist
    if (filterValue.length > 0) {
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    } else {
      // Wenn der Wert leer ist, geben Sie ein leeres Array zurück, um keine Optionen anzuzeigen
      return [];
    }
  }

  public save(): void {
    this.personService.add(this.person).pipe(
      concatMap((person: any) => {
        return this.adresseService.add(this.person.adresse).pipe(
          concatMap((adresse: any) => {
            return this.personAdresseService.add({id: "", person_id: person.id, adresse_id: adresse.id});
          })
        );
      })
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
