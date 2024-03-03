import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocationService} from "../../../core/services/location.service";

@Component({
  selector: 'app-location-edit',
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
  templateUrl: './location-edit.component.html',
  styleUrl: './location-edit.component.css'
})
export class LocationEditComponent {
  public name: string;

  constructor(private dialogRef: MatDialogRef<LocationEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private standortService: LocationService) {
    this.name = data.standort.name;
  }

  public editLocation(): void {
    this.standortService.update(this.data.standort).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
