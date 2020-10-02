import { ICountry } from './country.interface';
import { ILanguage } from './language.interface';
export interface IChannel {
    name: string,
    userName: string,
    userEmail: string,
    userPassword: string,
    country: ICountry,
    language: ILanguage,
    description: string,
    image: string,
    userRole: string,
    subscribe: boolean,
    approved: boolean,
    id: string
}
