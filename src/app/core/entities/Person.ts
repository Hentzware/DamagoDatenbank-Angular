import {Adresse} from "./Adresse";
import {Rolle} from "./Rolle";
import {Standort} from "./Standort";

export interface Person {
  id: string;
  nachname: string;
  vorname: string;
  geburtsdatum: string;
  adresse: Adresse;
  rolle: Rolle;
  standort: Standort;
}
