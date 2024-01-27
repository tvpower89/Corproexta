<template>
  <ion-app>
    <ion-router-outlet />
    <MyComponent />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import MyComponent from './components/MyComponent.vue';

export default defineComponent({
  components: {
    MyComponent,
  },
});
</script>