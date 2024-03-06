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
import {concatMap, map} from "rxjs";
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
import {PhoneService} from "../../../core/services/phone.service";
import {PersonPhoneService} from "../../../core/services/person-phone.service";
import {EmailService} from "../../../core/services/email.service";
import {PersonEmailService} from "../../../core/services/person-email.service";

@Component({
  selector: 'app-person-new',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    DatePipe,
    MatDatepickerInput,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    NgForOf,
    AutoCompleteComponent,
    MatSelect
  ],
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

  constructor(private personService: PersonService,
              private addressService: AddressService,
              private personRoleService: PersonRoleService,
              private personAddressService: PersonAddressService,
              private roleService: RoleService,
              private locationService: LocationService,
              private schoolClassService: SchoolClassService,
              private personSchoolClassService: PersonSchoolClassService,
              private locationPersonService: LocationPersonService,
              private phoneService: PhoneService,
              private personPhoneService: PersonPhoneService,
              private emailService: EmailService,
              private personEmailService: PersonEmailService,
              private dialogRef: MatDialogRef<PersonNewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.person = {
      id: "",
      birthdate: "2000-01-01",
      first_name: "",
      last_name: "",
      address: {country: "", location: "", postal_code: "", id: "", street: "", house_number: ""},
      role: {name: "", id: ""},
      location: {name: "", id: ""},
      school_class: {name: "", id: ""},
      phone: {phone: "", id: ""},
      email: {id: "", email: ""}
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
    this.selectedClass = $event;
  }

  public onStreetSelected($event: string): void {
    this.person.address.street = $event;
  }

  public save(): void {
    this.addPerson().pipe(
      concatMap(person => this.addAddress(person)),
      concatMap(person => this.addPersonAddress(person)),
      concatMap(person => this.addPersonRole(person)),
      concatMap(person => this.addLocationPerson(person)),
      concatMap(person => this.addPersonSchoolClass(person)),
      concatMap(person => this.addPhone(person)),
      concatMap(person => this.addPersonPhone(person)),
      concatMap(person => this.addEmail(person)),
      concatMap(person => this.addPersonEmail(person))
    ).subscribe((): void => {
      this.dialogRef.close();
    })
  }

  private addAddress(person: any) {
    return this.addressService.add(this.person.address).pipe(map(address => ({...person, address})));
  }

  private addLocationPerson(person: any) {
    return this.locationPersonService.add({id: '', person_id: person.id, location_id: this.selectedLocation}).pipe(map(() => person));
  }

  private addPerson() {
    return this.personService.add(this.person);
  }

  private addPersonAddress(person: any) {
    return this.personAddressService.add({id: "", person_id: person.id, address_id: person.address.id}).pipe(map(() => person));
  }

  private addPersonPhone(person: any) {
    return this.personPhoneService.add({id: "", person_id: person.id, phone_id: person.phone.id}).pipe(map(() => person));
  }

  private addPersonRole(person: any) {
    return this.personRoleService.add({id: "", person_id: person.id, role_id: this.selectedRole}).pipe(map(() => person));
  }

  private addPersonSchoolClass(person: any) {
    return this.personSchoolClassService.add({id: "", person_id: person.id, school_class_id: this.selectedClass}).pipe(map(() => person));
  }

  private addPhone(person: any) {
    return this.phoneService.add(this.person.phone).pipe(map(phone => ({...person, phone})));
  }

  private addEmail(person: any) {
    return this.emailService.add(this.person.email).pipe(map(email => ({...person, email})));
  }

  private addPersonEmail(person: any) {
    return this.personEmailService.add({id: "", person_id: person.id, email_id: person.email.id}).pipe(map(() => person));
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
