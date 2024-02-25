import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Address} from "../../../core/entities/Address";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddressService} from "../../../core/services/address.service";

@Component({
  selector: 'app-address-edit',
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
  templateUrl: './address-edit.component.html',
  styleUrl: './address-edit.component.css'
})
export class AddressEditComponent {
  public address: Address = {id:"",street:"",house_number:"",postal_code:"",location:"",country:""}

  constructor(private dialogRef: MatDialogRef<AddressEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private adresseService: AddressService) {
    this.address = data.adresse;
  }

  public editAdress(): void {

    this.adresseService.update(this.data.adresse).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
