import getErrorMessage from '../../shared-libs/lib/get-error-message';

export function getSuccessView(data) {
  return JSON.stringify(data);
}

export function getErrorView(error) {
  return JSON.stringify({
    error: {
      message: getErrorMessage(error),
    },
  });
}
