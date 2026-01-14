// components/StatusBadge.tsx
import { translateStatus, getStatusBadgeClass } from "@/lib/statusUtils";

interface StatusBadgeProps {
  status: string | null | undefined;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge ${getStatusBadgeClass(status)}`}>
      {translateStatus(status)}
    </span>
  );
}
