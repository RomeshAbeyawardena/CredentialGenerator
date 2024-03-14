<script setup lang="ts">
    import Button from 'primevue/button';
    import ButtonGroup from 'primevue/buttongroup';
    import InputText from 'primevue/inputtext';
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import { ref } from "vue";
    import { useConfigurationStore } from '../stores/ConfigurationStore';
    import { GenerationComponent } from '../enumerations/GenerationComponents';
    import { useNotificationStore } from '../stores/NotificationStore';
    import { useCredentialStore } from '../stores/CredentialStore';
    
    const disableAdd = ref(false);
    const username = ref("");
    const password = ref("");
    const store = useConfigurationStore();
    const credentialStore = useCredentialStore();
    
    function generateUsername_click()
    {
        generateUsername(false);
    }

    function generateUsername(isForBoth:boolean) {         
        username.value = store.generateComponent(GenerationComponent.Username);
        if(!isForBoth)
        {
            disableAdd.value = false;
        }
    }
    function generatePassword_click()
    {
        generatePassword(false);
    }
    function generatePassword(isForBoth:boolean) {
        password.value = store.generateComponent(GenerationComponent.Password);
        if(!isForBoth)
        {
            disableAdd.value = false;
        }
    }

    const notificationStore = useNotificationStore();
    async function copyToClipboard(component: GenerationComponent){
        let t:Promise<void>;
        switch (component) {
            case GenerationComponent.Username:
                t = navigator.clipboard.writeText(username.value);
                await t;
                notificationStore.displayMessage("Text copied!", "Text has been copied to the clipboard")
                return t;
            case GenerationComponent.Password:
                t =  navigator.clipboard.writeText(password.value);
                await t;
                notificationStore.displayMessage("Text copied!", "Text has been copied to the clipboard")
                return t;
            default:
                return await new Promise(() => {});
        }
    }

    function generateBoth() 
    {
        generateUsername(true);
        generatePassword(true);
        addCredential();
        disableAdd.value = true;
    }

    function resetForm()
    {
        username.value = "";
        password.value = "";
        disableAdd.value = false;
    }

    function addCredential() {
        credentialStore.addCredential({
            username: username.value,
            password: password.value,
        });

        disableAdd.value = true;
    }

    function hasValue(component: GenerationComponent) {
        switch(component) {
            case GenerationComponent.Password:
                return password.value.length > 0;
            case GenerationComponent.Username:
                return username.value.length > 0;
        }
    }

</script>
<template>
    <form>
        <InputGroup>
            <InputGroupAddon>
                <i icon="pi pi-copy" class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText  id="username"
                        :disabled="true"
                        v-model="username" 
                        placeholder="Username" />
            <Button aria-label="Copy" 
                    :disabled="!hasValue(GenerationComponent.Username)"
                    icon="pi pi-copy"
                    severity="info"
                    @click="copyToClipboard(GenerationComponent.Username)" />
            <Button aria-label="Generate" 
                    icon="pi pi-refresh" 
                    @click="generateUsername_click" />
        </InputGroup>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText  id="password"
                        :disabled="true"
                        v-model="password" 
                        placeholder="Password" />
            <Button aria-label="Copy"
                    :disabled="!hasValue(GenerationComponent.Password)"
                    icon="pi pi-copy"
                    severity="info"
                    @click="copyToClipboard(GenerationComponent.Password)" />
            <Button aria-label="Generate" 
                    icon="pi pi-refresh" 
                    @click="generatePassword_click" />
        </InputGroup>
        <ButtonGroup>
            <Button icon="pi pi-refresh" 
                    label="Generate" 
                    @click="generateBoth" />
            <Button :disabled="disableAdd"
                    severity="info" 
                    icon="pi pi-plus-circle"
                    label="Add"
                    @click="addCredential" />
            <Button severity="danger"
                    icon="pi pi-times"
                    label="Reset form"
                    @click="resetForm" />
        </ButtonGroup>
    </form>
</template>
<style>

    @media (max-width: 576px) {
        button.p-button
        {
            span.p-button-label
            {
                display: none;
            }
        }
    }
    span.p-button-group {
        display:block;
        text-align: center;
        width:100%;
    }
    div.p-inputgroup {
        margin-bottom: 0.5rem;
    }
</style>