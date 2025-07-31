import { CircleCheck, TriangleAlert } from "lucide-react";

interface messageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: messageProps) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <TriangleAlert className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};

export const SuccessMessage = ({ message }: messageProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CircleCheck className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};
