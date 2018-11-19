// @flow

import { message } from 'antd';

import store from './store';
import { setHasUpdate } from './store/has-update/actions';

export default async function registerServiceWorker() {
  try {
    if (navigator && navigator.serviceWorker) {
      const worker = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });

      console.log('Service Worker registered successfully');

      worker.onupdatefound = async () => {
        try {
          await worker.update();

          const installingWorker = worker.installing;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'activated') {
              store.dispatch(setHasUpdate(true));
            }
          };
        } catch (error) {
          message.error(`Error while fetching update: ${error.message}`);
        }
      };
    }
  } catch (error) {
    message.error(`Couldn't register service worker: ${error.message}`);
    console.warn('Service Worker registration failed:', error);
  }
}
