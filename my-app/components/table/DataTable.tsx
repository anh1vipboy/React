// components/table/DataTable.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import TableClient from "./TableClient";
import StatusBadge from "@/components/StatusBadge";

import {
  collectionColumns,
  EXCLUDE_FIELDS,
  type ColumnConfig,
} from "@/lib/tableColumnConfig";

const PAGE_SIZE = 10;
const API_BASE = "http://10.10.20.77:8057";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

async function fetchData(
  collection: string, 
  page: number, 
  searchParams?: { search?: string; category?: string; status?: string }
) {
  const offset = (page - 1) * PAGE_SIZE;
  
  // Build filter query
  const filterParams: string[] = [];
  if (searchParams?.search) {
    // Search in common text fields
    filterParams.push(`_or[0][ten][_icontains]=${encodeURIComponent(searchParams.search)}`);
    filterParams.push(`_or[1][tom_tat][_icontains]=${encodeURIComponent(searchParams.search)}`);
    filterParams.push(`_or[2][noi_dung][_icontains]=${encodeURIComponent(searchParams.search)}`);
  }
  if (searchParams?.status) {
    filterParams.push(`filter[status][_eq]=${encodeURIComponent(searchParams.status)}`);
  }
  if (searchParams?.category) {
    filterParams.push(`filter[chuyen_muc_tin][loai][_eq]=${encodeURIComponent(searchParams.category)}`);
  }
  
  const filterQuery = filterParams.length > 0 ? `&${filterParams.join("&")}` : "";
  
  const res = await fetch(
    `${API_BASE}/items/${collection}?limit=${PAGE_SIZE}&offset=${offset}&meta=total_count&sort=-date_created${filterQuery}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN || ""}` },
    }
  );

  if (!res.ok) {
    console.error(`Fetch items failed: ${res.status} - ${collection}`);
    return { data: [], meta: { total_count: 0 } };
  }
  return res.json();
}

async function fetchFields(collection: string) {
  try {
    const res = await fetch(`${API_BASE}/fields/${collection}`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN || ""}` },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

function getDisplayName(field: any, config?: ColumnConfig): string {
  if (config?.label) return config.label;
  const translation = field.meta?.translation?.find((t: any) => t.language === "vi-VN")?.translation?.name;
  if (translation) return translation;
  return field.field.replace(/_/g, " ").toUpperCase();
}

export default async function DataTable({
  collection,
  page = 1,
  searchParams,
}: {
  collection: string;
  page?: number;
  searchParams?: { search?: string; category?: string; status?: string };
}) {
  const [itemsResult, allFields] = await Promise.all([
    fetchData(collection, page, searchParams),
    fetchFields(collection),
  ]);

  const data = itemsResult.data || [];
  const total = itemsResult.meta?.total_count || 0;
  const totalPage = Math.ceil(total / PAGE_SIZE);

  // Lấy config cho collection này
  const columnConfigs = collectionColumns[collection] || [];

  let visibleColumns: (ColumnConfig & { originalField?: any })[] = [];

  if (columnConfigs.length > 0) {
    // Có config → dùng config (ưu tiên)
    visibleColumns = columnConfigs.map((col) => ({
      ...col,
      originalField: allFields.find((f: any) => f.field === col.field),
    }));
  } else {
    // Không có config → fallback lấy fields từ Directus, loại trừ EXCLUDE
    visibleColumns = allFields
      .filter((f: any) => !EXCLUDE_FIELDS.includes(f.field))
      .map((f: any) => ({ field: f.field, originalField: f }));
  }

  if (visibleColumns.length === 0 && data.length > 0) {
    return (
      <div className="p-4 text-center text-muted border rounded">
        Không tải được schema fields (kiểm tra quyền/token Directus).
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom" style={{ backgroundColor: '#f8f7fc' }}>
        <p style={{ fontSize: '12px', color: '#8a8989ff' }}>
          Hiển thị {data.length} / {total} bản ghi
        </p>
        <nav>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <Link className="page-link" href={`?page=${page - 1}`}>
                <ChevronLeft size={16} />
              </Link>
            </li>
            {Array.from({ length: totalPage || 1 }).map((_, i) => (
              <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                <Link className="page-link" href={`?page=${i + 1}`}>
                  {i + 1}
                </Link>
              </li>
            ))}
            <li className={`page-item ${page >= totalPage ? "disabled" : ""}`}>
              <Link className="page-link" href={`?page=${page + 1}`}>
                <ChevronRight size={16} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="table-responsive">
        <table className="table table-hover w-100">
          <thead>
            <tr>
              {visibleColumns.map((col) => (
                <th key={col.field} className="text-uppercase small text-start">
                  {getDisplayName(col.originalField, col)}
                </th>
              ))}
              <th className="text-end">HÀNH ĐỘNG</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item: any) => (
              <tr key={item.id}>
                {visibleColumns.map((col) => {
                  const value = item[col.field];
                  // Cột tiêu đề (ten, tieu_de, title) căn trái, các cột khác cũng căn trái mặc định
                  const isTitleField = col.field === "ten" || col.field === "tieu_de" || col.field === "title";
                  if (col.render) {
                    return <td key={col.field} className={isTitleField ? "text-start" : "text-start"}>{col.render(value, item)}</td>;
                  }
                  // Auto-translate status field nếu không có render function
                  if (col.field === "status") {
                    return (
                      <td key={col.field} className="text-start">
                        <StatusBadge status={value} />
                      </td>
                    );
                  }
                  // fallback hiển thị mặc định (có thể cải tiến thêm FIELD_DISPLAY_MAP nếu cần)
                  return <td key={col.field} className="text-start">{value ?? "—"}</td>;
                })}

                <TableClient id={item.id} collection={collection} />
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={visibleColumns.length + 1} className="text-center py-4 text-muted">
                  Không có bản ghi nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
