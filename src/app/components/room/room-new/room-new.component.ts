import {Component} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Room} from "../../../core/entities/Room";
import {RoomService} from "../../../core/services/room.service";

@Component({
  selector: 'app-room-new',
  standalone: true,
  imports: [FlexModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule, FormsModule],
  templateUrl: './room-new.component.html',
  styleUrl: './room-new.component.css'
})
export class RoomNewComponent {
  public room: Room = {id: "", name: "", nr: ""}

  constructor(private roomService: RoomService, private dialogRef: MatDialogRef<RoomNewComponent>) {
  }

  public save(): void {
    this.roomService.add(this.room).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
