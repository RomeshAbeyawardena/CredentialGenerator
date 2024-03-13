import { CharacterType, getRange } from "../enumerations/CharacterType";
import { INumberService } from "./NumberService";

export interface IStringService {
    addSpacesToCamelCase(camelCaseValue: string): string;
    getRandomCharacter(type: CharacterType): string;
    generateString(length: number, type: CharacterType): string;
}

export class StringService implements IStringService {
    private numberService: INumberService;

    constructor(numberService: INumberService) {
        this.numberService = numberService;
    }

    addSpacesToCamelCase(camelCaseValue: string) {
        var str = "";
        const range = getRange(CharacterType.UpperCase);
        for (let i = 0; i < camelCaseValue.length; i++) {
            let character = camelCaseValue[i];
            const charCode = character.charCodeAt(0);
            const result = i > 0 && charCode >= range[0] && charCode <= range[1];

            if (result) {
                str += " ";
                character = character.toLocaleLowerCase();
            }

            str += character;
        }

        return str;
    }

    getRandomCharacter(type: CharacterType):string {
        const isMixed = type == CharacterType.Mixed
            || type == CharacterType.MixedNoSymbols;
        
        let range = isMixed ? [] : getRange(type);

        if (!isMixed && range.length !== 2) {
            throw "Unable to determine range";
        }
        
        if (!isMixed) {
            return String
                .fromCharCode(this.numberService
                    .getRandomRange(range[0], range[1]));
        }

        const setRangeMaximum = type == CharacterType.MixedNoSymbols
            ? 7500
            : 10000;
        const mixerValue = this.numberService.getRandomInt(setRangeMaximum);
        if (mixerValue < 2500) {
            return this.getRandomCharacter(CharacterType.LowerCase);
        }
        else if (mixerValue > 2500 && mixerValue <= 5000) {
            return this.getRandomCharacter(CharacterType.UpperCase);
        }
        else if (mixerValue > 5000 && mixerValue <= 7500) {
            return this.getRandomCharacter(CharacterType.Numeric);
        }
        else {
            return this.getRandomCharacter(CharacterType.SpecialCharacters);
        }
    }

    generateString(length: number, type: CharacterType): string {
        let str = "";
        
        while (str.length < length) {
            str += this.getRandomCharacter(type);
        }

        return str;
    }
}