import { defineStore } from "pinia";
import { ICredential } from "../Credential/Credential";
import { ref, Ref } from "vue";
import { v4 } from "uuid";
import { faker } from "@faker-js/faker";
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

        if(credential.emailAddress == undefined)
        {
            credential.emailAddress =  faker.person.firstName().concat("@", faker.company.name().replace(" ", ""))
        }

        credentials.value.push(credential);
    }

    return {
        addCredential,
        credentials
    }
})
