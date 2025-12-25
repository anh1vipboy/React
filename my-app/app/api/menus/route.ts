import { NextResponse } from 'next/server';
import { directus, authenticateDirectus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

export async function GET() {
  try {
    // Authenticate with Directus
    await authenticateDirectus();

    const menus = await directus.request(
      readItems('main_menus', {
        fields: ['*'],
        sort: ['sort'], // Sort by position
        filter: {
          status: {
            _eq: 'published'
          }
        }
      })
    );

    return NextResponse.json(menus);
  } catch (error) {
    console.error('Error fetching menus from Directus:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menus' },
      { status: 500 }
    );
  }
}
