import { DateTime } from "luxon";

export interface IDateFormats {
    readonly shortenedFormat:string;
    readonly longFormat:string;
}

export interface IDateService {
    formats:IDateFormats;
    getDateTime(date: Date): DateTime;
    now(): DateTime;
}

class DateFormat implements IDateFormats {
    shortenedFormat: string = "dd MMM yyyy HH:mm";
    longFormat: string = "";
}

export class DateService implements IDateService 
{
    readonly formats: IDateFormats = new DateFormat();
    getDateTime(date: Date): DateTime<boolean> {
        return DateTime.fromISO(date.toISOString());
    }

    now(): DateTime {
        return DateTime.now();
    }
}