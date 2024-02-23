import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Inventar} from "../../../core/entities/Inventar";
import {InventarService} from "../../../core/services/inventar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Raum} from "../../../core/entities/Raum";
import {RaumService} from "../../../core/services/raum.service";

@Component({
  selector: 'app-raeume-new',
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
  templateUrl: './raeume-new.component.html',
  styleUrl: './raeume-new.component.css'
})
export class RaeumeNewComponent {
  public raum: Raum = {id:"",name:"",nr:""}

  constructor(private raumService: RaumService,
              private dialogRef: MatDialogRef<RaeumeNewComponent>) {
  }

  public createNewRoom(): void {
    this.raumService.add(this.raum).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
