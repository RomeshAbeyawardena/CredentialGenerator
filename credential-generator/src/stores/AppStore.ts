import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export interface IAppStore {
    accordianTabIndex: Ref<number>;
}

export const useAppStore = defineStore("app", () : IAppStore => {
    const accordianTabIndex = ref(0);
    
    return {
        accordianTabIndex
    }
});