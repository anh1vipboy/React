"use client";

import { RotateCcw, SquarePen, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function TableClient({ id, collection }: { id: string, collection: string }) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      console.log("Xóa item:", id);
      try {
        const res = await fetch(`http://10.10.20.77:8057/items/${collection}/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Xóa thành công!");
          router.refresh();
        } else {
          const errorData = await res.json();
          alert(`Xóa thất bại: ${errorData.errors?.[0]?.message || "Lỗi không xác định"}`);
        }
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        alert("Đã xảy ra lỗi kết nối đến máy chủ.");
      }
    }
  };

  return (
    <td className="d-flex gap-2 justify-content-end align-items-end">
      <button className="border d-flex justify-content-center p-1 rounded-2">
        <RotateCcw color="#969499" size={14} />
      </button>
      <Link href={`/admin/collections/${collection}/edit/${id}`}>
        <button className="border d-flex justify-content-center p-1 rounded-2">
          <SquarePen color="#4673bd" size={14} />
        </button>
      </Link>
      <Link href={`/admin/collections/${collection}/${id}`}>
        <button className="border d-flex justify-content-center p-1 rounded-2">
          <Eye color="#4673bd" size={14} />
        </button>
      </Link>
      <button onClick={() => handleDelete(id)} className="border d-flex justify-content-center p-1 rounded-2">
        <Trash color="red" size={14} />
      </button>
    </td>
  );
}
