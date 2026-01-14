import Header from "@/components/layout/Header";
import NewsForm from "@/components/NewsForm";

async function getDetail(collection: string, id: string) {
  const res = await fetch(`http://10.10.20.77:8057/items/${collection}/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const result = await res.json();
  return result.data;
}

export default async function EditPage({
  params
}: {
  params: Promise<{ collection: string, id: string }>
}) {
  const { collection, id } = await params;
  const initialData = await getDetail(collection, id);

  if (!initialData) return <div>Không tìm thấy bản ghi</div>;

  return (
    <>
      <Header />
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f7fc', minHeight: '100vh' }}>
        <div className="container">
          <h4 className="mb-3 text-start">Chỉnh sửa bản ghi</h4>
          {/* Truyền thêm initialData vào NewsForm */}
          <NewsForm collection={collection} initialData={initialData} isEdit={true} />
        </div>
      </div>
    </>
  );
}
