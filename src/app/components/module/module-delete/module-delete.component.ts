import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {deleteOutputDir} from "@angular-devkit/build-angular/src/utils";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KlasseService} from "../../../core/services/klasse.service";
import {Modul} from "../../../core/entities/Modul";
import {KlasseDeleteComponent} from "../../klassen/klasse-delete/klasse-delete.component";
import {ModulService} from "../../../core/services/modul.service";

@Component({
  selector: 'app-module-delete',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    MatLabel
  ],
  templateUrl: './module-delete.component.html',
  styleUrl: './module-delete.component.css'
})
export class ModuleDeleteComponent {
  public modul: Modul = {id:"",name:"",beschreibung:""}

  constructor(private dialogRef: MatDialogRef<ModuleDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private modulService: ModulService) {
    this.modul = data.modul;
  }

  public deleteModule(): void {
    this.modulService.delete(this.data.modul.id).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
