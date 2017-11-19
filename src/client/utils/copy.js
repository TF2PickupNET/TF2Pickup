/**
 * Copy a string to the clipboard.
 *
 * @param {String} str - The string to copy.
 */
export default function copy(str) {
  /**
   * The event listener for the copy event to set the clipboard text.
   *
   * @param {Object} event - The event object.
   */
  const listener = (event) => {
    event.clipboardData.setData('text/plain', str);

    event.preventDefault();
  };

  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
}
