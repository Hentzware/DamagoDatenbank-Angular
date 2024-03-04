import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Module} from "../../../core/entities/Module";
import {ModuleService} from "../../../core/services/module.service";

@Component({
  selector: 'app-module-delete',
  standalone: true,
  imports: [FlexModule, MatButton, MatLabel],
  templateUrl: './module-delete.component.html',
  styleUrl: './module-delete.component.css'
})
export class ModuleDeleteComponent {
  public module: Module = {id: "", name: "", description: ""}

  constructor(private dialogRef: MatDialogRef<ModuleDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private moduleService: ModuleService) {
    this.module = data.module;
  }

  public save(): void {
    this.moduleService.delete(this.data.module.id).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
