import { IChannel } from "../interfaces/channel.interface"
import { ICountry } from '../interfaces/country.interface';
import { ILanguage } from '../interfaces/language.interface';

export class Channel implements IChannel {
    constructor(
        public channelName: string,
        public userName: string,
        public userEmail: string,
        public userPassword: string,
        public channelCountry: ICountry,
        public channelLanguage: ILanguage,
        public channelDescription: string,
        public userRole = 'user'
    ) {}
}
