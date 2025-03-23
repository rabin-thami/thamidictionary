export interface ApiResponseType {
  success: boolean;
  message: string;
  status: number;
  data?: any;
  responseCode?: string;
}
