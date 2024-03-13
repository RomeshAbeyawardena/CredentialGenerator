import { defineStore } from 'pinia'
import { ref, Ref } from "vue";
import { CharacterType } from '../enumerations/CharacterType';
import { IUserConfigurationOptions } from '../configuration/UserConfigurationOptions';
import { IPasswordConfigurationOptions } from '../configuration/PasswordConfigurationOptions';

export interface IConfigurationStore {
    user: Ref<IUserConfigurationOptions>;
    password: Ref<IPasswordConfigurationOptions>;
}

export const useConfigurationStore = defineStore("configuration", () : IConfigurationStore => {
    const user:Ref<IUserConfigurationOptions> = ref({ 
        length: 6, 
        mustStartWithAlphaNumeric: true,
        type: CharacterType.MixedNoSymbols 
    });
    
    const password:Ref<IPasswordConfigurationOptions> = ref({ 
        length: 8,
        mustHaveAtLeastOneNumber: false,
        mustHaveAtLeastOneSymbol: false, 
        type: CharacterType.Mixed });

    return {
        user,
        password
    }
});