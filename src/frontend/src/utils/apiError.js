export function getApiErrorMessage(error, fallbackMessage) {
  const responseMessage = error.response?.data?.message;

  if (responseMessage) {
    return responseMessage;
  }

  const validationErrors = error.response?.data?.errors;

  if (validationErrors) {
    const firstErrorKey = Object.keys(validationErrors)[0];
    const firstError = validationErrors[firstErrorKey];

    if (Array.isArray(firstError) && firstError.length > 0) {
      return firstError[0];
    }
  }

  return fallbackMessage;
}
