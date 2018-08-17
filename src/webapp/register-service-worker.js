// @flow

export default async function registerServiceWorker() {
  try {
    if (navigator && navigator.serviceWorker && window.location.hostname !== 'localhost') {
      const worker = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });

      // eslint-disable-next-line no-console
      console.log('Service Worker registered successfully');

      worker.onupdatefound = async () => {
        // eslint-disable-next-line no-console
        console.log('Update found for service worker');

        await worker.update();

        const installingWorker = worker.installing;

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'activated') {
            window.location.reload(true);
          }
        };
      };
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Service Worker registration failed:', error);
  }
}
