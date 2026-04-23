import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.rosenlin.platingtraining',
  appName: '基礎電鍍教育訓練',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
  },
  android: {
    allowMixedContent: false,
  },
}

export default config
