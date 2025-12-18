import { NextResponse } from 'next/server';
import notificationsData from '@/data/notifications.json';

export async function GET() {
  return NextResponse.json(notificationsData);
}
