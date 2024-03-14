<script setup lang="ts">
    import Button from 'primevue/button';
    import ButtonGroup from 'primevue/buttongroup';
    import InputText from 'primevue/inputtext';
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import { ref } from "vue";
    import { useConfigurationStore } from '../stores/ConfigurationStore';
    import { GenerationComponent } from '../enumerations/GenerationComponents';
    import { StringService } from '../services/StringService';
    import { NumberService } from '../services/NumberService';
    import { useNotificationStore } from '../stores/NotificationStore';

    const username = ref("");
    const password = ref("");
    const store = useConfigurationStore();
    const numberService = new NumberService();
    const stringService = new StringService(numberService);
    
    function generateUsername() {
        const userSettings = store.user;
        username.value = stringService
            .generateString(store.user.length, store.user.type, {
                mustStartWithAlphaNumeric: userSettings.mustStartWithAlphaNumeric,
                mustHaveAtLeastOneNumber: false,
                mustHaveAtLeastOneSymbol: false
            });
    }

    function generatePassword() {
        const passwordSettings = store.password;
        password.value = stringService
            .generateString(store.password.length, store.password.type, {
                mustStartWithAlphaNumeric: false,
                mustHaveAtLeastOneNumber: passwordSettings.mustHaveAtLeastOneNumber,
                mustHaveAtLeastOneSymbol: passwordSettings.mustHaveAtLeastOneSymbol
            });
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
        generateUsername();
        generatePassword();
    }

</script>
<template>
    <form>
        <InputGroup>
            <InputGroupAddon>
                <i icon="pi pi-copy" class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText v-model="username" placeholder="Username" />
            <Button aria-label="Copy" 
                    icon="pi pi-copy"
                    severity="info"
                    @click="copyToClipboard(GenerationComponent.Username)" />
            <Button aria-label="Generate" 
                    icon="pi pi-refresh" 
                    @click="generateUsername" />
        </InputGroup>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText v-model="password" placeholder="Password" />
            <Button aria-label="Copy" 
                    icon="pi pi-copy"
                    severity="info"
                    @click="copyToClipboard(GenerationComponent.Password)" />
            <Button aria-label="Generate" 
                    icon="pi pi-refresh" 
                    @click="generatePassword" />
        </InputGroup>
        <ButtonGroup>
            <Button icon="pi pi-refresh" 
                    label="Generate" 
                    @click="generateBoth" />
            <Button severity="danger" label="Reset form" />
        </ButtonGroup>
    </form>
</template>
<style scoped>
    span.p-button-group {
        display:block;
        text-align: center;
        width:100%;
    }
    div.p-inputgroup {
        margin-bottom: 0.5rem;
    }
</style>