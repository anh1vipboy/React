"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Search } from "lucide-react";
import { translateStatus } from "@/lib/statusUtils";

const API_BASE = "http://10.10.20.77:8057";

interface FilterBarProps {
  collection: string;
}

export default function FilterBar({ collection }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  
  const [categories, setCategories] = useState<any[]>([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: Dynamic fetch filter options dựa trên collection
  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        setLoading(true);
        
        // Fetch categories từ chuyen_muc_tin (nếu collection có field chuyen_muc_tin)
        // Hoặc có thể detect từ schema của collection
        try {
          const catRes = await fetch(`${API_BASE}/items/chuyen_muc_tin`);
          if (catRes.ok) {
            const catData = await catRes.json();
            setCategories(catData.data || []);
          }
        } catch (err) {
          console.log("Không có chuyen_muc_tin collection");
        }

        // Fetch unique status values từ collection hiện tại
        try {
          const statusRes = await fetch(`${API_BASE}/items/${collection}?fields=status&limit=1000`);
          if (statusRes.ok) {
            const statusData = await statusRes.json();
            const uniqueStatuses = Array.from(
              new Set(statusData.data?.map((item: any) => item.status).filter(Boolean) || [])
            );
            setStatusOptions(uniqueStatuses as string[]);
          }
        } catch (err) {
          console.log("Không thể fetch status options");
        }
      } catch (error) {
        console.error("Lỗi khi fetch filter options:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilterOptions();
  }, [collection]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (category) params.set("category", category);
    if (status) params.set("status", status);
    
    router.push(`/admin/collections/${collection}?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchTerm("");
    setCategory("");
    setStatus("");
    router.push(`/admin/collections/${collection}`);
  };

  return (
    <div className="p-3 rounded mt-3 border" style={{ backgroundColor: '#f8f7fc' }}>
      <div className="row align-items-center g-3">
        <div className="col-12 col-md-6 col-lg-4 d-flex flex-column gap-1">
          <label htmlFor="search" className="text-black" style={{ fontSize: '12px', fontWeight: 'bold' }}>
            Tìm kiếm tổng hợp
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tiêu đề, tóm tắt..."
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        
        {categories.length > 0 && (
          <div className="col-12 col-md-6 col-lg-4 d-flex flex-column gap-1">
            <label htmlFor="category" className="text-black" style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Chuyên mục
            </label>
            <select
              className="form-select"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Chọn chuyên mục --</option>
              {categories.map((item) => (
                <option value={item.loai || item.id} key={item.id}>
                  {item.ten}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {statusOptions.length > 0 && (
          <div className="col-12 col-md-6 col-lg-4 d-flex flex-column gap-1">
            <label htmlFor="status" className="text-black" style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Trạng thái
            </label>
            <select
              className="form-select"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">-- Chọn trạng thái --</option>
              {statusOptions.map((statusValue) => (
                <option value={statusValue} key={statusValue}>
                  {translateStatus(statusValue)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <div className="d-flex gap-2 mt-3 align-items-center">
        <button
          type="button"
          className="btn btn-sm btn-primary d-flex align-items-center gap-1 border-0"
          onClick={handleSearch}
        >
          <Search size={18} />
          <p style={{ fontSize: '12px', margin: 0 }}>Tìm kiếm</p>
        </button>
        <button
          type="button"
          className="btn btn-sm border d-flex align-items-center gap-1"
          onClick={handleReset}
        >
          <RotateCcw size={18} />
          <p style={{ fontSize: '12px', color: '#8a8989ff', margin: 0 }}>Đặt lại</p>
        </button>
      </div>
    </div>
  );
}
