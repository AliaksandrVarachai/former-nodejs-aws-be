export function getSuccessView(data) {
  return JSON.stringify(data);
}

export function getErrorView(message) {
  return JSON.stringify({
    error: {
      message,
    },
  });
}
