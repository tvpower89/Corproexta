import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});

export default {
  data() {
    return {
      // Your component data here
    };
  },
  methods: {
    // Your component methods here

    // Example method for scanning QR code
    scanQRCode() {
      BarcodeScanner.scan().then(
          (barcodeData) => {
            // Handle successful scan
            console.log('Barcode data', barcodeData);
            // Process the scanned data as needed
          },
          (err) => {
            // Handle errors
            console.error('Error while scanning QR code', err);
          }
      );
    },
  },
};



