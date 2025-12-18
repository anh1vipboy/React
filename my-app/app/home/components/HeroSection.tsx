'use client';

import React from 'react';
import Image from 'next/image';
import newsData from '@/data/news.json';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row hero-section">
          <div className="col-md-7 mb-3">
            <Image
              src="/img/Mask group.png"
              alt="ảnh thủ tướng"
              width={800}
              height={600}
              className="a1 img-fluid w-100"
            />
          </div>
          <div className="col-md-5">
            <div className="tinnoibat w-100" style={{ backgroundColor: '#017fcc' }}>
              <h3>TIN NỔI BẬT</h3>
            </div>
            {newsData.featured.map((news, index) => (
              <div key={news.id}>
                <h4 style={{ color: '#017fcc' }}>{news.title}</h4>
                <div style={{ textIndent: '15px' }}>{news.excerpt}</div>
                <div className="post-meta d-flex justify-content-">
                  <span className="post-time">
                    <Image src="/img/icon _clock time.png" alt="clock" width={16} height={16} />
                    {news.time}
                  </span>
                  <span className="post-more">Xem thêm</span>
                </div>
                {index < newsData.featured.length - 1 && <div className="line"></div>}
              </div>
            ))}
          </div>
          <div className="line1"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
