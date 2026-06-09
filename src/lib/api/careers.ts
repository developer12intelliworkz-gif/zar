import type { CareerPosition } from '@/types/domain';
import type { ApiResponse } from './client';
import { apiClient } from './axios';


type CareerApplyResult = {
  message: string;
  id?: number;
};

export type CareerApplicationPayload = {
  fullName: string;
  companyName?: string;
  role: string;
  workExperience: string;
  email: string;
  contactNumber: string;
  cvFile?: string;
};

export async function fetchCareerPositions(): Promise<CareerPosition[]> {
  const response = await apiClient.get<{ success?: boolean; items?: unknown[] }>('/api/careers/');
  const payload = response.data;

  if (!payload.success || !Array.isArray(payload.items)) {
    throw new Error((payload as { error?: string })?.error || 'Failed to fetch career positions');
  }

  const items = payload.items as Array<{
    id: number | string;
    position: string;
    experience: string;
    location: string;
    jobDescription: string;
  }>;

  return items.map((item) => ({
    id: item.id,
    title: item.position,
    slug: item.position
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-+|-+$/g, ''),
    location: item.location,
    experience: item.experience,
    description: item.jobDescription,
    isActive: true,
  }));
}

export async function submitCareerApplication(
  payload: CareerApplicationPayload | FormData
): Promise<CareerApplyResult> {
  const response = await apiClient.post<ApiResponse<CareerApplyResult> & { message?: string; id?: number }>(
    '/api/career-application',
    payload,
    {
      headers: payload instanceof FormData ? undefined : {
        'Content-Type': 'application/json',
      },
    }
  );

  const payloadResponse = response.data;

  if (!payloadResponse.success) {
    throw new Error(payloadResponse.error || payloadResponse.message || 'API request failed');
  }

  if (payloadResponse.data !== undefined) {
    return payloadResponse.data;
  }

  if (payloadResponse.message !== undefined) {
    return {
      message: payloadResponse.message,
      id: payloadResponse.id,
    };
  }

  throw new Error('API request failed');
}
