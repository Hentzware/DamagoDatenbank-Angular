import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SchoolClassService} from "../../../core/services/school-class.service";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-school-class-delete',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    MatLabel
  ],
  templateUrl: './school-class-delete.component.html',
  styleUrl: './school-class-delete.component.css'
})
export class SchoolClassDeleteComponent {
  public name: string;

  constructor(private dialogRef: MatDialogRef<SchoolClassDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private klasseService: SchoolClassService) {
    this.name = data.klasse.name;
  }

  public deleteClass(): void {
    this.klasseService.delete(this.data.klasse.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
