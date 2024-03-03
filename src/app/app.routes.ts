import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SchoolClassComponent} from "./components/school-class/school-class.component";
import {LocationComponent} from "./components/location/location.component";
import {InventoryComponent} from "./components/inventory/inventory.component";
import {LessonComponent} from "./components/lesson/lesson.component";
import {RoleComponent} from "./components/role/role.component";
import {ModuleComponent} from "./components/module/module.component";
import {PersonComponent} from "./components/person/person.component";
import {RoomComponent} from "./components/room/room.component";
import {SearchComponent} from "./components/search/search.component";
import {AddressComponent} from "./components/address/address.component";

export const routes: Routes = [
  {path: "", redirectTo: "standorte", pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "klassen", component: SchoolClassComponent},
  {path: "standorte", component: LocationComponent},
  {path: "inventar", component: InventoryComponent},
  {path: "unterricht", component: LessonComponent},
  {path: "rollen", component: RoleComponent},
  {path: "module", component: ModuleComponent},
  {path: "personen", component: PersonComponent},
  {path: "raeume", component: RoomComponent},
  {path: "adresse", component: AddressComponent},
  {path: "suche", component: SearchComponent}
];
