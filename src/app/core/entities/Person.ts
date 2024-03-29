import {Role} from "./Role";
import {Address} from "./Address";
import {SchoolClass} from "./SchoolClass";
import {Location} from "./Location";
import {Phone} from "./Phone";
import {Email} from "./Email";

export interface Person {
  id: string;
  last_name: string;
  first_name: string;
  birthdate: string;
  address: Address;
  role: Role;
  location: Location;
  school_class: SchoolClass;
  phone: Phone;
  email: Email;
}
