import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {LocationService} from "../../../core/services/location.service";

@Component({
  selector: 'app-standort-delete',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './standort-delete.component.html',
  styleUrl: './standort-delete.component.css'
})
export class StandortDeleteComponent {
  public name: string;

  constructor(private dialogRef: MatDialogRef<StandortDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private standortService: LocationService) {
    this.name = data.standort.name;
  }

  public deleteLocation(): void {
    this.standortService.delete(this.data.standort.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
