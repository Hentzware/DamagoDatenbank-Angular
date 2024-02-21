import { Component } from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {StandortService} from "../../../core/services/standort.service";
import {Standort} from "../../../core/entities/Standort";
import {FormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-standort-new',
  standalone: true,
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatIcon,
    MatInput,
    FlexLayoutModule,
    MatButton,
    FormsModule
  ],
  templateUrl: './standort-new.component.html',
  styleUrl: './standort-new.component.css'
})
export class StandortNewComponent {
  public name: string = "";

  constructor(private standortService: StandortService,
              private dialogRef: MatDialogRef<StandortNewComponent>) {
  }

  public createNewLocation(): void {
    this.standortService.addLocation(this.name).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
