import { ICountry } from './country.interface';
import { ILanguage } from './language.interface';
export interface IChannel {
    channelName: string,
    userName: string,
    userEmail: string,
    userPassword: string,
    channelCountry: ICountry,
    channelLanguage: ILanguage,
    channelDescription: string,
    userRole: string
}
