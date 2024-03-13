import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'

createApp(App)
    .use(PrimeVue, { ripple: true })
    .use(createPinia())
    .mount('#app');

import "primevue/resources/themes/aura-dark-green/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";