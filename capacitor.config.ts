import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e7ac695835fa4fb89df0f95767fd71fa',
  appName: 'gramin-report-reach',
  webDir: 'dist',
  server: {
    url: 'https://e7ac6958-35fa-4fb8-9df0-f95767fd71fa.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;