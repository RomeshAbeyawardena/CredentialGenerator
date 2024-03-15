<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import CredentialList from './components/CredentialList.vue';
import Generator from './components/Generator.vue';
import GeneratorSettings from './components/GeneratorSettings.vue';
import Toast from 'primevue/toast';
import { ref } from "vue";
import { useNotificationStore } from './stores/NotificationStore';
import { provide } from 'vue';
import { Services } from './services/Services';
import { INumberService, NumberService } from './services/NumberService';
import { IStringService, StringService } from './services/StringService';

const store = useNotificationStore();
const numberService = new NumberService()
const activeIndex = ref(0);

provide<INumberService>(Services.NumberService, numberService);
provide<IStringService>(Services.StringService, new StringService(numberService));
</script>

<template>
  <Toast :message="store.notification" :position="store.position" />
  <Accordion :activeIndex="activeIndex">
      <AccordionTab header="Generator">
        <Generator />
      </AccordionTab>
      <AccordionTab header="Generation List">
        <CredentialList />
      </AccordionTab>
        <AccordionTab header="Configuration Settings">
          <GeneratorSettings />
        </AccordionTab>
  </Accordion>
</template>
