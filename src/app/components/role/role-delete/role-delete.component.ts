import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoleService} from "../../../core/services/role.service";

@Component({
  selector: 'app-role-delete',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './role-delete.component.html',
  styleUrl: './role-delete.component.css'
})
export class RoleDeleteComponent {
  public name: string;

  constructor(private dialogRef: MatDialogRef<RoleDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rolleService: RoleService) {
    this.name = data.rolle.name;
  }

  public deleteRoll(): void {
    this.rolleService.delete(this.data.rolle.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
