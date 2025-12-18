'use client';

import React from 'react';
import Image from 'next/image';
import bannersData from '@/data/banners.json';

const BannerSection: React.FC = () => {
  return (
    <div className="container banner-section">
      <div className="row g-3">
        {bannersData.banners.map((banner) => (
          <div key={banner.id} className="col-lg-3 col-md-4 col-sm-6 col-6">
            <div className="banner-box">
              <Image
                src={banner.image}
                alt={banner.alt}
                width={300}
                height={200}
                className="img-fluid"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
