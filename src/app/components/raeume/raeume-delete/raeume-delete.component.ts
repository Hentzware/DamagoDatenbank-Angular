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
  imports: [FlexModule, FormsModule, MatButton, MatFormField, MatInput, MatLabel],
  templateUrl: './raeume-delete.component.html',
  styleUrl: './raeume-delete.component.css'
})
export class RaeumeDeleteComponent {

  public room: Room = {id: "", name: "", nr: ""}

  constructor(private dialogRef: MatDialogRef<RaeumeDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private roomService: RoomService) {
    this.room = data.room;
  }

  public save(): void {
    this.roomService.delete(this.room.id).subscribe(() => {
      this.dialogRef.close();
    })
  }
}

