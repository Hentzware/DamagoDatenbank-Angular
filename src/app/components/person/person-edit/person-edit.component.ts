import {Component, Inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Person} from "../../../core/entities/Person";
import {PersonService} from "../../../core/services/person.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {concatMap, map, switchMap, tap} from "rxjs";
import {AutoCompleteComponent} from "../../auto-complete/auto-complete.component";
import {AddressService} from "../../../core/services/address.service";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {Location} from "../../../core/entities/Location";
import {Role} from "../../../core/entities/Role";
import {SchoolClass} from "../../../core/entities/SchoolClass";
import {SchoolClassService} from "../../../core/services/school-class.service";
import {LocationService} from "../../../core/services/location.service";
import {RoleService} from "../../../core/services/role.service";
import {PhoneService} from "../../../core/services/phone.service";
import {EmailService} from "../../../core/services/email.service";
import {LocationPersonService} from "../../../core/services/location-person.service";
import {LinkService} from "../../../core/services/link.service";
import {LocationPerson} from "../../../core/entities/LocationPerson";
import {PersonAddressService} from "../../../core/services/person-address.service";
import {PersonSchoolClassService} from "../../../core/services/person-school-class.service";
import {PersonRoleService} from "../../../core/services/person-role.service";
import {PersonPhoneService} from "../../../core/services/person-phone.service";
import {PersonEmailService} from "../../../core/services/person-email.service";
import {PersonAddress} from "../../../core/entities/PersonAddress";
import {PersonSchoolClass} from "../../../core/entities/PersonSchoolClass";
import {PersonRole} from "../../../core/entities/PersonRole";
import {PersonPhone} from "../../../core/entities/PersonPhone";
import {PersonEmail} from "../../../core/entities/PersonEmail";

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [FlexModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule, FormsModule, AutoCompleteComponent, MatOption, MatSelect],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css'
})
export class PersonEditComponent {
  public locations!: Location[];
  public person: Person = {
    id: "",
    address: {country: "", location: "", street: "", house_number: "", postal_code: "", id: ""},
    role: {name: "", id: ""},
    location: {name: "", id: ""},
    school_class: {name: "", id: ""},
    first_name: "",
    last_name: "",
    birthdate: "",
    phone: {phone: "", id: ""},
    email: {id: "", email: ""}
  };
  public roles!: Role[];
  public schoolClasses!: SchoolClass[];
  public selectedLocation: string = "";
  public selectedRole: string = "";
  public selectedSchoolClass: string = "";
  private locationPerson: LocationPerson[] = [];
  private personAddress: PersonAddress[] = [];
  private personSchoolClass: PersonSchoolClass[] = [];
  private personRole: PersonRole[] = [];
  private personPhone: PersonPhone[] = [];
  private personEmail: PersonEmail[] = [];

  constructor(private personService: PersonService,
              private adresseService: AddressService,
              private schoolClassService: SchoolClassService,
              private personSchoolClassService: PersonSchoolClassService,
              private locationService: LocationService,
              private roleService: RoleService,
              private personRoleService: PersonRoleService,
              private phoneService: PhoneService,
              private emailService: EmailService,
              private locationPersonService: LocationPersonService,
              private linkService: LinkService,
              private dialogRef: MatDialogRef<PersonEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.person = data.person;
    console.log(this.person);

    this.schoolClassService.get().pipe(
      concatMap((schoolClasses) => {
        this.schoolClasses = schoolClasses;
        return this.locationService.get();
      }),
      concatMap((locations) => {
        this.locations = locations;
        return this.roleService.get();
      }),
      concatMap((roles) => {
        this.roles = roles;
        return this.locationPersonService.get();
      }),
      concatMap((locationPerson) => {
        this.locationPerson = locationPerson;
        return this.personSchoolClassService.get();
      }),
      concatMap((personSchoolClass) => {
        this.personSchoolClass = personSchoolClass;
        return this.personRoleService.get();
      }),
    ).subscribe((personRole) => {
      this.personRole = personRole;

      if (this.person.school_class?.id) {
        this.selectedSchoolClass = this.person.school_class.id;
      }

      if (this.person.location?.id) {
        this.selectedLocation = this.person.location.id;
      }

      if (this.person.role?.id) {
        this.selectedRole = this.person.role.id;
      }

      this.linkService.linkPersonLocation(Array.of(this.person), this.locations, this.locationPerson);
      this.linkService.linkPersonRole(Array.of(this.person), this.roles, this.personRole);
      this.linkService.linkPersonSchoolClass(Array.of(this.person), this.schoolClasses, this.personSchoolClass);
    });
  }

  public onBirthdateSelected($event: string): void {
    this.person.birthdate = $event;
  }

  public onCountrySelected($event: string): void {
    this.person.address.country = $event;
  }

  public onEmailSelected($event: string) {
    this.person.email.email = $event;
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

  public onPhoneSelected($event: string) {
    this.person.phone.phone = $event;
  }

  public onPostalCodeSelected($event: string): void {
    this.person.address.postal_code = $event;
  }

  public onSelectedLocationChanged($event: string): void {
    this.selectedLocation = $event;
  }

  public onSelectedRoleChanged($event: string): void {
    this.selectedRole = $event;
  }

  public onSelectedSchoolClassChanged($event: string): void {
    this.selectedSchoolClass = $event;
  }

  public onStreetSelected($event: string): void {
    this.person.address.street = $event;
  }

  public save(): void {
    this.updatePerson(this.person).pipe(
      concatMap(() => this.updateAddress()),
      concatMap(() => this.updateLocation()),
      concatMap(() => this.updateEmail()),
      concatMap(() => this.updatePhone()),
      concatMap(() => this.updateSchoolClass()),
      concatMap(() => this.updateRole())
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }

  private updatePerson(person: any) {
    return this.personService.update(person).pipe(map(() => person));
  }

  private updateAddress() {
    return this.adresseService.update(this.person.address);
  }

  private updatePhone() {
    return this.phoneService.update(this.person.phone);
  }

  private updateEmail() {
    return this.emailService.update(this.person.email);
  }

  private updateLocation() {
    return this.locationPersonService.search(this.person.location.id, this.person.id).pipe(
      switchMap(result => {
        if(result && result.length > 0){
          return this.locationPersonService.update({
            id: result[0].id,
            person_id: this.person.id,
            location_id: this.selectedLocation
          });
        } else {
          throw new Error("Kein Standort gefunden zum Aktualisieren");
        }
      })
    );
  }

  private updateRole() {
    return this.personRoleService.search(this.person.id, this.person.role.id).pipe(
      switchMap(result => {
        if(result && result.length > 0){
          return this.personRoleService.update({
            id: result[0].id,
            person_id: this.person.id,
            role_id: this.selectedRole
          });
        } else {
          throw new Error("Keine Rolle gefunden zum Aktualisieren");
        }
      })
    );
  }

  private updateSchoolClass() {
    return this.personSchoolClassService.search(this.person.id, this.person.school_class.id).pipe(
      switchMap(result => {
        if(result && result.length > 0){
          return this.personSchoolClassService.update({
            id: result[0].id,
            person_id: this.person.id,
            school_class_id: this.selectedSchoolClass
          });
        } else {
          throw new Error("Keine Klasse gefunden zum Aktualisieren");
        }
      })
    );
  }
}
