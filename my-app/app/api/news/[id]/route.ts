import { NextResponse } from 'next/server';
import { directus, authenticateDirectus } from '@/lib/directus';
import { readItem } from '@directus/sdk';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://10.10.20.77:8057';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate with Directus
    await authenticateDirectus();

    const { id } = await params;
    console.log(' API: Fetching news with ID:', id);

    const newsItem = await directus.request(
      readItem('tin_tuc', id, {
        fields: ['id', 'ten', 'tom_tat', 'anh_dai_dien', 'date_created', 'slug'],
      })
    );

    console.log(' API: News item from Directus:', newsItem);

    // Transform data to include full image URL
    const transformedNews = {
      ...newsItem,
      title: newsItem.ten,
      excerpt: newsItem.tom_tat,
      image: newsItem.anh_dai_dien ? `${DIRECTUS_URL}/assets/${newsItem.anh_dai_dien}` : null,
      time: new Date(newsItem.date_created).toLocaleString('vi-VN'),
    };

    console.log(' API: Sending transformed news:', transformedNews);
    return NextResponse.json(transformedNews);
  } catch (error) {
    console.error('❌ API Error fetching news item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news item', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
