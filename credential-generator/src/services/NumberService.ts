export interface INumberService {
    fill(min:number,max:number):number[];
    getRandomRange(min:number, max:number):number;
    getRandomInt(max:number):number;
}

export class NumberService implements INumberService {
    fill(min: number, max: number): number[] {
        const array = [];
        for (let index = min; index++ < max;) 
        {
            array.push(index);
        }
        return array;
    }

    getRandomRange(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRandomInt(max:number):number {
        return Math.floor(Math.random() * max);
    }
}