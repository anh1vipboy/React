// lib/statusUtils.ts

/**
 * Translate status từ tiếng Anh sang tiếng Việt
 */
export function translateStatus(status: string | null | undefined): string {
  if (!status) return "—";
  
  const statusMap: Record<string, string> = {
    "published": "Đã xuất bản",
    "draft": "Bản nháp",
    "archived": "Đã lưu trữ",
    "pending": "Chờ duyệt",
    "rejected": "Đã từ chối",
    "active": "Hoạt động",
    "inactive": "Không hoạt động",
    "enabled": "Đã kích hoạt",
    "disabled": "Đã vô hiệu hóa",
  };

  return statusMap[status.toLowerCase()] || status;
}

/**
 * Get badge class cho status
 */
export function getStatusBadgeClass(status: string | null | undefined): string {
  if (!status) return "bg-secondary";
  
  const statusLower = status.toLowerCase();
  
  if (statusLower === "published" || statusLower === "active" || statusLower === "enabled") {
    return "bg-success";
  }
  if (statusLower === "draft" || statusLower === "pending") {
    return "bg-warning";
  }
  if (statusLower === "archived" || statusLower === "inactive" || statusLower === "disabled") {
    return "bg-secondary";
  }
  if (statusLower === "rejected") {
    return "bg-danger";
  }
  
  return "bg-secondary";
}
