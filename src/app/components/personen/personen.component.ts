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
import {concatMap, tap} from "rxjs";
import {PersonEditComponent} from "./person-edit/person-edit.component";
import {PersonDeleteComponent} from "./person-delete/person-delete.component";
import {AutoComplete} from "../../core/entities/AutoComplete";
import {PersonRole} from "../../core/entities/PersonRole";
import {PersonRoleService} from "../../core/services/person-role.service";
import {PersonSchoolClass} from "../../core/entities/PersonSchoolClass";
import {PersonSchoolClassService} from "../../core/services/person-school-class.service";
import {RoleService} from "../../core/services/role.service";
import {LocationService} from "../../core/services/location.service";
import {LocationPersonService} from "../../core/services/location-person.service";
import {SchoolClassService} from "../../core/services/school-class.service";
import {AddressService} from "../../core/services/address.service";
import {PersonAddressService} from "../../core/services/person-address.service";
import {Address} from "../../core/entities/Address";
import {Role} from "../../core/entities/Role";
import {SchoolClass} from "../../core/entities/SchoolClass";
import {LocationPerson} from "../../core/entities/LocationPerson";
import {PersonAddress} from "../../core/entities/PersonAddress";
import {Location} from "../../core/entities/Location";

@Component({
  selector: 'app-personen',
  standalone: true,
  imports: [MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef, MatTableModule, DatePipe, NgClass, MatFormFieldModule, MatSelectModule, MatOptionModule, FormsModule, FlexLayoutModule, CommonModule, MatInput, MatButton, MatToolbar, MatToolbarModule, MatDialogModule],
  templateUrl: './personen.component.html',
  styleUrl: './personen.component.css'
})
export class PersonenComponent implements OnInit {
  public autoComplete: AutoComplete = {
    locations: [], countries: [], streets: [], firstNames: [], houseNumbers: [], postalCodes: [], birthdays: [], lastNames: []
  };
  public displayedColumns: string[] = ["nachname", "vorname", "geburtsdatum", "strasse", "hausnummer", "postleitzahl", "ort", "land"];
  public persons: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  public selectedRowIndex: string = "-1";

  constructor(private roleService: RoleService, private locationService: LocationService, private locationPersonService: LocationPersonService, private personService: PersonService, private schoolClassService: SchoolClassService, private personSchoolClassService: PersonSchoolClassService, private addressService: AddressService, private personRoleService: PersonRoleService, private personAddressService: PersonAddressService, private dialog: MatDialog) {
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public ngOnInit(): void {
    this.getPersons();
  }

  public openDeleteDialog() {
    const dialogRef: MatDialogRef<PersonDeleteComponent> = this.dialog.open(PersonDeleteComponent, {
      width: "500px", data: {
        person: this.getSelectedPerson()
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPersons();
    });
  }

  public openEditDialog() {
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

    dialogRef.afterClosed().subscribe(result => {
      this.getPersons();
    });
  }

  private getPersons(): void {
    this.selectedRowIndex = "-1";
    let addresses: Address[];
    let roles: Role[];
    let locations: Location[];
    let schoolClasses: SchoolClass[];
    let locationPersons: LocationPerson[];
    let personAddresses: PersonAddress[];
    let personRoles: PersonRole[];
    let personSchoolClasses: PersonSchoolClass[];

    this.personService.get().pipe(tap((personResults: Person[]) => {
      this.persons = new MatTableDataSource<Person>(personResults);
    }), concatMap(() => {
      return this.addressService.get().pipe(tap((addressResults: Address[]) => {
        addresses = addressResults;
      }),);
    }), concatMap(() => {
      return this.personAddressService.get().pipe(tap((personAddressResults: PersonAddress[]) => {
        personAddresses = personAddressResults;
      }),);
    }), concatMap(() => {
      return this.roleService.get().pipe(tap((roleResults: Role[]) => {
        roles = roleResults;
      }),);
    }), concatMap(() => {
      return this.personRoleService.get().pipe(tap((personRoleResults: PersonRole[]) => {
        personRoles = personRoleResults;
      }),);
    }), concatMap(() => {
      return this.locationService.get().pipe(tap((locationResults: Location[]) => {
        locations = locationResults;
      }),);
    }), concatMap(() => {
      return this.locationPersonService.get().pipe(tap((locationPersonResults: LocationPerson[]) => {
        locationPersons = locationPersonResults;
      }),);
    }), concatMap(() => {
      return this.schoolClassService.get().pipe(tap((schoolClassResults: SchoolClass[]) => {
        schoolClasses = schoolClassResults;
      }),);
    }), concatMap(() => {
      return this.personSchoolClassService.get().pipe(tap((personSchoolClassResults: PersonSchoolClass[]) => {
        personSchoolClasses = personSchoolClassResults;
      }),);
    })).subscribe(() => {
      this.persons.data.map((person: Person) => {
        const personAddressLink: PersonAddress | undefined = personAddresses.find((link: PersonAddress): boolean => link.person_id == person.id);
        const personRoleLink: PersonRole | undefined = personRoles.find((link: PersonRole): boolean => link.person_id == person.id);
        const locationPersonLink: LocationPerson | undefined = locationPersons.find((link: LocationPerson): boolean => link.person_id == person.id);
        const personKlasseLink: PersonSchoolClass | undefined = personSchoolClasses.find((link: PersonSchoolClass): boolean => link.person_id == person.id);

        if (personAddressLink) {
          person.address = <Address>addresses.find((address: Address): boolean => address.id == personAddressLink.address_id);
        }
        if (personRoleLink) {
          person.role = <Role>roles.find((role: Role): boolean => role.id == personRoleLink.role_id);
        }
        if (locationPersonLink) {
          person.location = <Location>locations.find((location: Location): boolean => location.id === locationPersonLink.location_id);
        }
        if (personKlasseLink) {
          person.school_class = <SchoolClass>schoolClasses.find((schoolClass: SchoolClass): boolean => schoolClass.id === personKlasseLink.school_class_id);
        }

        return person;
      });

      this.initializePersonAutoCompleteData();
    });
  }

  private getSelectedPerson(): any {
    return {...this.persons.data.find((x: Person): boolean => x.id == this.selectedRowIndex)};
  }

  private initializePersonAutoCompleteData(): void {
    this.autoComplete.lastNames = Array.from(new Set(this.persons.data.map<string>((x: Person) => {
      return x?.last_name;
    })));

    this.autoComplete.firstNames = Array.from(new Set(this.persons.data.map<string>((x: Person) => {
      return x?.first_name;
    })));

    this.autoComplete.birthdays = Array.from(new Set(this.persons.data.map<string>((x: Person) => {
      return x?.birthdate;
    })));

    this.autoComplete.streets = Array.from(new Set(this.persons.data.map<string>((x: Person) => {
      return x.address?.street;
    })));

    this.autoComplete.houseNumbers = Array.from(new Set(this.persons.data.map<string>((x: Person) => {
      return x.address?.house_number;
    })));

    this.autoComplete.postalCodes = Array.from(new Set(this.persons.data.map<string>((x: Person) => {
      return x.address?.postal_code;
    })));

    this.autoComplete.locations = Array.from(new Set(this.persons.data.map<string>((x: Person) => {
      return x.address?.location;
    })));

    this.autoComplete.countries = Array.from(new Set(this.persons.data.map<string>((x: Person) => {
      return x.address?.country;
    })));
  }
}
