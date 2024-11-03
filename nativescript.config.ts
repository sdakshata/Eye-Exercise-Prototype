import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.eyecarepro',
  appPath: 'src',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  ios: {
    SPMPackages: [
      {
        name: "GoogleSignIn",
        libs: ["GoogleSignIn"],
        repositoryURL: "https://github.com/google/GoogleSignIn-iOS"
      }
    ]
  }
} as NativeScriptConfig;