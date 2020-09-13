import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ICountry } from '../../shared/interfaces/country.interface';
import { Country } from '../../shared/models/country.model';
import { MatSelectChange } from '@angular/material/select';
import { IEvent } from '../../shared/interfaces/event.interface';

@Component({
  selector: 'app-filter-country',
  templateUrl: './filter-country.component.html',
  styleUrls: ['./filter-country.component.scss']
})
export class FilterCountryComponent implements OnInit {
  @Output() countryFilter = new EventEmitter<Array<ICountry>>()
  countryList: Array<ICountry> = []
  selectedCounties: Array<ICountry> = []
  countryForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.initData()
    this.countryForm = new FormGroup({
      countries: new FormControl(this.selectedCounties)
    })
  }

  initData() {
    fetch("./assets/json-data/countries.json").then(countries => countries.json()).then(countries => { // fetch Countries from json file
      const countriesEntries = Object.entries(countries)
      countriesEntries.forEach(country => {
        const code = country[0]
        const {name, native, languages} = country[1] as ICountry
        this.countryList.push(new Country(code, name, native, languages))
      })
    })
    if(localStorage.getItem('countryFilter')) {
      this.selectedCounties = JSON.parse(localStorage.getItem('countryFilter'))
    }
  }

  selectContry(event: MatSelectChange) {
    this.countryFilter.emit(event.value)
  }
}
