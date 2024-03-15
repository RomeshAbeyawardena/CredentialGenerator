<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { inject, ref } from 'vue';
import { IDateService } from '../services/DateService';
import { useCredentialStore } from '../stores/CredentialStore';
import { useClipboardStore } from '../stores/ClipboardStore';
import { storeToRefs } from 'pinia';
import { Services } from '../services/Services';
import { ICredential } from '../Credential';

const store = useCredentialStore();

const { credentials } = storeToRefs(store);

const clipboardStore = useClipboardStore();

async function copyToClipboard(text:string) {
    return await clipboardStore.copyText(text);
}

const selectedItem = ref(new Array<ICredential>());

const dateService = inject<IDateService>(Services.DateService);
function formateDate(value:Date) {
    return dateService?.getDateTime(value).toFormat("dd MMM yyyy HH:mm");
}
</script>
<template>
<DataTable v-model:selection="selectedItem" :value="credentials">
    <Column selectionMode="multiple">
        
    </Column>
    <Column field="emailAddress" header="User name">
        <template #body="slotProps">
            {{ slotProps.data.emailAddress }}
            <a href="#" @click="copyToClipboard(slotProps.data.emailAddress)">
                <i  icon="pi pi-copy" 
                    class="pi pi-copy"></i>
            </a>
        </template>
    </Column>
    <Column field="username" header="User name">
        <template #body="slotProps">
            {{ slotProps.data.username }}
            <a href="#" @click="copyToClipboard(slotProps.data.username)">
                <i  icon="pi pi-copy" 
                    class="pi pi-copy"></i>
            </a>
        </template>
    </Column>
    <Column field="password" header="Password">
        <template #body="slotProps">
            {{ slotProps.data.password }}
            <a  href="#"
                @click="copyToClipboard(slotProps.data.password)">
                <i  icon="pi pi-copy" 
                    class="pi pi-copy"></i>
            </a>
        </template>
    </Column>
    <Column field="created" header="Created">
        <template #body="slotProps">
            {{ formateDate(slotProps.data.created) }}
        </template>
    </Column>
</DataTable>
</template>