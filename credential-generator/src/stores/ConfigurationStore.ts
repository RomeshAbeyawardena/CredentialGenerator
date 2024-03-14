import { defineStore } from 'pinia'
import { computed, ComputedRef, ref, Ref } from "vue";
import { CharacterType } from '../enumerations/CharacterType';
import { IUserConfigurationOptions } from '../configuration/UserConfigurationOptions';
import { IStringGenerationConfiguration } from '../configuration/StringGenerationConfiguration';
import { IPasswordConfigurationOptions } from '../configuration/PasswordConfigurationOptions';
import { GenerationComponent } from '../enumerations/GenerationComponents';

export interface IConfigurationStore {
    getConfiguration: ComputedRef<(component: GenerationComponent) => IStringGenerationConfiguration>;
    user: Ref<IUserConfigurationOptions>;
    password: Ref<IPasswordConfigurationOptions>;
}

export const useConfigurationStore = defineStore("configuration", (): IConfigurationStore => {
    const user: Ref<IUserConfigurationOptions> = ref({
        length: 6,
        mustStartWithAlphaNumeric: true,
        type: CharacterType.MixedNoSymbols
    });

    const password: Ref<IPasswordConfigurationOptions> = ref({
        length: 8,
        mustHaveAtLeastOneNumber: false,
        mustHaveAtLeastOneSymbol: false,
        type: CharacterType.Mixed
    });

    const getConfiguration = computed(() => (component: GenerationComponent): IStringGenerationConfiguration => {
        switch (component) {
            case GenerationComponent.Username:
                return {
                    mustStartWithAlphaNumeric: user.value.mustStartWithAlphaNumeric,
                    mustHaveAtLeastOneNumber: false,
                    mustHaveAtLeastOneSymbol: false
                };
            case GenerationComponent.Password:
                return {
                    mustStartWithAlphaNumeric: false,
                    mustHaveAtLeastOneNumber: password.value.mustHaveAtLeastOneNumber,
                    mustHaveAtLeastOneSymbol: password.value.mustHaveAtLeastOneSymbol
                };
        };
    });


    return {
        getConfiguration,
        user,
        password
    }
});