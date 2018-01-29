/**
 * Get a custom error message for the code.
 *
 * @param {Number} code - The http error code.
 * @returns {String} - Returns an error message for the code.
 */
export default function getErrorMessage(code) {
  const parsedCode = Number(code);

  switch (parsedCode) {
    // 400
    case 400: return 'Bad Request';
    case 401: return 'Not Authorized';
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    case 409: return 'Conflict';
    // 500
    case 500: return 'Internal Server Error';
    case 503: return 'Service Unavailable';
    default: return ' An unknown error occurred';
  }
}
