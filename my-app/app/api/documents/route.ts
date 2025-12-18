import { NextResponse } from 'next/server';
import documentsData from '@/data/documents.json';

export async function GET() {
  return NextResponse.json(documentsData);
}
