import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shoppin.app',
  appName: 'shoppin',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    cleartext: true,
    hostname: '192.168.188.199',
    url: 'http://192.168.188.199:3000'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;
