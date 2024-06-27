import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';
import { createPinia } from 'pinia';

import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue';
import router from './router';

import './index.css';

const app = createApp(App);

app.use(ToastPlugin);
app.use(createPinia());
app.use(router);

app.mount('#app');
