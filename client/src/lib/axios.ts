import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

export const client = axios.create({
  baseURL: "http://localhost:4000/api",
});

client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
