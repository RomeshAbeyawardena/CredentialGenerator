export interface INumberService {
    getRandomRange(min:number, max:number):number;
    getRandomInt(max:number):number;
}

export class NumberService implements INumberService {
    getRandomRange(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRandomInt(max:number):number {
        return Math.floor(Math.random() * max);
    }
}