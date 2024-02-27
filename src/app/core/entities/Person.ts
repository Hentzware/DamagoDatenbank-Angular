import {Adresse} from "./Adresse";
import {Rolle} from "./Rolle";

export interface Person {
  id: string;
  nachname: string;
  vorname: string;
  geburtsdatum: string;
  adresse: Adresse;
  rolle: Rolle;
}
