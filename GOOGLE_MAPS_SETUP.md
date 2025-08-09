# Google Maps Setup Guide

## Step 1: Get Google Maps API Keys

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps SDK for Android**
   - **Maps SDK for iOS**
   - **Maps JavaScript API** (for web)

4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **API Key**
6. Create three API keys (one for each platform)

## Step 2: Restrict Your API Keys (Important for Security)

### Android Key:
- Click on the Android API key
- Under **Application restrictions**, select **Android apps**
- Add your package name: `com.yourcompany.Gantu`
- Add your SHA-1 certificate fingerprint

### iOS Key:
- Click on the iOS API key
- Under **Application restrictions**, select **iOS apps**
- Add your bundle identifier: `com.yourcompany.Gantu`

### Web Key:
- Click on the Web API key
- Under **Application restrictions**, select **HTTP referrers**
- Add your website URLs:
  - `http://localhost:*`
  - `https://yourdomain.com/*`

## Step 3: Add Keys to Your Project

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your actual API keys:
   ```
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_ANDROID=AIza...your_android_key
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_IOS=AIza...your_ios_key
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_WEB=AIza...your_web_key
   ```

## Step 4: Build Your App

Since Google Maps requires native configuration, you need to create a development build:

### Option A: Local Build
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure your project
eas build:configure

# Create a development build for Android
eas build --platform android --profile development

# Create a development build for iOS
eas build --platform ios --profile development
```

### Option B: Expo Prebuild (for local development)
```bash
# Generate native projects
npx expo prebuild

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios
```

## Step 5: Test Your Maps

After building with the API keys configured, the maps should display properly with:
- The monotone blue styling we configured
- Location markers
- Smooth performance

## Troubleshooting

- **Blank/Beige Map**: API key not configured correctly
- **"For development purposes only" watermark**: API key not enabled for billing
- **Map not loading**: Check that all required APIs are enabled in Google Cloud Console

## Important Notes

- **Never commit your actual API keys to version control**
- The `.env` file is gitignored for security
- For production, use environment variables in your CI/CD pipeline
- Consider implementing API key restrictions for security