export type StatusType = "success" | "error";
export interface StatusMessage {
  type: StatusType;
  message: string;
}
