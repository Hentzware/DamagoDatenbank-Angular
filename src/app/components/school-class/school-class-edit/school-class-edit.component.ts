import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SchoolClassService} from "../../../core/services/school-class.service";

@Component({
  selector: 'app-school-class-edit',
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
  templateUrl: './school-class-edit.component.html',
  styleUrl: './school-class-edit.component.css'
})
export class SchoolClassEditComponent {
  public name: string;

  constructor(private dialogRef: MatDialogRef<SchoolClassEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private klasseService: SchoolClassService) {
    this.name = data.klasse.name;
  }

  public editClass(): void {
    this.klasseService.update(this.data.klasse).subscribe(() => {
      this.dialogRef.close();
    });
  }
}


