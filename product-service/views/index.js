const defaultErrorMessage = 'Unknown error';

export function getSuccessView(data) {
  return JSON.stringify(data);
}

export function getErrorView(error) {
  const message = typeof error === 'string' ? error : (error?.message || defaultErrorMessage);
  return JSON.stringify({
    error: {
      message,
    },
  });
}
