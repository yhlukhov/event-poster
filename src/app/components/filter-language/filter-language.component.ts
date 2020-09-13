import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ILanguage } from '../../shared/interfaces/language.interface';
import { Language } from '../../shared/models/language.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-filter-language',
  templateUrl: './filter-language.component.html',
  styleUrls: ['./filter-language.component.scss']
})
export class FilterLanguageComponent implements OnInit {
  @Output() languageFilter = new EventEmitter<Array<ILanguage>>()
  languageForm: FormGroup
  languageList: Array<ILanguage> = []
  englishLanguage: ILanguage

  constructor() { }

  ngOnInit(): void {
    this.initData()
    this.languageForm = new FormGroup({
      languages: new FormControl()
    })
  }

  initData() {
    fetch("./assets/json-data/languages.json").then(languages => languages.json()).then(languages => {
      const languagesList = Object.entries(languages)
      languagesList.forEach(language => {
        this.languageList.push(new Language(language[0], language[1]["name"], language[1]["native"]))
      })
      this.englishLanguage = this.languageList.find(lang => lang.code==='en')
    })
  }

  selectLanguage(selectedLangs: MatSelectChange) {
    this.languageFilter.emit(selectedLangs.value)
  }
}
