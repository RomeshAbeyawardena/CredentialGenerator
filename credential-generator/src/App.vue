<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import CredentialList from './components/CredentialList.vue';
import Generator from './components/Generator.vue';
import GeneratorSettings from './components/GeneratorSettings.vue';
import Toast from 'primevue/toast';
import { useNotificationStore } from './stores/NotificationStore';
import { provide } from 'vue';
import { Services } from './services/Services';
import { INumberService, NumberService } from './services/NumberService';
import { IStringService, StringService } from './services/StringService';
import { IDateService, DateService } from './services/DateService';
import { useAppStore } from './stores/AppStore';
import { storeToRefs } from 'pinia';

const store = useNotificationStore();
const numberService = new NumberService()
const appStore = useAppStore();
const { accordianTabIndex } = storeToRefs(appStore);

function updateActiveIndex(e:number|undefined)
{
  if(e != undefined && e != accordianTabIndex.value)
  {
    accordianTabIndex.value = e;
  }
}

provide<INumberService>(Services.NumberService, numberService);
provide<IStringService>(Services.StringService, new StringService(numberService));
provide<IDateService>(Services.DateService, new DateService());
</script>

<template>
  <Toast :message="store.notification" :position="store.position" />
  <Accordion :activeIndex="accordianTabIndex" v-on:update:activeIndex="updateActiveIndex">
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
