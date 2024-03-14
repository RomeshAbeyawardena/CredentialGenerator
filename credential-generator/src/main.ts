import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import ToastService from 'primevue/toastservice';

createApp(App)
    .use(PrimeVue, { ripple: true })
    .use(createPinia())
    .use(ToastService)
    .mount('#app');

import "primevue/resources/themes/aura-dark-green/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";