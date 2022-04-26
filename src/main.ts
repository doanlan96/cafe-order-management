import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import store from './store';

import { IonicVue } from '@ionic/vue';
import  VueHtmlToPaper from './plugins/VueHtmlToPaper';
import  VueHtmlToPaperr from './plugins/VueHtmlToPaper2';

import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

axios.defaults.baseURL='http://localhost:8080/api/v1';

const app = createApp(App)
  .use(VueHtmlToPaper)
  .use(VueHtmlToPaperr)
  .use(VCalendar, {})
  .use(IonicVue)
  .use(store)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});