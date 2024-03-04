import {Component, OnInit} from '@angular/core';
import {Person} from "../../core/entities/Person";
import {PersonService} from "../../core/services/person.service";
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {CommonModule, DatePipe, NgClass} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {PersonNewComponent} from "./person-new/person-new.component";
import {forkJoin} from "rxjs";
import {PersonEditComponent} from "./person-edit/person-edit.component";
import {PersonDeleteComponent} from "./person-delete/person-delete.component";
import {AutoComplete} from "../../core/entities/AutoComplete";
import {PersonRoleService} from "../../core/services/person-role.service";
import {PersonSchoolClassService} from "../../core/services/person-school-class.service";
import {RoleService} from "../../core/services/role.service";
import {LocationService} from "../../core/services/location.service";
import {LocationPersonService} from "../../core/services/location-person.service";
import {SchoolClassService} from "../../core/services/school-class.service";
import {AddressService} from "../../core/services/address.service";
import {PersonAddressService} from "../../core/services/person-address.service";
import {LinkService} from "../../core/services/link.service";

@Component({
  selector: 'app-personen',
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef, MatTableModule, DatePipe, NgClass, MatFormFieldModule, MatSelectModule, MatOptionModule, FormsModule, FlexLayoutModule, CommonModule, MatInput, MatButton, MatToolbar, MatToolbarModule, MatDialogModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements OnInit {
  public autoComplete: AutoComplete = {locations: [], countries: [], streets: [], firstNames: [], houseNumbers: [], postalCodes: [], birthdays: [], lastNames: []};
  public displayedColumns: string[] = ["nachname", "vorname", "geburtsdatum", "strasse", "hausnummer", "postleitzahl", "ort", "land"];
  public persons: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  public selectedRowIndex: string = "-1";

  constructor(private linkService: LinkService, private roleService: RoleService, private locationService: LocationService, private locationPersonService: LocationPersonService, private personService: PersonService, private schoolClassService: SchoolClassService, private personSchoolClassService: PersonSchoolClassService, private addressService: AddressService, private personRoleService: PersonRoleService, private personAddressService: PersonAddressService, private dialog: MatDialog) {
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public ngOnInit(): void {
    this.getPersons();
  }

  public openDeleteDialog(): void {
    const dialogRef: MatDialogRef<PersonDeleteComponent> = this.dialog.open(PersonDeleteComponent, {
      width: "500px", data: {
        person: this.getSelectedPerson()
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPersons();
    });
  }

  public openEditDialog(): void {
    const dialogRef: MatDialogRef<PersonEditComponent> = this.dialog.open(PersonEditComponent, {
      width: "500px", data: {
        person: this.getSelectedPerson(), autoComplete: this.autoComplete
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPersons();
    });
  }

  public openNewDialog(): void {
    const dialogRef: MatDialogRef<PersonNewComponent> = this.dialog.open(PersonNewComponent, {
      width: "1000px", data: {
        autoComplete: this.autoComplete
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPersons();
    });
  }

  private getPersons(): void {
    this.selectedRowIndex = "-1";

    forkJoin({
      persons: this.personService.get(),
      addresses: this.addressService.get(),
      personAddress: this.personAddressService.get(),
      roles: this.roleService.get(),
      personRole: this.personRoleService.get(),
      schoolClasses: this.schoolClassService.get(),
      personSchoolClass: this.personSchoolClassService.get(),
      locations: this.locationService.get(),
      locationPerson: this.locationPersonService.get()
    }).subscribe(({persons, addresses, personAddress, roles, personRole, schoolClasses, personSchoolClass, locations, locationPerson}) => {
      this.linkService.linkPersonAddress(persons, addresses, personAddress);
      this.linkService.linkPersonLocation(persons, locations, locationPerson);
      this.linkService.linkPersonRole(persons, roles, personRole);
      this.linkService.linkPersonSchoolClass(persons, schoolClasses, personSchoolClass);
      this.persons = new MatTableDataSource<Person>(persons);
      this.initializeAutoCompleteData();
    });
  }

  private getSelectedPerson(): any {
    return {...this.persons.data.find((x: Person): boolean => x.id == this.selectedRowIndex)};
  }

  private initializeAutoCompleteData(): void {
    this.autoComplete.lastNames = Array.from(new Set(this.persons.data.map<string>((x: Person) => x?.last_name)));
    this.autoComplete.firstNames = Array.from(new Set(this.persons.data.map<string>((x: Person) => x?.first_name)));
    this.autoComplete.birthdays = Array.from(new Set(this.persons.data.map<string>((x: Person) => x?.birthdate)));
    this.autoComplete.streets = Array.from(new Set(this.persons.data.map<string>((x: Person) => x.address?.street)));
    this.autoComplete.houseNumbers = Array.from(new Set(this.persons.data.map<string>((x: Person) => x.address?.house_number)));
    this.autoComplete.postalCodes = Array.from(new Set(this.persons.data.map<string>((x: Person) => x.address?.postal_code)));
    this.autoComplete.locations = Array.from(new Set(this.persons.data.map<string>((x: Person) => x.address?.location)));
    this.autoComplete.countries = Array.from(new Set(this.persons.data.map<string>((x: Person) => x.address?.country)));
  }
}