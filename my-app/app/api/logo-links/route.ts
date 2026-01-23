import { NextResponse } from 'next/server';

const DIRECTUS_URL = 'http://10.10.20.77:8057';

export async function GET() {
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/logo_link?fields=id,ten,link,logo,mo_tab_moi,loai`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return NextResponse.jsson(
        { message: 'Failed to fetch from Directus' },
        { status: 500 }
      );
    }

    const json = await res.json();

    // Directus trả { data: [...] }
    return NextResponse.json(json.data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error },
      { status: 500 }
    );
  }
}
