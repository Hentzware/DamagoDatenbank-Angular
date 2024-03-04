import {Component} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ModuleService} from "../../../core/services/module.service";
import {Module} from "../../../core/entities/Module";

@Component({
  selector: 'app-module-new',
  standalone: true,
  imports: [FlexModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule, FormsModule],
  templateUrl: './module-new.component.html',
  styleUrl: './module-new.component.css'
})
export class ModuleNewComponent {
  public module: Module = {id: "", name: "", description: ""}

  constructor(private moduleService: ModuleService, private dialogRef: MatDialogRef<ModuleNewComponent>) {
  }

  public save(): void {
    this.moduleService.add(this.module.name, this.module.description).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
