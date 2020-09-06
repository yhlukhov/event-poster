import { ILanguage } from '../interfaces/language.interface';
export class Language implements ILanguage {
    constructor(
        public code: string,
        public name: string,
        public native: string
    ) { }
}