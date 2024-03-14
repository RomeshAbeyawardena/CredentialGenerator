import { defineStore } from "pinia";
import { ICredential } from "../credential";
import { ref, Ref } from "vue";
import { v4 } from "uuid";
export interface ICredentialStore {
    addCredential: (credential: ICredential) => void;
    credentials: Ref<ICredential[]>;
}

export const useCredentialStore = defineStore("credential", ():ICredentialStore => {
    const credentials = ref(new Array<ICredential>);

    function addCredential(credential: ICredential)
    {
        if(credential.id == undefined)
        {
            credential.id = v4();
        }

        if(credential.created == undefined)
        {
            credential.created = new Date();
        }
        credentials.value.push(credential);
    }

    return {
        addCredential,
        credentials
    }
})
