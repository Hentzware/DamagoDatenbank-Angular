import {Adresse} from "./Adresse";

export interface Person {
  id: string;
  nachname: string;
  vorname: string;
  geburtsdatum: string;
  adresse: Adresse;
}
