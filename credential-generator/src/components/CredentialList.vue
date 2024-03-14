<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useCredentialStore } from '../stores/CredentialStore';

const store = useCredentialStore();
</script>
<template>
<DataTable :value="store.credentials">
    <Column field="id" header="ID"></Column>
    <Column field="username" header="User name"></Column>
    <Column field="password" header="Password"></Column>
    <Column field="created" header="Created"></Column>
</DataTable>
</template>