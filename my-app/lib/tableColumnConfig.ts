// lib/tableColumnConfig.ts
import { ReactNode } from "react";

export type ColumnConfig = {
  field: string;
  label?: string;           // override tên cột (nếu không dùng translation của Directus)
  render?: (value: any, item: any) => ReactNode;  // tùy chỉnh cách hiển thị
};

export type CollectionColumnConfig = {
  [collection: string]: ColumnConfig[];
};

export const collectionColumns: CollectionColumnConfig = {
  // ── tin_tuc ───────────────────────────────────────
  tin_tuc: [
    { field: 'ten', label: 'Tiêu đề' },
    { field: 'ngay_xuat_ban', label: 'Ngày xuất bản' },
    {
      field: 'status',
      label: 'Trạng thái',
      // Render sẽ được xử lý trong DataTable để tránh lỗi import component trong config
    },
  ],

  // ── binh_luan ─────────────────────────────────────
  binh_luan: [
    { field: "ho_ten", label: "Họ tên" },
    { field: "noi_dung", label: "Nội dung" },
    { field: "email", label: "Email" },
  ],

  // ── thong_bao ─────────────────────────────────────
  thong_bao: [
    { field: "ten", label: "Tiêu đề" },
    { field: "ngay_dang", label: "Ngày đăng" },
    { field: "ngay_het_han", label: "Hết hạn" },
  ],

  bai_viet: [
    { field: "ten", label: "Tiêu đề" },
  ],

  // ── Thêm collection mới rất dễ ────────────────────
  // vi_du: [
  //   { field: "title" },
  //   { field: "created_at", label: "Ngày tạo" },
  //   { field: "views", label: "Lượt xem" },
  // ],
};

// Nếu không có config cho collection → fallback lấy tất cả field (trừ EXCLUDE_FIELDS)
export const EXCLUDE_FIELDS = ["id", "user_created", "date_updated", /* ... */];
