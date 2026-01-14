// components/Sidebar.tsx
'use client'

import Image from "next/image";
import MenuItem from "../MenuItem";
import { ChartBar, ChevronDown, ChevronLeft, ChevronRight, FileText, House, LogOut, Newspaper, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useSidebar } from "./SidebarWrapper";

const API_BASE = "http://10.10.20.77:8057";

// Danh sách collection bạn muốn hiển thị trong nhóm "NỘI DUNG"
// Có thể di chuyển ra file config riêng sau này
const NEWS_COLLECTIONS = [
  { slug: "tin_tuc",     label: "Tin tức"     },
  { slug: "chuyen_de",   label: "Chuyên đề"   },
  { slug: "binh_luan",   label: "Bình luận"   },
  { slug: "thong_bao",   label: "Thông báo"   },
  { slug: "bai_viet",   label: "Bài viết"   },
  // thêm nếu cần: { slug: "su_kien", label: "Sự kiện" },
];

export default function Sidebar() {
  const [showSide, setShowSide] = useState(true);
  const [showNews, setShowNews] = useState(true); // mở rộng nhóm Tin bài mặc định
  const { setSidebarWidth } = useSidebar();

  // State lưu collections lấy từ API
  const [collections, setCollections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/collections`, {
          cache: "no-store", // hoặc dùng revalidate nếu muốn cache
          headers: {
            // Nếu Directus yêu cầu auth → thêm Authorization: Bearer <token>
            // "Authorization": "Bearer your-static-token-here",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        const allCollections = json.data?.map((item: any) => item.collection) || [];

        // Lọc bỏ các collection hệ thống nếu cần
        const filtered = allCollections.filter((c: string) =>
          !c.startsWith("directus_") &&
          !c.startsWith("graphql") // tuỳ dự án
        );

        setCollections(filtered);
      } catch (err: any) {
        console.error("Lỗi fetch collections:", err);
        setError(err.message || "Không thể tải danh sách chuyên mục");
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  // Lọc ra các collection thực sự tồn tại trong Directus
  const availableNewsItems = NEWS_COLLECTIONS.filter(item =>
    collections.includes(item.slug)
  );

  return (
    <>
      {showSide ? (
        <aside className="bg-white border-end d-flex flex-column" style={{ 
          width: 260, 
          height: '100vh', 
          position: 'fixed', 
          left: 0, 
          top: 0, 
          zIndex: 1000,
          overflowY: 'auto'
        }}>
          <div className="d-flex px-2 py-3 gap-1 justify-content-center align-items-center border-bottom">
            <Image src="/img/logoHome.png" width={80} height={50} alt="logo" loading="eager" />
            <h2 style={{ fontSize: "13px" }}>Trang thông tin sở công thương</h2>
            <div
              className="rounded-1 border d-flex justify-content-center align-items-center p-1"
              style={{
                backgroundColor: "#ededeb",
                borderColor: "#eeedf2",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowSide(false);
                setSidebarWidth(50);
              }}
            >
              <ChevronLeft size={14} />
            </div>
          </div>

          <div className="flex-grow-1 overflow-auto">
            <div className="mx-4 my-5">
              <div className="d-flex flex-column gap-3 mb-5">
                <div className="d-flex align-items-center gap-3" style={{ cursor: "pointer" }}>
                  <House size={20} />
                  <p style={{ fontSize: "14px" }}>Trang chủ</p>
                </div>
                <div className="d-flex align-content-center gap-3" style={{ cursor: "pointer" }}>
                  <ChartBar size={20} />
                  <p style={{ fontSize: "14px" }}>Thống kê</p>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <div style={{ height: "12px", width: "3px", backgroundColor: "#479466" }}></div>
                    <span style={{ fontSize: "12px", fontWeight: "500" }}>NỘI DUNG</span>
                  </div>
                  <div
                    className="cursor-pointer d-flex align-items-center justify-content-center"
                    style={{ width: 28, height: 28 }}
                    onClick={() => setShowNews(!showNews)}
                  >
                    <ChevronDown size={16} />
                  </div>
                </div>

                <div className="ps-2">
                  <div
                    onClick={() => setShowNews(!showNews)}
                    className="d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <Newspaper size={16} />
                      <span style={{ fontSize: "12px", fontWeight: "500" }}>Tin bài</span>
                    </div>
                    <div className="cursor-pointer d-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>
                      {showNews ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  </div>

                  {showNews && (
                    <div className="ps-2">
                      {loading ? (
                        <div className="py-2 text-muted small">Đang tải...</div>
                      ) : error ? (
                        <div className="py-2 text-danger small">Lỗi: {error}</div>
                      ) : availableNewsItems.length === 0 ? (
                        <div className="py-2 text-muted small">Không có chuyên mục nào</div>
                      ) : (
                        availableNewsItems.map((item) => (
                          <MenuItem key={item.slug} label={item.label} slug={item.slug} />
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Các nhóm khác giữ nguyên hoặc cũng có thể làm dynamic sau */}
                <div className="d-flex justify-content-between align-items-center px-2">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <FileText size={16} />
                    <span style={{ fontSize: "12px", fontWeight: "500" }}>Văn bản</span>
                  </div>
                  <ChevronRight size={16} />
                </div>
                {/* ... các nhóm khác tương tự */}
              </div>
            </div>
          </div>

          <div className="border-top p-3 mt-auto">
            <div className="p-2 d-flex gap-4 rounded-2" style={{ backgroundColor: "#f8f7fc" }}>
              <div className="d-flex justify-content-center align-items-center rounded-2 p-2" style={{ backgroundColor: "#7056b0" }}>
                <User size={16} color="white" />
              </div>
              <div className="d-flex flex-column justify-content-center gap-1">
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>Admin Test</span>
                <span style={{ fontSize: "10px" }}>admin_test@gmail.com</span>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <LogOut size={16} />
              </div>
            </div>
          </div>
        </aside>
      ) : (
        <aside className="bg-white border-end d-flex flex-column" style={{ 
          width: 50, 
          height: '100vh', 
          position: 'fixed', 
          left: 0, 
          top: 0, 
          zIndex: 1000 
        }}>
          <div className="d-flex px-2 py-3 gap-1 justify-content-center align-items-center">
            <div
              className="rounded-1 border d-flex justify-content-center align-items-center p-1"
              style={{
                backgroundColor: "#ededeb",
                borderColor: "#eeedf2",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowSide(true);
                setSidebarWidth(260);
              }}
            >
              <ChevronRight size={14} />
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
