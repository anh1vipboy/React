import FilterBar from "@/components/filter/FilterBar";
import Header from "@/components/layout/Header";
import DataTable from "@/components/table/DataTable";
import { FileInput, Plus, Sheet } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const fetchTitle = async (collection: string) => {
  const res = await fetch(
    `http://10.10.20.77:8057/collections/${collection}`,
    { cache: "no-store" }
  );

  const result = await res.json();
  return result.data?.meta.translations[0];
};

export default async function CollectionPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ collection: string }>, 
  searchParams: Promise<{ page?: string; search?: string; category?: string; status?: string }> 
}) {
  const { collection } = await params;
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const title = await fetchTitle(collection);
  
  return (
    <>
      <Header />
      <div className="px-3 py-2" style={{ backgroundColor: '#f8f7fc' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Sheet color="#296cf2" size={20} />
            <h4 style={{ fontSize: '18px', textAlign: 'left' }}>{title?.translation || collection}</h4>
          </div>
          <div className="d-flex align-items-center gap-3" style={{ fontSize: '12px' }}>
            <button className="btn btn-sm btn-primary d-flex align-items-center gap-1">
              <FileInput size={18} />
              <p style={{ fontSize: '12px' }}>Xuất Excel</p>
            </button>
            <Link href={`/admin/collections/${collection}/create`} className="btn btn-sm btn-primary d-flex align-items-center gap-1">
              <Plus size={18} />
              <p style={{ fontSize: '12px' }}>Tạo mới</p>
            </Link>
          </div>
        </div>
        <Suspense fallback={<div className="p-3">Đang tải filter...</div>}>
          <FilterBar collection={collection} />
        </Suspense>
      </div>
      <DataTable collection={collection} page={page} searchParams={resolvedSearchParams} />
    </>
  );
}
