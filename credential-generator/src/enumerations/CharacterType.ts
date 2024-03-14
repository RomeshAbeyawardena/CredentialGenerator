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
