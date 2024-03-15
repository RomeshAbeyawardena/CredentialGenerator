import { IGenericDataList } from "../datalist";
import { IStringService } from "../services/StringService";
export enum CharacterType 
{
    LowerCase,
    MixedNoSymbols,
    Mixed,
    Numeric,
    SpecialCharacters,
    UpperCase
}

export function getRange(type: CharacterType): number[] {
    switch (type) {     
        case CharacterType.LowerCase:
            return [97, 122];
        case CharacterType.Numeric:
            return [48,57];
        case CharacterType.SpecialCharacters:
            return [33,47];
        case CharacterType.UpperCase:
            return [65, 90]; 
        default:
            return [-1,-1];
    }
}

export function toList(stringService:IStringService) : IGenericDataList<number>[] {
    return Object.values(CharacterType)
                             .filter(value => typeof value === 'string')
                             .map((e, i) => { return {  value: i,
                                                        label: stringService.addSpacesToCamelCase(e.toLocaleString())
                            }});
}