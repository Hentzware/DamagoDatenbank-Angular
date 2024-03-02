import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Room} from "../../../core/entities/Room";
import {RoomService} from "../../../core/services/room.service";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-raeume-delete',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './raeume-delete.component.html',
  styleUrl: './raeume-delete.component.css'
})
export class RaeumeDeleteComponent {

  public raum: Room = {id:"",name:"",nr:""}

  constructor(private dialogRef: MatDialogRef<RaeumeDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private raumService: RoomService) {
    this.raum = data.raum;

  }

  public deleteRoom(): void {
    this.raumService.delete(this.data.raum.id).subscribe(() => {
      this.dialogRef.close();
    })
  }
}

