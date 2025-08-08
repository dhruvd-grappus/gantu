# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native application called "Gantu" built with:
- React Native 0.79.5 
- Expo SDK ~53.0.20
- TypeScript with strict mode enabled
- NativeWind (Tailwind CSS for React Native)
- Expo Router for file-based routing
- New Architecture enabled

## Development Commands

### Core Commands
- `npm start` or `npx expo start` - Start the development server
- `npx expo start --android` - Launch on Android emulator
- `npx expo start --ios` - Launch on iOS simulator  
- `npx expo start --web` - Launch in web browser
- `expo lint` - Run ESLint

### Project Management
- `npm run reset-project` - Move starter code to app-example/ and create blank app/ directory

## Architecture

### File Structure
- `app/` - Main application code using Expo Router file-based routing
  - `_layout.tsx` - Root layout component with Stack navigation
  - `index.tsx` - Home screen component
  - `global.css` - Global Tailwind CSS styles
- `assets/` - Static assets (images, fonts)
- `babel.config.js` - Babel configuration with NativeWind preset
- `metro.config.js` - Metro bundler configuration with NativeWind integration
- `tailwind.config.js` - Tailwind CSS configuration for NativeWind

### Styling System
- Uses NativeWind for Tailwind CSS classes in React Native components
- Global styles defined in `app/global.css`
- Babel and Metro configured to process NativeWind classes
- Path alias `@/*` maps to project root

### Key Technologies
- Expo Router: File-based routing system
- NativeWind: Tailwind CSS for React Native styling
- TypeScript: Strict type checking enabled
- ESLint: Using expo config with ignoring dist/*

## Configuration Notes
- New React Native Architecture enabled
- Typed routes experimental feature enabled
- Supports universal apps (iOS, Android, Web)
- Edge-to-edge display enabled for Android
- Adaptive icons configured for Android
- do not every run expo
- always use tailwind
- always use accurate sizes/constraints/fonts/colors/icons or images when implementing a figma design
- always check for fonts while implementing from figma, install new fonts if you want