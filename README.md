# Introduction

This React Native project demonstrates how you can implement a Luciditi Digital Id process within a React Native WebView. This project assumes you are familiar with building React Native applications.

The demo makes use of [react-native-webview](https://github.com/react-native-webview/react-native-webview).

## Step 1: Luciditi pre-requisites

The demo application has already been configured with the necessary permissions to run on Android and iOS. However, when you integrate this example into your own application, you will need to ensure that you have the following permissions set:

### Android - `AndroidManifest.xml`

```xml
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />
```

### iOS - `info.plist`

```xml
	<key>NSCameraUsageDescription</key>
	<string>$(PRODUCT_NAME) needs access to your camera to take photos to verify your identity.</string>
```

## Step 2: Running the demo

Before you can run the demo you will need to setup the WebView with a url that can launch the Luciditi verification process.

1. Open `App.tsx` in your text editor of choice.
2. Update `sdkApiUrl` with the url for the correct luciditi environment. For example, if you are using the testing/sandbox environment, you would use `https://sdk-uat3.luciditi-api.net`. If you are using the production environment, you would use `https://sdk-live3.luciditi-api.net`.
3. Update `startupToken` with a valid startup token - a startup token is a unique token that identifies an individual user journey. You would typically generate a startup token when you create the initial Luciditi signup code on your backend and pass it to your frontend.

## Step 3: Run the demo! :tada:

You can now run the demo on your device or emulator. If possible, we recommend using a physical device as the camera may be used during the demo.

# Learn More

To learn more about Luciditi, take a look at the following resources:

- [Luciditi Developer](https://luciditi.co.uk/developer) - an **overview** of Luciditi developer options.
- [Luciditi JS SDK](https://www.npmjs.com/package/@arissian/luciditi-sdk) - NPM package for Luciditi's JavaScript SDK.
- [Luciditi](https://luciditi.co.uk) - learn more about Luciditi.
