<script setup lang="ts">
import CredentialList from './components/CredentialList.vue';
import Generator from './components/Generator.vue';
import GeneratorSettings from './components/GeneratorSettings.vue';
import Toast from 'primevue/toast';
import { useNotificationStore } from './stores/NotificationStore';
import { provide } from 'vue';
import { Services } from './services/Services';
import { INumberService, NumberService } from './services/NumberService';
import { IStringService, StringService } from './services/StringService';
const store = useNotificationStore();
const numberService = new NumberService()
provide<INumberService>(Services.NumberService, numberService);
provide<IStringService>(Services.StringService, new StringService(numberService));
</script>

<template>
  <Toast :message="store.notification" :position="store.position" />
  <GeneratorSettings />
  <Generator />
  <CredentialList />
</template>
