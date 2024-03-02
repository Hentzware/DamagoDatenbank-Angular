import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Room} from "../../../core/entities/Room";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomService} from "../../../core/services/room.service";


@Component({
  selector: 'app-raeume-edit',
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
  templateUrl: './raeume-edit.component.html',
  styleUrl: './raeume-edit.component.css'
})
export class RaeumeEditComponent {
  public raum: Room = {id:"",name:"",nr:""}

  constructor(private dialogRef: MatDialogRef<RaeumeEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private raumService: RoomService) {
    this.raum = data.raum;
  }

  public editRoom(): void {

    this.raumService.update(this.data.raum).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
