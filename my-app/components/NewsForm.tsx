"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import formConfig from "@/config/config.json";
import { renderFormField } from "@/utils/DynamicForm";

const API_BASE = "http://10.10.20.77:8057";

interface NewsFormProps {
  collection: string;
  initialData?: any;
  isEdit?: boolean;
}

export default function NewsForm({ collection, initialData, isEdit = false }: NewsFormProps) {
  const router = useRouter();
  const [fields, setFields] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>(initialData || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFields() {
      try {
        setLoading(true);
        // ✅ FIX: Dùng fields/${collection} thay vì hardcode fields/tin_tuc
        const res = await fetch(`${API_BASE}/fields/${collection}`);
        const json = await res.json();

        if (!json.data || !Array.isArray(json.data)) {
          console.error("API fields lỗi:", json);
          return;
        }

        const allowedFields = formConfig[collection as keyof typeof formConfig];
        
        // Nếu có config cho collection này, filter theo config
        // Nếu không có config, lấy tất cả fields (trừ các field hệ thống)
        const filtered = allowedFields
          ? json.data.filter((f: any) => allowedFields.includes(f.field))
          : json.data.filter((f: any) => 
              !f.field.startsWith("directus_") && 
              f.field !== "id" && 
              f.field !== "user_created" && 
              f.field !== "user_updated"
            );

        setFields(filtered);
      } catch (error) {
        console.error("Lỗi khi fetch fields:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFields();
  }, [collection]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = isEdit && initialData?.id
        ? `${API_BASE}/items/${collection}/${initialData.id}`
        : `${API_BASE}/items/${collection}`;

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(isEdit ? "Cập nhật thành công!" : "Tạo mới thành công!");
        router.push(`/admin/collections/${collection}`);
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Lỗi: ${errorData.errors?.[0]?.message || "Lỗi không xác định"}`);
      }
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      alert("Đã xảy ra lỗi kết nối đến máy chủ.");
    }
  };

  if (loading) {
    return (
      <div className="card p-4">
        <div className="text-center text-muted">Đang tải form...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      {fields.map((field) =>
        renderFormField(field, formData[field.field], handleChange)
      )}

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-primary" type="submit">
          {isEdit ? "Cập nhật" : "Lưu"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => router.back()}
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
