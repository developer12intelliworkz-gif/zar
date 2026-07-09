import axios from 'axios';
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

export type JewelFlowUserPayload = {
  user_name: string;
  email: string;
  mobile_no: string;
  company_name: string;
  country_code: string;
};

export async function createUserInJewelFlow(payload: JewelFlowUserPayload): Promise<any> {
  const response = await axios.post(
    '/zar/api/create-user-jewelflow',
    payload,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}

export type ProductInquiryPayload = {
  fullName: string;
  companyName?: string;
  email: string;
  contactNumber: string;
  products: string[];
  message: string;
};

export type ProductInquiryResponse = {
  success: boolean;
  message: string;
};

export async function submitProductInquiry(payload: ProductInquiryPayload): Promise<ProductInquiryResponse> {
  const response = await apiClient.post<ProductInquiryResponse>('/api/product-inquiry', payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
