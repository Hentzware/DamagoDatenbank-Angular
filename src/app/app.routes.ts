import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {KlassenComponent} from "./components/klassen/klassen.component";
import {StandorteComponent} from "./components/standorte/standorte.component";
import {InventarComponent} from "./components/inventar/inventar.component";
import {UnterrichtComponent} from "./components/unterricht/unterricht.component";
import {RollenComponent} from "./components/rollen/rollen.component";
import {ModuleComponent} from "./components/module/module.component";
import {PersonenComponent} from "./components/personen/personen.component";
import {RaeumeComponent} from "./components/raeume/raeume.component";
import {SucheComponent} from "./components/suche/suche.component";
import {AddressComponent} from "./components/address/address.component";

export const routes: Routes = [
  {path: "", redirectTo: "standorte", pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "klassen", component: KlassenComponent},
  {path: "standorte", component: StandorteComponent},
  {path: "inventar", component: InventarComponent},
  {path: "unterricht", component: UnterrichtComponent},
  {path: "rollen", component: RollenComponent},
  {path: "module", component: ModuleComponent},
  {path: "personen", component: PersonenComponent},
  {path: "raeume", component: RaeumeComponent},
  {path: "adresse", component: AddressComponent},
  {path: "suche", component: SucheComponent}
];
