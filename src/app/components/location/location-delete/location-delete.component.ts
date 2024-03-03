import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {LocationService} from "../../../core/services/location.service";

@Component({
  selector: 'app-location-delete',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './location-delete.component.html',
  styleUrl: './location-delete.component.css'
})
export class LocationDeleteComponent {
  public name: string;

  constructor(private dialogRef: MatDialogRef<LocationDeleteComponent>,
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
