<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useCredentialStore } from '../stores/CredentialStore';
import { useClipboardStore } from '../stores/ClipboardStore';
import { DateTime } from "luxon";
import { storeToRefs } from 'pinia';

const store = useCredentialStore();

const { credentials } = storeToRefs(store);

const clipboardStore = useClipboardStore();

async function copyToClipboard(text:string) {
    return await clipboardStore.copyText(text);
}

function formateDate(value:Date) {
    return DateTime.fromISO(value.toISOString()).toFormat("dd MMM yyyy HH:mm");
}
</script>
<template>
<DataTable :value="credentials">
    <Column field="id" header="ID"></Column>
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