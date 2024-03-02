import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Room} from "../../../core/entities/Room";
import {RoomService} from "../../../core/services/room.service";

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
  public raum: Room = {id:"",name:"",nr:""}

  constructor(private raumService: RoomService,
              private dialogRef: MatDialogRef<RaeumeNewComponent>) {
  }

  public createNewRoom(): void {
    this.raumService.add(this.raum).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
