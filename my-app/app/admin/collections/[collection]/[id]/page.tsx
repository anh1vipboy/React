import Header from "@/components/layout/Header";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { translateStatus, getStatusBadgeClass } from "@/lib/statusUtils";

const API_BASE = "http://10.10.20.77:8057";

async function getDetail(collection: string, id: string) {
  const res = await fetch(`${API_BASE}/items/${collection}/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const result = await res.json();
  return result.data;
}

async function getFields(collection: string) {
  try {
    const res = await fetch(`${API_BASE}/fields/${collection}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

function getFieldLabel(field: any): string {
  const viVn = field.meta?.translations?.find(
    (t: any) => t.language === "vi-VN"
  );
  return viVn?.translation?.name || field.field.replace(/_/g, " ").toUpperCase();
}

function renderFieldValue(field: any, value: any): React.ReactNode {
  if (value === null || value === undefined) return <span className="text-muted">—</span>;

  const interfaceType = field.meta?.interface;
  const fieldType = field.type;

  // Handle image fields
  if (interfaceType === "file-image" || field.field.includes("anh") || field.field.includes("image")) {
    return (
      <img
        src={`${API_BASE}/assets/${value}`}
        className="img-fluid rounded"
        alt={field.field}
        style={{ maxWidth: "300px" }}
      />
    );
  }

  // Handle HTML/rich text
  if (interfaceType === "input-rich-text-html" || fieldType === "text") {
    return (
      <div
        className="news-content"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  // Handle datetime
  if (interfaceType === "datetime" || fieldType === "dateTime") {
    try {
      return new Date(value).toLocaleString("vi-VN");
    } catch {
      return value;
    }
  }

  // Handle boolean
  if (interfaceType === "boolean" || fieldType === "boolean") {
    return value ? "Có" : "Không";
  }

  // Handle status with badge
  if (field.field === "status") {
    return (
      <span className={`badge ${getStatusBadgeClass(value)}`}>
        {translateStatus(value)}
      </span>
    );
  }

  // Default: plain text
  return <span>{String(value)}</span>;
}

export default async function DetailPage({
  params
}: {
  params: Promise<{ collection: string, id: string }>
}) {
  const { collection, id } = await params;
  const [data, fields] = await Promise.all([
    getDetail(collection, id),
    getFields(collection),
  ]);

  if (!data) return notFound();

  // Lọc các field quan trọng để hiển thị
  // Ưu tiên: ten, tieu_de, noi_dung, tom_tat, status, ngay_xuat_ban, tac_gia, slug, anh_dai_dien
  const priorityFields = ["ten", "tieu_de", "noi_dung", "tom_tat", "status", "ngay_xuat_ban", "tac_gia", "slug", "anh_dai_dien"];
  const excludedFields = ["id", "user_created", "user_updated", "date_created", "date_updated", "sort"];

  const sortedFields = fields
    .filter((f: any) => !excludedFields.includes(f.field))
    .sort((a: any, b: any) => {
      const aIndex = priorityFields.indexOf(a.field);
      const bIndex = priorityFields.indexOf(b.field);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });

  // Tách fields thành 2 nhóm: chính (8 cột) và phụ (4 cột)
  const mainFields = sortedFields.slice(0, 8);
  const sidebarFields = sortedFields.slice(8);

  // Tìm field title để hiển thị làm heading
  const titleField = sortedFields.find((f: any) => 
    f.field === "ten" || f.field === "tieu_de" || f.field === "title"
  );
  const titleValue = titleField ? data[titleField.field] : "Chi tiết";

  return (
    <>
      <Header />
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f7fc', minHeight: '100vh' }}>
        <div className="container">
          {/* Thanh điều hướng nhanh */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <Link href={`/admin/collections/${collection}`} className="text-decoration-none text-muted small d-flex align-items-center gap-1">
                <ArrowLeft size={16} /> Quay lại danh sách
              </Link>
              <h4 className="mt-2 mb-0 text-start">{titleValue}</h4>
            </div>
            <Link href={`/admin/collections/${collection}/edit/${id}`} className="btn btn-primary btn-sm px-4" style={{ whiteSpace: 'nowrap' }}>
              Chỉnh sửa
            </Link>
          </div>

          <div className="row">
            <div className="col-md-8">
              {mainFields.map((field: any) => {
                const value = data[field.field];
                if (value === null || value === undefined) return null;

                const isContentField = field.field === "noi_dung" || field.meta?.interface === "input-rich-text-html";
                const isSummaryField = field.field === "tom_tat";

                if (isContentField) {
                  return (
                    <div key={field.field} className="card border-0 shadow-sm mb-4">
                      <div className="card-body p-4">
                        <h6 className="fw-bold mb-3">{getFieldLabel(field)}</h6>
                        <hr />
                        {renderFieldValue(field, value)}
                      </div>
                    </div>
                  );
                }

                if (isSummaryField) {
                  return (
                    <div key={field.field} className="card border-0 shadow-sm mb-4">
                      <div className="card-body p-4">
                        <h6 className="fw-bold mb-3">{getFieldLabel(field)}</h6>
                        <p className="text-muted">{value || "Không có tóm tắt"}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={field.field} className="card border-0 shadow-sm mb-3">
                    <div className="card-body p-3">
                      <label className="small text-muted d-block mb-1">{getFieldLabel(field)}</label>
                      <div>{renderFieldValue(field, value)}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cột phụ: Thông tin thêm */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3">THÔNG TIN CHUNG</h6>
                  {sidebarFields.map((field: any) => {
                    const value = data[field.field];
                    if (value === null || value === undefined) return null;

                    return (
                      <div key={field.field} className="mb-3">
                        <label className="small text-muted d-block mb-1">{getFieldLabel(field)}</label>
                        <div>{renderFieldValue(field, value)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
