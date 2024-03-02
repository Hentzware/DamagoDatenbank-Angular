import {Component, Inject, OnInit} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Person} from "../../../core/entities/Person";
import {PersonService} from "../../../core/services/person.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {MatDatepickerInput} from "@angular/material/datepicker";
import {concatMap} from "rxjs";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AutoCompleteComponent} from "../../auto-complete/auto-complete.component";
import {MatSelect} from "@angular/material/select";
import {PersonRoleService} from "../../../core/services/person-role.service";
import {PersonSchoolClassService} from "../../../core/services/person-school-class.service";
import {SchoolClass} from "../../../core/entities/SchoolClass";
import {Role} from "../../../core/entities/Role";
import {AddressService} from "../../../core/services/address.service";
import {PersonAddressService} from "../../../core/services/person-address.service";
import {RoleService} from "../../../core/services/role.service";
import {LocationService} from "../../../core/services/location.service";
import {SchoolClassService} from "../../../core/services/school-class.service";
import {LocationPersonService} from "../../../core/services/location-person.service";
import {Location} from "../../../core/entities/Location";

@Component({
  selector: 'app-person-new',
  standalone: true,
  imports: [FlexModule, FormsModule, MatButton, MatFormField, MatInput, MatLabel, DatePipe, MatDatepickerInput, MatAutocomplete, MatOption, AsyncPipe, ReactiveFormsModule, MatAutocompleteTrigger, NgForOf, AutoCompleteComponent, MatSelect],
  templateUrl: './person-new.component.html',
  styleUrl: './person-new.component.css'
})
export class PersonNewComponent implements OnInit {
  public locations!: Location[];
  public person!: Person;
  public roles!: Role[];
  public schoolClasses!: SchoolClass[];
  public selectedClass: string = "";
  public selectedLocation: string = "";
  public selectedRole: string = "";

  constructor(private personService: PersonService, private addressService: AddressService, private personRoleService: PersonRoleService, private personAddressService: PersonAddressService, private roleService: RoleService, private locationService: LocationService, private schoolClassService: SchoolClassService, private personSchoolClassService: PersonSchoolClassService, private locationPersonService: LocationPersonService, private dialogRef: MatDialogRef<PersonNewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.person = {
      id: "", birthdate: "2000-01-01", first_name: "", last_name: "", address: {
        country: "", location: "", postal_code: "", id: "", street: "", house_number: ""
      }, role: {
        name: "", id: ""
      }, location: {
        name: "", id: ""
      }, school_class: {
        name: "", id: ""
      }

    };
    this.initializeLocations();
    this.initializeRoles();
    this.initializeClasses();

  }

  public onBirthdateSelected($event: string): void {
    this.person.birthdate = $event;
  }

  public onCountrySelected($event: string): void {
    this.person.address.country = $event;
  }

  public onFirstNameSelected($event: string): void {
    this.person.first_name = $event;
  }

  public onHouseNumberSelected($event: string): void {
    this.person.address.house_number = $event;
  }

  public onLastNameSelected($event: string): void {
    this.person.last_name = $event;
  }

  public onLocationSelected($event: string): void {
    this.person.address.location = $event;
  }

  public onPostalCodeSelected($event: string): void {
    this.person.address.postal_code = $event;
  }

  public onSelectedLocationChanged($event: string): void {
    this.selectedLocation = $event;
    console.log($event);
  }

  public onSelectedRoleChanged($event: string): void {
    this.selectedRole = $event;
    console.log($event);

  }

  public onSelectedSchoolClassChanged($event: string): void {
    this.selectedClass = $event;
  }

  public onStreetSelected($event: string): void {
    this.person.address.street = $event;
  }

  public save(): void {
    this.personService.add(this.person).pipe(concatMap((person: any) => {
      return this.addressService.add(this.person.address).pipe(concatMap((address: any) => {
        return this.personAddressService.add({id: "", person_id: person.id, address_id: address.id}).pipe(concatMap(() => {
          return this.personRoleService.add({id: "", person_id: person.id, role_id: this.selectedRole}).pipe(concatMap(() => {
            return this.locationPersonService.add({
              id: "", person_id: person.id, location_id: this.selectedLocation
            }).pipe(concatMap(() => {
              return this.personSchoolClassService.add({
                id: "", person_id: person.id, school_class_id: this.selectedClass
              });
            }));
          }));
        }));
      }));
    })).subscribe((): void => {
      this.dialogRef.close();
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
