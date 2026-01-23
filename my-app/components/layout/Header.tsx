import { House } from 'lucide-react'

export default function Header() {
  return (
    <div className='p-3 gap-2 d-flex align-content-center align-items-center border-bottom' style={{ color: '#296cf2' }}>
      <House size={16} />
      <div style={{ fontSize: '12px', fontWeight: '500' }}>
        <span>Trang chủ / </span>
        <span>Tin tức</span>
      </div>
    </div>
  )
}
