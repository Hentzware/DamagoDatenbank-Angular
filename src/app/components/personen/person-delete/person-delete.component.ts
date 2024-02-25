import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PersonService} from "../../../core/services/person.service";
import {concatMap} from "rxjs";
import {AddressService} from "../../../core/services/address.service";

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
  public last_name: string;
  public first_name: string;

  constructor(private dialogRef: MatDialogRef<PersonDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private personService: PersonService,
              private addressService: AddressService) {
    this.last_name = data.person.last_name;
    this.first_name = data.person.first_name;
  }

  public deletePerson(): void {
    this.personService.delete(this.data.person.id).pipe(
      concatMap(() => {
          return this.addressService.delete(this.data.person.address.id);
        }
      )
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
