import { NextResponse } from 'next/server';
import { directus, authenticateDirectus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

export async function GET(request: Request) {
  try {
    // Authenticate with Directus
    await authenticateDirectus();

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    const notifications = await directus.request(
      readItems('thong_bao', {
        fields: ['id', 'ten', 'noi_dung', 'ngay_dang', 'ngay_het_han', 'file_dinh_kem'],
        sort: ['-ngay_dang'],
        limit: limit ? parseInt(limit) : undefined,
        filter: {
          ngay_dang: { _nnull: true }
        }
      })
    );

    // Transform data
    const transformedNotifications = notifications.map((item: any) => ({
      ...item,
      title: item.ten,
      content: item.noi_dung,
      date: new Date(item.ngay_dang).toLocaleDateString('vi-VN'),
    }));

    return NextResponse.json(transformedNotifications);
  } catch (error) {
    console.error('Error fetching notifications from Directus:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}
