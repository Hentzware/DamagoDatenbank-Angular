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
import {MatDialogModule} from "@angular/material/dialog";
import {concatMap, tap} from "rxjs";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {PersonRoleService} from "../../core/services/person-role.service";
import {PersonRole} from "../../core/entities/PersonRole";
import {PersonSchoolClassService} from "../../core/services/person-school-class.service";
import {PersonSchoolClass} from "../../core/entities/PersonSchoolClass";
import {SchoolClass} from "../../core/entities/SchoolClass";
import {Role} from "../../core/entities/Role";
import {Location} from "../../core/entities/Location";
import {RoleService} from "../../core/services/role.service";
import {LocationService} from "../../core/services/location.service";
import {LocationPersonService} from "../../core/services/location-person.service";
import {SchoolClassService} from "../../core/services/school-class.service";
import {AddressService} from "../../core/services/address.service";
import {PersonAddressService} from "../../core/services/person-address.service";
import {Address} from "../../core/entities/Address";
import {LocationPerson} from "../../core/entities/LocationPerson";
import {PersonAddress} from "../../core/entities/PersonAddress";

@Component({
  imports: [MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef, MatTableModule, DatePipe, NgClass, MatFormFieldModule, MatSelectModule, MatOptionModule, FormsModule, FlexLayoutModule, CommonModule, MatInput, MatButton, MatToolbar, MatToolbarModule, MatDialogModule, MatTab, MatTabGroup],
  selector: 'app-personen',
  standalone: true,
  styleUrl: './search.component.css',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  data: any;
  public displayedColumns: string[] = ["nachname", "vorname", "geburtsdatum", "rolle", "standort", "klasse", "strasse", "hausnummer", "postleitzahl", "ort", "land"];
  public klassen!: SchoolClass[];
  public locations!: Location[];
  public person!: Person;
  public persons: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  public roles!: Role[];
  public schoolClasses!: SchoolClass[];
  public selectedLocation: string = "";
  public selectedRole: string = "";
  public selectedRowIndex: string = "-1";
  public selectedSchoolClass: string = "";

  constructor(private roleService: RoleService, private locationService: LocationService, private personStandortService: LocationPersonService, private personService: PersonService, private schoolClassService: SchoolClassService, private personKlasseService: PersonSchoolClassService, private adresseService: AddressService, private personRolleService: PersonRoleService, private personAdresseService: PersonAddressService) {

  }

  applyFilterFirstName(filterValue: string) {
    this.persons.filterPredicate = (data, filter) => data.first_name.trim().toLowerCase().includes(filter);
    this.persons.filter = filterValue.trim().toLowerCase();
  }

  applyFilterLastName(filterValue: string) {
    this.persons.filterPredicate = (data, filter) => data.last_name.trim().toLowerCase().includes(filter);
    this.persons.filter = filterValue.trim().toLowerCase();
  }

  applyFilterLocation(filterValue: string) {
    this.selectedLocation = filterValue;
    this.applyFilters();
  }

  applyFilterRole(filterValue: string) {
    this.selectedRole = filterValue;
    this.applyFilters();
  }

  applyFilterSchoolClass(filterValue: string) {
    this.selectedSchoolClass = filterValue;
    this.applyFilters();
  }

  applyFilters() {
    this.persons.filterPredicate = (data: any, filter: string) => {
      let filterObject = JSON.parse(filter);

      let roleMatch = filterObject.selectedRole ? data.role && data.role.name.trim().toLowerCase().includes(filterObject.selectedRole.trim().toLowerCase()) : true;

      let locationMatch = filterObject.selectedLocation ? data.location && data.location.name.trim().toLowerCase().includes(filterObject.selectedLocation.trim().toLowerCase()) : true;

      let classMatch = filterObject.selectedClass ? data.school_class && data.school_class.name.trim().toLowerCase().includes(filterObject.selectedClass.trim().toLowerCase()) : true;

      return roleMatch && locationMatch && classMatch;
    };

    this.persons.filter = JSON.stringify({
      selectedRole: this.selectedRole, selectedLocation: this.selectedLocation, selectedClass: this.selectedSchoolClass
    });
  }

  public highlightRow(row: any): void {
    this.selectedRowIndex = row.id;
  }

  public ngOnInit(): void {
    this.getPersons();
    this.initializeRoles();
    this.initializeLocations();
    this.initializeClasses();
  }

  private getPersons(): void {
    this.selectedRowIndex = "-1";
    let addresses: Address[];
    let roles: Role[];
    let locations: Location[];
    let schoolClasses: SchoolClass[];
    let locationPerson: LocationPerson[];
    let personAddress: PersonAddress[];
    let personRole: PersonRole[];
    let personSchoolClass: PersonSchoolClass[];

    this.personService.get().pipe(tap((personResults: Person[]) => {
      this.persons = new MatTableDataSource<Person>(personResults);
    }), concatMap(() => {
      return this.adresseService.get().pipe(tap((addressResults: Address[]) => {
        addresses = addressResults;
      }));
    }), concatMap(() => {
      return this.personAdresseService.get().pipe(tap((personAddressResults: PersonAddress[]) => {
        personAddress = personAddressResults;
      }));
    }), concatMap(() => {
      return this.roleService.get().pipe(tap((roleResults: Role[]) => {
        roles = roleResults;
      }));
    }), concatMap(() => {
      return this.personRolleService.get().pipe(tap((personRoleResults: PersonRole[]) => {
        personRole = personRoleResults;
      }));
    }), concatMap(() => {
      return this.locationService.get().pipe(tap((locationResults: Location[]) => {
        locations = locationResults;
      }));
    }), concatMap(() => {
      return this.personStandortService.get().pipe(tap((locationPersonResults: LocationPerson[]) => {
        locationPerson = locationPersonResults;
      }));
    }), concatMap(() => {
      return this.schoolClassService.get().pipe(tap((schoolClassResults: SchoolClass[]) => {
        schoolClasses = schoolClassResults;
      }));
    }), concatMap(() => {
      return this.personKlasseService.get().pipe(tap((personSchoolClassResults: PersonSchoolClass[]) => {
        personSchoolClass = personSchoolClassResults;
      }));
    })).subscribe(() => {
      // unten ist Ihr bereits vorhandener Code
      this.persons.data.map((person: Person) => {
        const personAddressLink: PersonAddress | undefined = personAddress.find((link: PersonAddress): boolean => link.person_id == person.id);
        const personRoleLink: PersonRole | undefined = personRole.find((link: PersonRole): boolean => link.person_id == person.id);
        const locationPersontLink: LocationPerson | undefined = locationPerson.find((link: LocationPerson): boolean => link.person_id == person.id);
        const personSchoolClassLink: PersonSchoolClass | undefined = personSchoolClass.find((link: PersonSchoolClass): boolean => link.person_id == person.id);

        if (personAddressLink) {
          person.address = <Address>addresses.find((adresse: Address): boolean => adresse.id == personAddressLink.address_id);
        }
        if (personRoleLink) {
          person.role = <Role>roles.find((rolle: Role): boolean => rolle.id == personRoleLink.role_id);
        }
        if (locationPersontLink) {
          person.location = <Location>locations.find((standort: Location): boolean => standort.id === locationPersontLink.location_id);
        }
        if (personSchoolClassLink) {
          person.school_class = <SchoolClass>schoolClasses.find((klasse: SchoolClass): boolean => klasse.id === personSchoolClassLink.school_class_id);
        }

        return person;
      });
    });
  }

  private initializeClasses(): void {
    this.schoolClassService.get().subscribe(result => {
      this.schoolClasses = result;
    });
  }

  private initializeLocations(): void {
    this.locationService.get().subscribe(result => {
      this.locations = result;
    });
  }

  private initializeRoles(): void {
    this.roleService.get().subscribe(result => {
      this.roles = result;
    });
  }
}


