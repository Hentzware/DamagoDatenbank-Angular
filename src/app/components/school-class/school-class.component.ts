import {Component, OnInit, ViewChild} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {SchoolClass} from "../../core/entities/SchoolClass";
import {SchoolClassService} from "../../core/services/school-class.service";
import {SchoolClassNewComponent} from "./school-class-new/school-class-new.component";
import {NgClass} from "@angular/common";
import {SchoolClassEditComponent} from "./school-class-edit/school-class-edit.component";
import {SchoolClassDeleteComponent} from "./school-class-delete/school-class-delete.component";

@Component({
  selector: 'app-klassen',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatToolbarModule,
    MatButton,
    MatTableModule,
    MatDialogModule,
    NgClass,
    MatSortHeader,
    MatSort,
    MatSortModule
  ],
  templateUrl: './school-class.component.html',
  styleUrl: './school-class.component.css'
})
export class SchoolClassComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort | any;
public klassen: MatTableDataSource<SchoolClass> = new MatTableDataSource<SchoolClass>();
public selectedRowIndex: string = "-1";
public displayedColumns: string[] = ["id", "name"];

  constructor(private klasseService: SchoolClassService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer) {
  }

public ngOnInit(): void {
    this.getClasses();
  }

public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

public getClasses(): void {
    this.klasseService.get().subscribe(result => {
      this.klassen = new MatTableDataSource(result);
      this.klassen.sort = this.sort;
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.klassen.sort = this.sort;
    });
  }

public openNewClassDialog(): void {
    const dialogRef: MatDialogRef<SchoolClassNewComponent> = this.dialog.open(SchoolClassNewComponent, {
    width: "500px"
  });

  dialogRef.afterClosed().subscribe(() => {
    this.getClasses();
  });
}

public openEditClassDialog(): void {
    const dialogRef: MatDialogRef<SchoolClassEditComponent> = this.dialog.open(SchoolClassEditComponent, {
    width: "500px",
    data: { klasse: this.getSelectedClass() }
  });

  dialogRef.afterClosed().subscribe(() => {
    this.getClasses();
  });
}

public openDeleteClassDialog(): void {
    const dialogRef: MatDialogRef<SchoolClassDeleteComponent> = this.dialog.open(SchoolClassDeleteComponent, {
    width: "500px",
    data: { klasse: this.getSelectedClass() }
  });

  dialogRef.afterClosed().subscribe(() => {
    this.getClasses();
  });
}

private getSelectedClass(): any {
    return {...this.klassen.data.find(x => x.id == this.selectedRowIndex)};
  }
}
