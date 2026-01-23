'use client';

import React, { useEffect, useState } from 'react';


interface Banner {
  id: number;
  ten: string;
  link?: string;
  logo?: string;
  mo_tab_moi?: boolean;
}

const BannerSection: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners');
        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return null;

  return (
    <div className="container banner-section">
      <div className="row g-3">
        {banners.map((banner) => (
          <div key={banner.id} className="col-lg-3 col-md-4 col-sm-6 col-6">
            <a
              href={banner.link || '#'}
              target={banner.mo_tab_moi ? '_blank' : '_self'}
              rel={banner.mo_tab_moi ? 'noopener noreferrer' : undefined}
            >
              <div className="banner-box">
                {banner.logo && (
                 <img
  src={`http://10.10.20.77:8057/assets/${banner.logo}`}
  alt={banner.ten}
  style={{ height: 'auto' }}
/>

                )}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
