import { configureStore } from '@reduxjs/toolkit';
import { packagesApi } from './packagesApi';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Configure persistence for cross-platform caching
const persistConfig = {
  key: 'root',
  storage: Platform.OS === 'web' 
    ? require('redux-persist/lib/storage').default // localStorage for web
    : AsyncStorage, // AsyncStorage for mobile
  whitelist: [packagesApi.reducerPath], // Only persist API cache
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, packagesApi.reducer);

export const store = configureStore({
  reducer: {
    [packagesApi.reducerPath]: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: {
        ignoredPaths: [`${packagesApi.reducerPath}.queries`],
      },
    }).concat(packagesApi.middleware),
  devTools: __DEV__,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;