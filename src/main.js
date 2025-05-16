import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueApexcharts from 'vue3-apexcharts'

loadFonts()

const app = createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueApexcharts)
  .component('apexchart', VueApexcharts);

app.mount('#app');