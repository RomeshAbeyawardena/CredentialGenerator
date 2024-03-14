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
    <Column field="username" header="User name"></Column>
    <Column field="password" header="Password"></Column>
    <Column field="created" header="Created">
        <template #body="slotProps">
            {{ formateDate(slotProps.data.created) }}
        </template>
    </Column>
</DataTable>
</template>