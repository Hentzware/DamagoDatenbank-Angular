import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RolleService} from "../../../core/services/rolle.service";

@Component({
  selector: 'app-rollen-delete',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './rollen-delete.component.html',
  styleUrl: './rollen-delete.component.css'
})
export class RollenDeleteComponent {
  public name: string;

  constructor(private dialogRef: MatDialogRef<RollenDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rolleService: RolleService) {
    this.name = data.rolle.name;
  }

  public deleteRoll(): void {
    this.rolleService.delete(this.data.rolle.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
