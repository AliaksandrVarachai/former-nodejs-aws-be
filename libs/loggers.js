import getErrorMessage from './get-error-message';

export const logSuccess = (event, context) => {
  console.log(`${context.functionName}@${context.functionVersion} SUCCESS
EVENT:
${JSON.stringify(event, null, 4)}`
  );
};

export const logError = (event, context, error) => {
  const errorMessage = getErrorMessage(error);
  console.error(`${context.functionName}@${context.functionVersion} ERROR_MESSAGE: ${errorMessage}
EVENT:
${JSON.stringify(event, null, 4)}`
  );
}
