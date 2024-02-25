import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Address} from "../../../core/entities/Address";
import {AddressService} from "../../../core/services/address.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-adresse-new',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './address-new.component.html',
  styleUrl: './address-new.component.css'
})
export class AddressNewComponent {
  public address: Address = {id:"",street:"",house_number:"",postal_code:"",location:"",country:""}

  constructor(private addressService: AddressService,
              private dialogRef: MatDialogRef<AddressNewComponent>){

  }
  public save(): void {
    this.addressService.add(this.address).subscribe(() =>{
      this.dialogRef.close();
    })
  }

}
