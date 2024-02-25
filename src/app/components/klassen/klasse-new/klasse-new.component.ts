import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {KlasseService} from "../../../core/services/klasse.service";

@Component({
  selector: 'app-klasse-new',
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
  templateUrl: './klasse-new.component.html',
  styleUrl: './klasse-new.component.css'
})
export class KlasseNewComponent {
  public name: string = "";

  constructor(private klasseService: KlasseService,
              private dialogRef: MatDialogRef<KlasseNewComponent>) {
  }

  public save(): void {
    this.klasseService.add(this.name).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
