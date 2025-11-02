import { AxiosError } from "axios";
import { toast } from "sonner";

export function handleError(err: unknown, fallbackMessage = "Something went wrong") {
  let message = fallbackMessage;

  if (typeof err === "string") message = err;
  else if (err instanceof Error) message = err.message || fallbackMessage;

  const axiosErr = err as AxiosError<any>;
  if (axiosErr?.isAxiosError) {
    const data: any = axiosErr.response?.data;
    message = data?.message || data?.error || message;
    if (axiosErr.response?.status === 401) {
      // optionally handle auth expiry
    }
  }

  console.error("[Error]", err);
  toast.error(message);

  return message;
}
