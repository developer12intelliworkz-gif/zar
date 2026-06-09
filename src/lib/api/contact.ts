import { apiClient } from './axios';

export type ContactInquiryPayload = {
  fullName: string;
  companyName?: string;
  email: string;
  contactNumber: string;
  inquiryType: string;
  message: string;
};

type ContactInquiryResponse = {
  success: boolean;
  message: string;
};

export async function submitContactInquiry(payload: ContactInquiryPayload): Promise<ContactInquiryResponse> {
  const response = await apiClient.post<ContactInquiryResponse>('/api/contact-inquiry', payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data;
}
