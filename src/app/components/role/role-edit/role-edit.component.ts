import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoleService} from "../../../core/services/role.service";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-role-edit',
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
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css'
})
export class RoleEditComponent {

  public name: string;

  constructor(private dialogRef: MatDialogRef<RoleEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rolleService: RoleService) {
    this.name = data.rolle.name;
  }

  public editRoll(): void {
    this.rolleService.update(this.data.rolle).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
