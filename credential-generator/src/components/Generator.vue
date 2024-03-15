<script setup lang="ts">
    import Button from 'primevue/button';
    import ButtonGroup from 'primevue/buttongroup';
    import Checkbox from 'primevue/checkbox';
    import InputText from 'primevue/inputtext';
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import { useConfigurationStore } from '../stores/ConfigurationStore';
    import { GenerationComponent } from '../enumerations/GenerationComponents';
    import { useGeneratorStore } from '../stores/GeneratorStore';
    import { useCredentialStore } from '../stores/CredentialStore';
    import { useClipboardStore } from '../stores/ClipboardStore';
    import { storeToRefs } from 'pinia';

    const generationStore = useGeneratorStore();

    const { commitToTable, emailAddress, disableAdd, username, password } = storeToRefs(generationStore);

    const clipboardStore = useClipboardStore();

    const store = useConfigurationStore();
    const credentialStore = useCredentialStore();
    
    function generateUsername_click()
    {
        generateUsername(false);
    }

    function generateEmailAddress()
    {
        emailAddress.value = credentialStore.generateEmail();
    }

    function generateUsername(isForBoth:boolean) {         
        username.value = store
            .generateComponent(GenerationComponent.Username);
        if(!isForBoth)
        {
            generationStore.disableAdd = false;
        }
    }
    function generatePassword_click()
    {
        generatePassword(false);
    }
    function generatePassword(isForBoth:boolean) {
        password.value = store
            .generateComponent(GenerationComponent.Password);
        if(!isForBoth)
        {
            disableAdd.value = false;
        }
    }

    async function copyToClipboard(component: GenerationComponent) {
        switch (component) {
            case GenerationComponent.Email:
            return await clipboardStore.copyText(emailAddress.value);
            case GenerationComponent.Username:
                return await clipboardStore.copyText(username.value);
            case GenerationComponent.Password:
                return await clipboardStore.copyText(password.value);
            default:
                return await new Promise(() => {});
        }
    }

    function generateBoth() 
    {
        generateEmailAddress();
        generateUsername(true);
        generatePassword(true);
        if(commitToTable.value)
        {
            addCredential();
            disableAdd.value = true;
        }
    }

    function resetForm()
    {
        emailAddress.value = "";
        username.value = "";
        password.value = "";
        disableAdd.value = true;
    }

    function addCredential() {
        credentialStore.addCredential({
            emailAddress: emailAddress.value,
            username: username.value,
            password: password.value,
        });

        disableAdd.value = true;
    }

    function hasValue(component: GenerationComponent) {
        switch(component) {
            case GenerationComponent.Email:
                return emailAddress.value.length > 0;
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
                <i icon="pi pi-envelope" class="pi pi-envelope"></i>
            </InputGroupAddon>
            <InputText  id="emailAddress"
                        :disabled="true"
                        v-model="emailAddress" 
                        placeholder="Email Address" />
            <Button aria-label="Copy" 
                    :disabled="!hasValue(GenerationComponent.Email)"
                    icon="pi pi-copy"
                    severity="info"
                    @click="copyToClipboard(GenerationComponent.Email)" />
            <Button aria-label="Generate" 
                    icon="pi pi-refresh" 
                    @click="generateEmailAddress" />
        </InputGroup>
        <InputGroup>
            <InputGroupAddon>
                <i icon="pi pi-user" class="pi pi-user"></i>
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
        <div class="mt-2 mb-2">
            <Checkbox   class="mr-1" 
                        :binary="true"
                        v-model="commitToTable"
                        input-id="commitToTable"  />
            <label for="commitToTable">Commit to table</label>
        </div>
        <ButtonGroup>
            <Button icon="pi pi-refresh" 
                    label="Generate" 
                    @click="generateBoth" />
            <Button :disabled="generationStore.addDisabled"
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
</style>../services/ClipboardStore