import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Person} from "../../../core/entities/Person";
import {PersonService} from "../../../core/services/person.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {concatMap} from "rxjs";
import {AutoCompleteComponent} from "../../auto-complete/auto-complete.component";
import {AddressService} from "../../../core/services/address.service";

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [FlexModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule, FormsModule, AutoCompleteComponent],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css'
})
export class PersonEditComponent {
  public person: Person = {
    id: "",
    address: {country: "", location: "", street: "", house_number: "", postal_code: "", id: ""},
    role: {name: "", id: ""},
    location: {name: "", id: ""},
    school_class: {name: "", id: ""},
    first_name: "",
    last_name: "",
    birthdate: "",
    phone: {phone: "", id: ""},
    email: {id: "", email: ""}
  };

  constructor(private personService: PersonService,
              private adresseService: AddressService,
              private dialogRef: MatDialogRef<PersonEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.person) {
      if (data.person.adresse) {
        this.person = data.person;
      } else {
        this.person = {...data.person, address: this.person.address};
      }
    }
  }

  public onBirthdateSelected($event: string): void {
    this.person.birthdate = $event;
  }

  public onCountrySelected($event: string): void {
    this.person.address.country = $event;
  }

  public onFirstNameSelected($event: string): void {
    this.person.first_name = $event;
  }

  public onHouseNumberSelected($event: string): void {
    this.person.address.house_number = $event;
  }

  public onLastNameSelected($event: string): void {
    this.person.last_name = $event;
  }

  public onLocationSelected($event: string): void {
    this.person.address.location = $event;
  }

  public onPostalCodeSelected($event: string): void {
    this.person.address.postal_code = $event;
  }

  public onStreetSelected($event: string): void {
    this.person.address.street = $event;
  }

  public save(): void {
    this.personService.update(this.person).pipe(concatMap(() => {
      return this.adresseService.update(this.person.address);
    })).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
