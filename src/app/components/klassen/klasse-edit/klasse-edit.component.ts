import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClassService} from "../../../core/services/class.service";

@Component({
  selector: 'app-klasse-edit',
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
  templateUrl: './klasse-edit.component.html',
  styleUrl: './klasse-edit.component.css'
})
export class KlasseEditComponent {
  public name: string;

  constructor(private dialogRef: MatDialogRef<KlasseEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private klasseService: ClassService) {
    this.name = data.klasse.name;
  }

  public editClass(): void {
    this.klasseService.update(this.data.klasse).subscribe(() => {
      this.dialogRef.close();
    });
  }
}


