import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {RolleService} from "../../../core/services/rolle.service";

@Component({
  selector: 'app-rollen-new',
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
  templateUrl: './rollen-new.component.html',
  styleUrl: './rollen-new.component.css'
})
export class RollenNewComponent {
  public name: string = "";

  constructor(private rolleService: RolleService,
              private dialogRef: MatDialogRef<RollenNewComponent>) {
  }

  public createNewRoll(): void {
    this.rolleService.add(this.name).subscribe(() => {
      this.dialogRef.close();
    });
  }

}

