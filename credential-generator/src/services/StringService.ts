import { CharacterType, getRange } from "../enumerations/CharacterType";
import { INumberService } from "./NumberService";

export interface IStringService
{
    addSpacesToCamelCase(camelCaseValue: string):string;
    generateString(length:number, type: CharacterType):string;
}

export class StringService {
    private numberService:INumberService;

    constructor(numberService:INumberService) {
        this.numberService = numberService;
    }

    addSpacesToCamelCase(camelCaseValue: string)
    {
        var str = "";
        const range = getRange(CharacterType.UpperCase);
        for(let i=0;i < camelCaseValue.length;i++)
        {
            let character = camelCaseValue[i];
            const charCode = character.charCodeAt(0);
            const result = i > 0 && charCode >= range[0] && charCode <= range[1];
            
            if(result) {
                str += " ";
                character = character.toLocaleLowerCase();
            }

            str += character;
        }

        return str;
    }

    generateString(length:number, type: CharacterType):string {
        let str = "";
        const isMixed = type == CharacterType.Mixed || type == CharacterType.MixedNoSymbols;
        let range = isMixed
         ? []
         : getRange(type);

        while(str.length < length)
        {
            if(!isMixed) {
                if(range.length == 2)
                {
                    str += String.fromCharCode(this.numberService.getRandomRange(range[0], range[1]));
                }
                else throw "Unable to determine range";
            }
            else
            {
                const setRangeMaximum = type == CharacterType.MixedNoSymbols ? 7500 : 10000;
                const mixerValue = this.numberService.getRandomInt(setRangeMaximum);
                if(mixerValue < 2500)
                {
                    str += this.generateString(1, CharacterType.LowerCase);
                }
                else if(mixerValue > 2500 && mixerValue <= 5000)
                {
                    str += this.generateString(1, CharacterType.UpperCase);
                }
                else if(mixerValue > 5000 && mixerValue <= 7500)
                {
                    str += this.generateString(1, CharacterType.Numeric);
                }
                else {
                    str += this.generateString(1, CharacterType.SpecialCharacters);
                }
            }
        }

        return str;
    }
}