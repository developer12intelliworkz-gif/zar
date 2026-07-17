import axios, { AxiosRequestConfig } from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://testintelliworkz.tech/Zar_backend';
export const IMAGE_BASE_PATH = process.env.NEXT_PUBLIC_IMAGE_BASE_PATH || API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 4000,
});

export class ApiError extends Error {
  status: number;
  response?: unknown;

  constructor(status: number, message: string, response?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

const normalizeAxiosError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status || 500;
    const data = error.response.data as Record<string, unknown> | undefined;
    const message = (data?.error as string) || error.message || 'API request failed';
    return new ApiError(status, message, error.response.data);
  }

  return new ApiError(500, (error instanceof Error ? error.message : 'API request failed'));
};

export async function apiGet<T>(path: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.get<T>(path, { params, ...config });
    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
}

export async function apiPost<T = unknown>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.post<T>(path, body, config);
    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
}
