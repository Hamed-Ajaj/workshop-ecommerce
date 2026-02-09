import type { AxiosError } from "axios";

type ApiErrorResponse = {
  error?: string;
  message?: string;
};

export const getApiErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  const apiMessage =
    axiosError?.response?.data?.error ||
    axiosError?.response?.data?.message;

  if (apiMessage) return apiMessage;

  if (axiosError?.response?.status === 401) {
    return "Invalid email or password.";
  }

  return "Something went wrong. Please try again.";
};
