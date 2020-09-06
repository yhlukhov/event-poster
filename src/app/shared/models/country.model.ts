import { ICountry } from '../interfaces/country.interface';

export class Country implements ICountry {
    constructor(
        public code: string,
        public name: string,
        public native: string,
        public languages: Array<string>
    ) { }
}