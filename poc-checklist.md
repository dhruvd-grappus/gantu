# Expo + expo-router POC Checklist (AI-Readable)

## Project Setup

* **Single Expo project** targeting web, Android, iOS.
* **expo-router** for routing across all platforms.
* **Shared package** for common components, hooks, and logic.
* **Tailwind** via `nativewind` for consistent styling.

---

## Checklist with Implementation Details

### 1. Routing: Dynamic & Nested Routes ✅ COMPLETED

**Goal:** Ensure clean web URLs and correct deep link handling on mobile.

* **Implementation:**

  * ✅ Created nested route structure in `app/package/[...id].tsx` for clean URLs
  * ✅ Web: URLs render correctly without query parameters (e.g., `/package/1` instead of `?id=1`)
  * ✅ Mobile: Deep linking configured with catch-all routes for proper navigation
  * ✅ Implemented sharing functionality with platform-specific URL generation
* **Best Practice:** Use `Link` from `expo-router` for consistent navigation; configure linking in `app.json`.

### 2. Maps Integration ✅ COMPLETED

**Goal:** Smooth, accurate maps experience across platforms.

* **Implementation:**

  * ✅ Mobile: Implemented `react-native-maps` with Google Maps provider
  * ✅ Web: Created fallback UI with location grid for web compatibility
  * ✅ Platform detection via `Platform.OS` with appropriate fallbacks
  * ✅ Google Maps API key configuration via app.config.js
  * ✅ Custom markers with travel destinations and monotone blue styling
* **Best Practice:** Keep map state (markers, region) in a shared hook; debounce map updates to improve FPS.

### 3. Payments Integration

**Goal:** Functional and secure payment flow.

* **Implementation:**

  * Mobile: Integrate Stripe or Razorpay native SDK (via EAS build if needed). If blocked in managed workflow, use WebView fallback.
  * Web: Use Stripe or Razorpay JS SDK.
  * Test full 3DS authentication flow and verify app/route return.
* **Best Practice:** Wrap payment logic in a platform-agnostic hook, branching only where SDKs differ.

### 4. Search & Filters with RTK Query ✅ COMPLETED

**Goal:** Fast, cached, and offline-capable search.

* **Implementation:**

  * ✅ RTK Query setup with mock API for 32+ travel packages
  * ✅ Cache persistence with `redux-persist`:
    * ✅ Mobile: `AsyncStorage` integration
    * ✅ Web: localStorage fallback
  * ✅ Smart caching with different TTL for different data types:
    * Package details: 30min, Category data: 15min, Search: 5min
  * ✅ Network-aware caching with online/offline detection
  * ✅ Background cache refresh and prefetching strategies
* **Best Practice:** Use memoized selectors for filters to prevent unnecessary re-renders.

### 5. Push Notifications

**Goal:** Working push/local notifications.

* **Implementation:**

  * Mobile: `expo-notifications` for local notification testing; configure push if desired (requires EAS and push service setup).
  * Web: Register a service worker; use Notification API to display test notification.
* **Best Practice:** Abstract notification logic into a shared hook with platform-specific implementations.

### 6. Performance Optimization ✅ COMPLETED
List rendering performance

✅ Use FlatList with proper keyExtractor and performance optimizations

✅ Set initialNumToRender=2, maxToRenderPerBatch=3, windowSize=5

✅ Use React.memo for TripCard components with proper memoization

✅ Implement horizontal scrolling sections with performance-optimized nested FlatLists

✅ Add proper getItemLayout for consistent item sizing and smooth scrolling

### 7. Metrics to Record

**Goal:** Quantitative comparison for decision-making.

* **Collect:**

  * Mobile cold start time (seconds)
  * Web Lighthouse score
  * Map FPS
  * List scroll FPS
  * % shared code
  * Number of `Platform.OS` or platform-specific imports
  * SDK/library support gaps
* **Best Practice:** Store metrics in a single markdown or JSON file for later AI processing.

### 8. Caveats to Watch

* Native SDKs may require EAS builds/dev client.
* `react-native-maps` not ideal for web → always wrap with web map implementation.
* Dynamic links require OS-level configuration.
* RTK Query persistence behavior differs between AsyncStorage & IndexedDB.
* API behaviors (e.g., geolocation accuracy, permission prompts) differ between platforms.
