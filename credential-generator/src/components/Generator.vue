<script setup lang="ts">
    import Button from 'primevue/button';
    import ButtonGroup from 'primevue/buttongroup';
    import InputText from 'primevue/inputtext';
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import { ref } from "vue";
    import { useConfigurationStore } from '../stores/ConfigurationStore';

    import { CharacterType } from '../enumerations/CharacterType';
    import { StringService } from '../services/StringService';
    import { NumberService } from '../services/NumberService';

    const username = ref("");
    const password = ref("");
    const store = useConfigurationStore();
    const stringService = new StringService(new NumberService());

    function generateUsername() {
        username.value = stringService
            .generateString(store.user.length, CharacterType.MixedNoSymbols);
    }

    function generatePassword() {
        password.value = stringService
            .generateString(store.password.length, CharacterType.Mixed);
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
            <Button aria-label="Copy" icon="pi pi-copy" />
            <Button aria-label="Generate" 
                    icon="pi pi-refresh" 
                    @click="generateUsername" />
        </InputGroup>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText v-model="password" placeholder="Password" />
            <Button aria-label="Copy" icon="pi pi-copy" />
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