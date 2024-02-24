import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RolleService} from "../../../core/services/rolle.service";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-rollen-edit',
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
  templateUrl: './rollen-edit.component.html',
  styleUrl: './rollen-edit.component.css'
})
export class RollenEditComponent {

  public name: string;

  constructor(private dialogRef: MatDialogRef<RollenEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rolleService: RolleService) {
    this.name = data.rolle.name;
  }

  public editRoll(): void {
    this.rolleService.update(this.data.rolle).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
