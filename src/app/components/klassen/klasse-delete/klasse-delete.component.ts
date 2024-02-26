import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SchoolClassService} from "../../../core/services/school-class.service";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-klasse-delete',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    MatLabel
  ],
  templateUrl: './klasse-delete.component.html',
  styleUrl: './klasse-delete.component.css'
})
export class KlasseDeleteComponent {
  public name: string;

  constructor(private dialogRef: MatDialogRef<KlasseDeleteComponent>,
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
