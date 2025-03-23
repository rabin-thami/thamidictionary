import { ApiResponseType } from "@/types/ApiResponseType";

// Factory function to create the response message
export const createResponseMessage = (
  message: string,
  status: number, // HTTP status code
  responseCode: string, // Custom response code like 'LOGIN_SUCCESS'
  data: any = null // Optional additional data
): ApiResponseType => {
  const success =
    (status >= 200 && status < 300) || (status >= 300 && status < 400); // Treat 3xx as success too

  return {
    success, // Dynamically set based on status code (success for 2xx & 3xx)
    message,
    status,
    responseCode,
    data,
  };
};
