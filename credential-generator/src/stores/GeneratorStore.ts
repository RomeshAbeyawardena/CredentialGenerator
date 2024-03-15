import { defineStore } from "pinia";
import { computed, ComputedRef, ref, Ref } from "vue";

export interface IGeneratorStore {
    addDisabled:ComputedRef<boolean>;
    commitToTable:Ref<boolean>;
    emailAddress:Ref<string>;
    username: Ref<string>;
    password: Ref<string>;
}

export const useGeneratorStore = defineStore("generator", ():IGeneratorStore => {
    const emailAddress = ref("");
    const username = ref("");
    const password = ref("");
    const commitToTable = ref(true);
    const addDisabled = computed(() => {
        return username.value.length < 1
            || password.value.length < 1;
    });

    return {
        addDisabled,
        commitToTable,
        emailAddress,
        password,
        username
    }
});