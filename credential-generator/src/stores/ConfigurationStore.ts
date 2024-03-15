import { defineStore } from 'pinia'
import { computed, ComputedRef, inject, ref, Ref } from "vue";
import { CharacterType } from '../enumerations/CharacterType';
import { IUserConfigurationOptions } from '../configuration/UserConfigurationOptions';
import { IStringGenerationConfiguration } from '../configuration/StringGenerationConfiguration';
import { IPasswordConfigurationOptions } from '../configuration/PasswordConfigurationOptions';
import { GenerationComponent } from '../enumerations/GenerationComponents';
import { IStringService } from '../services/StringService';
import { Services } from '../services/Services';
import { IConfigurationOptions } from '../configuration/ConfigurationOptions';

export interface IConfigurationStore {
    generateComponent(component:GenerationComponent):string;
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

    const stringService = inject<IStringService>(Services.StringService);
  
    const emailAddress: Ref<IConfigurationOptions> = ref({
        length:0,
        type: CharacterType.Mixed
    });
    
    const password: Ref<IPasswordConfigurationOptions> = ref({
        length: 8,
        mustHaveAtLeastOneNumber: false,
        mustHaveAtLeastOneSymbol: false,
        type: CharacterType.Mixed
    });

    function getConfig(component: GenerationComponent): IStringGenerationConfiguration
    {
        switch (component) {
            case GenerationComponent.Email:
            {
                return {
                    mustStartWithAlphaNumeric: false,
                    mustHaveAtLeastOneNumber: false,
                    mustHaveAtLeastOneSymbol: false
                }
            }
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
    }

    const getConfiguration = computed(() => (component: GenerationComponent): IStringGenerationConfiguration => {
        return getConfig(component);
    });

    function generateComponent(component:GenerationComponent)
    {
        let configuration : IConfigurationOptions 
        switch(component){
            case GenerationComponent.Email:
                configuration = emailAddress.value
                break;
            case GenerationComponent.Password:
                configuration = password.value;
                break;
            case GenerationComponent.Username:
                configuration = user.value;
                break;
        }
          
        if(stringService == undefined){
            throw 'Injection failed';
        }

        return stringService
            .generateString(configuration.length, configuration.type, getConfig(component));
    }

    return {
        generateComponent,
        getConfiguration,
        user,
        password
    }
});