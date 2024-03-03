import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {RoleService} from "../../../core/services/role.service";

@Component({
  selector: 'app-role-new',
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
  templateUrl: './role-new.component.html',
  styleUrl: './role-new.component.css'
})
export class RoleNewComponent {
  public name: string = "";

  constructor(private roleService: RoleService,
              private dialogRef: MatDialogRef<RoleNewComponent>) {
  }

  public save(): void {
    this.roleService.add(this.name).subscribe(() => {
      this.dialogRef.close();
    });
  }

}

