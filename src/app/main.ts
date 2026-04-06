import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@/assets/css/app.css';
import '@/assets/css/tw.css';
import 'vue-sonner/style.css';

// Initialize API client (sets up axios interceptors for auth tokens)
import './client/api';

import App from './App.vue';
import router from './router';

import '@fontsource/roboto';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');
