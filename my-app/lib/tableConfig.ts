// lib/tableConfig.ts
import React from "react";

// Ưu tiên hiển thị các cột này đầu tiên (nếu collection có)
export const TABLE_FIELD_PRIORITY = [
  "ten",               // Tiêu đề
  "tieu_de",           // Một số collection dùng tên khác
  "noi_dung",
  "tom_tat",
  "ngay_xuat_ban",
  "ngay_dang",
  "status",
  "date_created",
  "date_updated",
] as const;

// Các field luôn loại bỏ (không hiển thị trong bảng)
export const EXCLUDE_FIELDS = [
  "id",
  "sort",
  "user_created",
  "user_updated",
  "date_created",      // chỉ hiển thị nếu muốn, nhưng thường ẩn
  "date_updated",
  "status",            // sẽ hiển thị riêng bằng badge
] as const;

// Map field type → cách hiển thị (có thể mở rộng sau)
export const FIELD_DISPLAY_MAP: Record<string, (value: any) => React.ReactNode> = {
  datetime: (value: string) => {
    if (!value) return "—";
    return new Date(value).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },
  boolean: (value: boolean) => (value ? "Có" : "Không"),
  // text/html → cắt ngắn + ...
  text: (value: string) => (value ? `${value.slice(0, 70)}...` : "—"),
  string: (value: string) => (value ? `${value.slice(0, 70)}...` : "—"),
  // default: hiển thị nguyên giá trị
  default: (value: any) => (value ?? "—"),
};
