import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Module} from "../../../core/entities/Module";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModuleService} from "../../../core/services/module.service";

@Component({
  selector: 'app-module-edit',
  standalone: true,
  imports: [FlexModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule, FormsModule],
  templateUrl: './module-edit.component.html',
  styleUrl: './module-edit.component.css'
})
export class ModuleEditComponent {
  public module: Module = {id: "", name: "", description: ""}

  constructor(private dialogRef: MatDialogRef<ModuleEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private moduleService: ModuleService) {
    this.module = data.module;
  }

  public save(): void {
    this.moduleService.update(this.module).subscribe(() => {
      this.dialogRef.close();
    });
  }


}
