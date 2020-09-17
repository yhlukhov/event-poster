import { IEvent } from '../interfaces/event.interface';
import { IChannel } from '../interfaces/channel.interface';

export class Event implements IEvent {
    constructor(
        public name: string,
        public organizer: string,
        public startDate: Date,
        public description: string,
        public address: string,
        public link: string,
        public image: string,
        public channel: IChannel,
        public bookmark = false,
        public id = ""
    ) { }
}