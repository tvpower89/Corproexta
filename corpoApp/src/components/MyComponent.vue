<template>
  <div>
    <ion-button @click="scanQRCode()">Scan QR Code</ion-button>
    <ion-button @click="openCamera()">Open Camera</ion-button>
    <video ref="cameraPreview" autoplay></video>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Plugins } from '@capacitor/core';
import { CameraResultType } from '@capacitor/camera';

const { Camera } = Plugins;

export default defineComponent({
  methods: {
    async openCamera() {
      const cameraPreview = ref<HTMLVideoElement | null>(null);

      try {
        const { value } = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          quality: 90,
        });

        // Access the video element using $refs
        if (cameraPreview.value) {
          // Set the camera preview source
          (cameraPreview.value as HTMLVideoElement).src = value;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },

    scanQRCode() {
      BarcodeScanner.scan().then(
          (barcodeData) => {
            console.log('Barcode data', barcodeData);
            // Process the scanned data as needed
          },
          (err) => {
            console.error('Error while scanning QR code', err);
          }
      );
    },
  },
});
</script>
