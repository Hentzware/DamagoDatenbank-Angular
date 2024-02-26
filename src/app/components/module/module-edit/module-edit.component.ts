import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KlasseService} from "../../../core/services/klasse.service";
import {Modul} from "../../../core/entities/Modul";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModulService} from "../../../core/services/modul.service";

@Component({
  selector: 'app-module-edit',
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
  templateUrl: './module-edit.component.html',
  styleUrl: './module-edit.component.css'
})
export class ModuleEditComponent {
  public modul: Modul = {id:"",name:"",beschreibung:""}

  constructor(private dialogRef: MatDialogRef<ModuleEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private modulService: ModulService) {
    this.modul = data.modul;
  }

  public editModule(): void {
    this.modulService.update(this.data.modul).subscribe(() => {
      this.dialogRef.close();
    });
  }




}
