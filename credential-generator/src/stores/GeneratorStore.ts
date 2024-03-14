import { defineStore } from "pinia";
import { computed, ComputedRef, ref, Ref } from "vue";

export interface IGeneratorStore {
    disableAdd: Ref<boolean>;
    addDisabled:ComputedRef<boolean>;
    username: Ref<string>;
    password: Ref<string>;
}

export const useGeneratorStore = defineStore("generator", ():IGeneratorStore => {
    const disableAdd = ref(false);
    const username = ref("");
    const password = ref("");
    
    const addDisabled = computed(() => {
        return disableAdd.value 
            || username.value.length < 1
            || password.value.length < 1;
    });

    return {
        addDisabled,
        disableAdd,
        password,
        username
    }
});