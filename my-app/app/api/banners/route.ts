import { NextResponse } from 'next/server';
import bannersData from '@/data/banners.json';

export async function GET() {
  return NextResponse.json(bannersData);
}
