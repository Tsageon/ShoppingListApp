import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from '../src/redux/store';
import App from './App';
import { loadOfflineActionsOnStartup } from './redux/offlineSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

loadOfflineActionsOnStartup(store.dispatch);

window.addEventListener('online', () => {
  const offlineActions = JSON.parse(localStorage.getItem('offlineActions')) || [];

  offlineActions.forEach((action) => {
    store.dispatch(action);
  });

  localStorage.removeItem('offlineActions');
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();