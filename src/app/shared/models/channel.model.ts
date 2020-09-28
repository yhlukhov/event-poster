import { IChannel } from "../interfaces/channel.interface"
import { ICountry } from '../interfaces/country.interface';
import { ILanguage } from '../interfaces/language.interface';

export class Channel implements IChannel {
    constructor(
        public name: string,
        public userName: string,
        public userEmail: string,
        public userPassword: string,
        public country: ICountry,
        public language: ILanguage,
        public description: string,
        public userRole = 'user',
        public subscribe = true,
        public id = "",
    ) {}
}
