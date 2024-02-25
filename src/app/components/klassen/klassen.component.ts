import {Component, OnInit, ViewChild} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Class} from "../../core/entities/Class";
import {ClassService} from "../../core/services/class.service";
import {KlasseNewComponent} from "./klasse-new/klasse-new.component";
import {NgClass} from "@angular/common";
import {KlasseEditComponent} from "./klasse-edit/klasse-edit.component";
import {KlasseDeleteComponent} from "./klasse-delete/klasse-delete.component";

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
  templateUrl: './klassen.component.html',
  styleUrl: './klassen.component.css'
})
export class KlassenComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort | any;
public klassen: MatTableDataSource<Class> = new MatTableDataSource<Class>();
public selectedRowIndex: string = "-1";
public displayedColumns: string[] = ["id", "name"];

  constructor(private klasseService: ClassService,
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
    const dialogRef: MatDialogRef<KlasseNewComponent> = this.dialog.open(KlasseNewComponent, {
    width: "500px"
  });

  dialogRef.afterClosed().subscribe(() => {
    this.getClasses();
  });
}

public openEditClassDialog(): void {
    const dialogRef: MatDialogRef<KlasseEditComponent> = this.dialog.open(KlasseEditComponent, {
    width: "500px",
    data: { klasse: this.getSelectedClass() }
  });

  dialogRef.afterClosed().subscribe(() => {
    this.getClasses();
  });
}

public openDeleteClassDialog(): void {
    const dialogRef: MatDialogRef<KlasseDeleteComponent> = this.dialog.open(KlasseDeleteComponent, {
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
