export default function openWindowInNewTab(url) {
  const tab = window.open(url);

  tab.opener = null;

  return tab;
}
