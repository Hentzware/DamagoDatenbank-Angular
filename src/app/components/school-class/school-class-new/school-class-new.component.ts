import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {SchoolClassService} from "../../../core/services/school-class.service";

@Component({
  selector: 'app-school-class-new',
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
  templateUrl: './school-class-new.component.html',
  styleUrl: './school-class-new.component.css'
})
export class SchoolClassNewComponent {
  public name: string = "";

  constructor(private klasseService: SchoolClassService,
              private dialogRef: MatDialogRef<SchoolClassNewComponent>) {
  }

  public save(): void {
    this.klasseService.add(this.name).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
