import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axios.post(
      'https://prodone.jewelflow.pro/online_api/v3/integration/zar/createUser',
      body,
      {
        headers: {
          'X-API-Key': process.env.JEWELFLOW_API_KEY || '',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    console.error('Error in create-user-jewelflow proxy:', error?.response?.data || error.message);
    return NextResponse.json(
      {
        success: false,
        error: error?.response?.data || error.message,
      },
      { status: error?.response?.status || 500 }
    );
  }
}
