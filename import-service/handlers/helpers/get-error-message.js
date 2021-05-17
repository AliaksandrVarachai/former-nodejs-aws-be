export const defaultErrorMessage = 'Unknown error';

export default (error) => typeof error === 'string' ? error : (error?.message || defaultErrorMessage);
