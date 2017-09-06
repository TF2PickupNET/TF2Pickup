/**
 * Open a new safe tab with the provided url.
 *
 * @param {String} url - The url for the new tab.
 * @returns {Object} - Returns the windows instance.
 */
export default function openWindowInNewTab(url) {
  const tab = window.open(url);

  if (tab) {
    tab.opener = null;
  }

  return tab;
}
