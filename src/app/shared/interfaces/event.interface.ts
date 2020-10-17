import { IChannel } from './channel.interface';
export interface IEvent {
    name:string
    organizer: string
    startDate: Date
    duration: string
    description: string
    language: string
    link: string
    image: string
    channel: IChannel
    bookmark: boolean
    approved: boolean
    id: string
}