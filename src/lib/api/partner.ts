import { apiClient } from './axios';

export type BuildConnectionPayload = {
  fullName: string;
  companyName: string;
  email: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  contact: string;
  category: string;
  referredBy: string;
  companyWebsite: string;
  message: string;
};

type BuildConnectionResponse = {
  success: boolean;
  message: string;
};

export async function submitBuildConnection(
  payload: BuildConnectionPayload
): Promise<BuildConnectionResponse> {
  const response = await apiClient.post<BuildConnectionResponse>('/api/build-connections', payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data;
}