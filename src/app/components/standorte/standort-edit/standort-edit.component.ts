import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StandortService} from "../../../core/services/standort.service";

@Component({
  selector: 'app-standort-edit',
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
  templateUrl: './standort-edit.component.html',
  styleUrl: './standort-edit.component.css'
})
export class StandortEditComponent {
  constructor(private dialogRef: MatDialogRef<StandortEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private standortService: StandortService) {
  }

  public editLocation(): void {
    this.standortService.put(this.data.standort).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
