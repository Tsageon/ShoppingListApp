import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import offlineReducer from './offlineSlice';
import shoppingListReducer from './shoppinglistSlice';
import { offlineMiddleware } from '../Components/middle';

const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingList: shoppingListReducer,
    offline: offlineReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(offlineMiddleware),
});

export default store;
