import Header from "@/components/layout/Header";
import NewsForm from "@/components/NewsForm";

export default async function CreatePage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;

  return (
    <>
      <Header />
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f7fc', minHeight: '100vh' }}>
        <div className="container">
          <div className="mb-3">
            <h4 className="mb-0 text-start">Thêm mới bản ghi</h4>
          </div>

          {/* Truyền collection vào form */}
          <NewsForm collection={collection} />
        </div>
      </div>
    </>
  );
}
