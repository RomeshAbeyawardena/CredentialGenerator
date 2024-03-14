import { CharacterType, getRange } from "../enumerations/CharacterType";
import { INumberService } from "./NumberService";
import { IStringGenerationConfiguration } from "../configuration/StringGenerationConfiguration";
export interface IStringService {
    getCharCodeArray(str: string): number[];
    addSpacesToCamelCase(camelCaseValue: string): string;
    getRandomCharacter(type: CharacterType): string;
    generateString(length: number, type: CharacterType,
        configuration?: IStringGenerationConfiguration): string;
}

export class StringService implements IStringService {
    private numberService: INumberService;

    constructor(numberService: INumberService) {
        this.numberService = numberService;
    }

    hasCharCodeRange(str: string, range: number[]) {
        const charCodes = this.getCharCodeArray(str);
        
        if(range.length == 2){
            return charCodes.some(f => range[0] && f <= range[1]);
        }

        return charCodes.some(f => range.includes(f));
    }

    getCharCodeArray(str: string): number[] {
        const array = [];
        for (let i = 0; i < str.length; i++) {
            array.push(str.charCodeAt(i));
        }
        
        return array;
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

    getRandomCharacter(type: CharacterType): string {
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

    appendString(value: string, newValue: string, index: number) {
        return "".concat(value.slice(0, index), newValue + value.slice(index));
    }

    generateString(length: number, type: CharacterType,
        configuration?: IStringGenerationConfiguration): string {
        let str = "";
        
        while (str.length < length) {
            if (str.length == 0 && 
                (this.hasCharCodeRange(str, getRange(CharacterType.LowerCase))
                || this.hasCharCodeRange(str, getRange(CharacterType.UpperCase)))
                && configuration?.mustStartWithAlphaNumeric) {
                const randomNumber = this.numberService.getRandomInt(1000);
                const currentType = (randomNumber < 500)
                    ? CharacterType.LowerCase
                    : CharacterType.UpperCase;

                str = this.appendString(str, this.getRandomCharacter(currentType),
                    0);
            }
            else
                str += this.getRandomCharacter(type);
        }

        if (configuration?.mustHaveAtLeastOneSymbol) {
            const randomIndex = this.numberService
                .getRandomRange(0, str.length - 1);
            str = this.appendString(str, this
                .getRandomCharacter(CharacterType.SpecialCharacters),
                randomIndex);
        }

        if (configuration?.mustHaveAtLeastOneNumber) {
            const randomIndex = this.numberService
                .getRandomRange(0, str.length - 1);
            str = this.appendString(str, this
                .getRandomCharacter(CharacterType.Numeric), randomIndex);
        }

        return str;
    }
}