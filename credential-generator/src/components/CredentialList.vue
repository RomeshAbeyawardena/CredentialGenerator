<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useCredentialStore } from '../stores/CredentialStore';
import { DateTime } from "luxon";

const store = useCredentialStore();

function formateDate(value:Date) {
    return DateTime.fromISO(value.toISOString()).toFormat("dd MMM yyyy HH:mm");
}
</script>
<template>
<DataTable :value="store.credentials">
    <Column field="id" header="ID"></Column>
    <Column field="username" header="User name">
        <template #body="slotProps">
            {{ slotProps.data.username }}
            <i icon="pi pi-copy" class="pi pi-copy"></i>
        </template>
    </Column>
    <Column field="password" header="Password">
        <template #body="slotProps">
            {{ slotProps.data.password }}
            <i icon="pi pi-copy" class="pi pi-copy"></i>
        </template>
    </Column>
    <Column field="created" header="Created">
        <template #body="slotProps">
            {{ formateDate(slotProps.data.created) }}
        </template>
    </Column>
</DataTable>
</template>