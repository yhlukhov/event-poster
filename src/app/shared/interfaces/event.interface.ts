import { IChannel } from './channel.interface';
export interface IEvent {
    name:string
    organizer: string
    startDate: Date
    description: string
    address: string
    link: string
    image: string
    channel: IChannel
    bookmark: boolean
    id: string
}