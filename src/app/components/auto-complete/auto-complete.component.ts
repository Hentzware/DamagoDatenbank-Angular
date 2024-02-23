import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatFormField,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    MatInput,
    NgForOf,
    MatLabel,
    FlexLayoutModule
  ],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.css'
})
export class AutoCompleteComponent implements OnInit {
  @Input() public name: string = "";
  @Input() public value: string = "";
  @Input() public optionsList: string[] = [];
  @Output() public selected = new EventEmitter<string>();
  public control: FormControl<any> = new FormControl();
  public filteredOptions: Observable<string[]>;

  constructor() {
    this.control.valueChanges.subscribe(value => {
      this.selected.emit(value);
    });

    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnInit(): void {
    if (this.value != null) {
      this.control.setValue(this.value);
    } else {
      this.control.setValue("");
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (filterValue.length > 0 && this.optionsList != undefined) {
      return this.optionsList.filter(option => option?.toLowerCase().includes(filterValue));
    } else {
      return [];
    }
  }
}
