export default async function registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      window.addEventListener('load', async () => {
        try {
          await navigator.serviceWorker.register('/service-worker.js');
        } catch (error) {
          console.warn('Service Worker registration failed:', error);
        }
      });
    }
}
