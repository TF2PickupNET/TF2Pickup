export default function copy(str) {
  const listener = (event) => {
    event.clipboardData.setData('text/plain', str);

    event.preventDefault();
  };

  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
}
