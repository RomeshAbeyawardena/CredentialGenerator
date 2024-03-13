import { defineStore } from 'pinia'
import { ref, Ref } from "vue";
import { CharacterType } from '../enumerations/CharacterType';

export interface IConfigurationOptions {
    length:number;
    type: CharacterType;
}

export interface IUserConfigurationOptions extends IConfigurationOptions {
    
}

export interface IPasswordConfigurationOptions extends IConfigurationOptions {

}

export interface IConfigurationStore {
    user: Ref<IUserConfigurationOptions>;
    password: Ref<IPasswordConfigurationOptions>;
}

export const useConfigurationStore = defineStore("configuration", () : IConfigurationStore => {
    const user:Ref<IUserConfigurationOptions> = ref({ length: 6, type: CharacterType.MixedNoSymbols });
    const password:Ref<IPasswordConfigurationOptions> = ref({ length: 8, type: CharacterType.Mixed });

    return {
        user,
        password
    }
});