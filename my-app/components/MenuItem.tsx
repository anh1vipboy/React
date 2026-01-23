'use client'

import { Folder } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MenuItem = ({ label, slug }: { label: string, slug: string }) => {
  const pathname = usePathname();
  const isActive = pathname.includes(slug);
  return (
    <Link
      href={`/admin/collections/${slug}`}
      className="d-block px-2 text-decoration-none text-dark"
    >
      <div className="d-flex justify-content-between align-items-center p-2 rounded-2" style={{
        backgroundColor: isActive ? '#e3f2fc' : 'transparent',
        color: isActive ? '#1877d6' : '#212552'
      }}>
        <div className="d-flex justify-content-center align-items-center gap-3">
          {
            isActive
              ? <div style={{ height: '12px', width: '3px', backgroundColor: '#1877d6' }}></div>
              : <div style={{ height: '12px', width: '3px' }}></div>
          }
          <Folder size={16} />
          <span style={{ fontSize: '12px', fontWeight: '500' }}>{label}</span>
        </div>
      </div>
    </Link>
  );
};
export default MenuItem
