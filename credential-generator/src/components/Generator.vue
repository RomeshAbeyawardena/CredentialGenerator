<script setup lang="ts">
    import Button from 'primevue/button';
    import ButtonGroup from 'primevue/buttongroup';
    import InputText from 'primevue/inputtext';
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import { useConfigurationStore } from '../stores/ConfigurationStore';
    import { GenerationComponent } from '../enumerations/GenerationComponents';
    import { useGeneratorStore } from '../stores/GeneratorStore';
    import { useCredentialStore } from '../stores/CredentialStore';
    import { useClipboardStore } from '../stores/ClipboardStore';
    const generationStore = useGeneratorStore();
    const clipboardStore = useClipboardStore();

    const store = useConfigurationStore();
    const credentialStore = useCredentialStore();
    
    function generateUsername_click()
    {
        generateUsername(false);
    }

    function generateUsername(isForBoth:boolean) {         
        generationStore.username = store.generateComponent(GenerationComponent.Username);
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
        generationStore.password = store
            .generateComponent(GenerationComponent.Password);
        if(!isForBoth)
        {
            generationStore.disableAdd = false;
        }
    }

    async function copyToClipboard(component: GenerationComponent) {
        switch (component) {
            case GenerationComponent.Username:
                return await clipboardStore.copyText(generationStore.username);
            case GenerationComponent.Password:
                return await clipboardStore.copyText(generationStore.password);
            default:
                return await new Promise(() => {});
        }
    }

    function generateBoth() 
    {
        generateUsername(true);
        generatePassword(true);
        addCredential();
        generationStore.disableAdd = true;
    }

    function resetForm()
    {
        generationStore.username = "";
        generationStore.password = "";
        generationStore.disableAdd = true;
    }

    function addCredential() {
        credentialStore.addCredential({
            username: generationStore.username,
            password: generationStore.password,
        });

        generationStore.disableAdd = true;
    }

    function hasValue(component: GenerationComponent) {
        switch(component) {
            case GenerationComponent.Password:
                return generationStore.password.length > 0;
            case GenerationComponent.Username:
                return generationStore.username.length > 0;
        }
    }

</script>
<template>
    <form>
        <InputGroup>
            <InputGroupAddon>
                <i icon="pi pi-user" class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText  id="username"
                        :disabled="true"
                        v-model="generationStore.username" 
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
                        v-model="generationStore.password" 
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