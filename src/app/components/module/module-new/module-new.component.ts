import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ModulService} from "../../../core/services/modul.service";

@Component({
  selector: 'app-module-new',
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
  templateUrl: './module-new.component.html',
  styleUrl: './module-new.component.css'
})
export class ModuleNewComponent {
  public name: string = "";

  constructor(private modulService: ModulService,
              private dialogRef: MatDialogRef<ModuleNewComponent>) {
  }

  public createNewModule(): void {
    this.modulService.add(this.name).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
