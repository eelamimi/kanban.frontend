let onError = null;

export function setErrorHandler(callback) {
  onError = callback;
}

export function showError(message) {
  if (onError) {
    onError(message);
  }
}