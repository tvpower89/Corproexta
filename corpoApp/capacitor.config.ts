import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.corproexta.app',
  appName: 'corpoApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
