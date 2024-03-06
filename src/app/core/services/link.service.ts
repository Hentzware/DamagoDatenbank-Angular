import { Injectable } from '@angular/core';
import {Person} from "../entities/Person";
import {Address} from "../entities/Address";
import {PersonAddress} from "../entities/PersonAddress";
import {Role} from "../entities/Role";
import {PersonRole} from "../entities/PersonRole";
import {LocationPerson} from "../entities/LocationPerson";
import {SchoolClass} from "../entities/SchoolClass";
import {PersonSchoolClass} from "../entities/PersonSchoolClass";
import {Location} from "../entities/Location";
import {PersonPhone} from "../entities/PersonPhone";
import {Phone} from "../entities/Phone";
import {Email} from "../entities/Email";
import {PersonEmail} from "../entities/PersonEmail";

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }

  public linkPersonAddress(persons: Person[], addresses: Address[], personAddress: PersonAddress[]) {
    persons.map((person: Person) => {
      const personAddressLink: PersonAddress | undefined = personAddress.find((link: PersonAddress): boolean => link.person_id == person.id);

      if (personAddressLink) {
        person.address = <Address>addresses.find((address: Address): boolean => address.id == personAddressLink.address_id);
      }

      return person;
    });
  }

  public linkPersonEmail(persons: Person[], emails: Email[], personEmail: PersonEmail[]) {
    persons.map((person: Person) => {
      const personEmailLink: PersonEmail | undefined = personEmail.find((link: PersonEmail): boolean => link.person_id == person.id);

      if (personEmailLink) {
        person.email = <Email>emails.find((email: Email): boolean => email.id == personEmailLink.email_id);
      }

      return person;
    });
  }

  public linkPersonRole(persons: Person[], roles: Role[], personRole: PersonRole[]) {
    persons.map((person: Person) => {
      const personRoleLink: PersonRole | undefined = personRole.find((link: PersonRole): boolean => link.person_id == person.id);

      if (personRoleLink) {
        person.role = <Role>roles.find((role: Role): boolean => role.id == personRoleLink.role_id);
      }

      return person;
    });
  }

  public linkPersonLocation(persons: Person[], locations: Location[], locationPerson: LocationPerson[]) {
    persons.map((person: Person) => {
      const locationPersonLink: LocationPerson | undefined = locationPerson.find((link: LocationPerson): boolean => link.person_id == person.id);

      if (locationPersonLink) {
        person.location = <Location>locations.find((location: Location): boolean => location.id === locationPersonLink.location_id);
      }

      return person;
    });
  }

  public linkPersonSchoolClass(persons: Person[], schoolClasses: SchoolClass[], personSchoolClass: PersonSchoolClass[]) {
    persons.map((person: Person) => {
      const personKlasseLink: PersonSchoolClass | undefined = personSchoolClass.find((link: PersonSchoolClass): boolean => link.person_id == person.id);

      if (personKlasseLink) {
        person.school_class = <SchoolClass>schoolClasses.find((schoolClass: SchoolClass): boolean => schoolClass.id === personKlasseLink.school_class_id);
      }

      return person;
    });
  }

  public linkPersonPhone(persons: Person[], phones: Phone[], personPhone: PersonPhone[]) {
    persons.map((person: Person) => {
      const personPhoneLink: PersonPhone | undefined = personPhone.find((link: PersonPhone): boolean => link.person_id == person.id);

      if (personPhoneLink) {
        person.phone = <Phone>phones.find((phone: Phone): boolean => phone.id === personPhoneLink.phone_id);
      }

      return person;
    });
  }
}
