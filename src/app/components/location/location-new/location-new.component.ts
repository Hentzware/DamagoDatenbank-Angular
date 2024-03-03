import { Component } from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {LocationService} from "../../../core/services/location.service";
import {FormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-location-new',
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
  templateUrl: './location-new.component.html',
  styleUrl: './location-new.component.css'
})
export class LocationNewComponent {
  public name: string = "";

  constructor(private standortService: LocationService,
              private dialogRef: MatDialogRef<LocationNewComponent>) {
  }

  public createNewLocation(): void {
    this.standortService.add(this.name).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
