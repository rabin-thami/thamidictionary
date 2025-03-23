const isDevelopment =
  process.env.ENVIRONMENT === "development" || !process.env.ENVIRONMENT;

export function logError(message: string, error?: any) {
  if (isDevelopment) {
    // If error is an instance of Error, log the stack, otherwise log the error as is
    console.error(message);
    if (error instanceof Error) {
      console.error(error.stack); // Log the stack trace for errors
    } else {
      console.error(error || "Something went wrong"); // Log error or fallback message
    }
  }
}

export function logInfo(message: string) {
  if (isDevelopment) {
    console.log(message || "Information not provided"); // Default message if empty
  }
}
