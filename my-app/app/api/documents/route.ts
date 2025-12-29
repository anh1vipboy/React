import { NextResponse } from 'next/server';
import { directus, authenticateDirectus } from '@/lib/directus';
import { readItems } from '@directus/sdk';

export async function GET(request: Request) {
  try {
  
    await authenticateDirectus();

  
    const { searchParams } = new URL(request.url);
    const coQuanBanHanh = searchParams.get('co_quan_ban_hanh');
    const limit = searchParams.get('limit');

    const filter: any = {};

   
    if (coQuanBanHanh) {
      filter.co_quan_ban_hanh = { _eq: parseInt(coQuanBanHanh) };
    }

    const documents = await directus.request(
      readItems('van_ban_phap_luat', {
        fields: ['id', 'so_ky_hieu', 'trich_yeu', 'ngay_ban_hanh', 'ngay_hieu_luc', 'file_dinh_kem'],
        sort: ['-ngay_ban_hanh'],
        limit: limit ? parseInt(limit) : undefined,
        filter: Object.keys(filter).length > 0 ? filter : undefined,
      })
    );


    const transformedDocuments = documents.map((item: any) => ({
      ...item,
      code: item.so_ky_hieu,
      summary: item.trich_yeu,
      date: new Date(item.ngay_ban_hanh).toLocaleDateString('vi-VN'),
      effectiveDate: item.ngay_hieu_luc ? new Date(item.ngay_hieu_luc).toLocaleDateString('vi-VN') : null,
    }));

    return NextResponse.json(transformedDocuments);
  } catch (error) {
    console.error('[documents API]', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}
