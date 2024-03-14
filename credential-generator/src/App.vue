<script setup lang="ts">
import Generator from './components/Generator.vue';
import GeneratorSettings from './components/GeneratorSettings.vue';
import Toast from 'primevue/toast';
import { useNotificationStore } from './stores/NotificationStore';

const store = useNotificationStore();
</script>

<template>
  <Toast :message="store.notification" :position="store.position" />
  <GeneratorSettings />
  <Generator />
</template>
