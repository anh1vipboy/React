'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import newsData from '@/data/news.json';

interface LogoLink {
  id: number;
  loai?: number;
  mo_tab_moi?: boolean;
  link?: string;
  ten: string;
  logo?: string;
}


const NewsSection: React.FC = () => {
  const [logoLinks, setLogoLinks] = useState<LogoLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogoLinks = async () => {
      try {
        const response = await fetch('/api/logo-links');
        if (response.ok) {
          const data = await response.json();
          setLogoLinks(data);
        } else {
          console.error('Failed to fetch logo links');
        }
      } catch (error) {
        console.error('Error fetching logo links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogoLinks();
  }, []);

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
          <h4 className="section-title text-uppercase fw-bold text-primary mb-3">HỖ TRỢ PHÁP LÝ</h4>
          <div className="support-grid">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
            <div className="row g-3">
  {logoLinks.map((item) => (
    <div key={item.id} className="col-lg-4 col-md-4 col-6">
      <a
        href={item.link || '#'}
        target={item.mo_tab_moi ? '_blank' : '_self'}
        rel={item.mo_tab_moi ? 'noopener noreferrer' : undefined}
        className="text-decoration-none"
      >
        <div className="support-box h-100 box">
          <div className="support-box-inner text-center p-3 d-flex flex-column justify-content-center align-items-center">

            {item.logo && (
              <img
                src={`http://10.10.20.77:8057/assets/${item.logo}`}
                alt={item.ten}
                className="img-fluid mb-2"
                style={{ maxWidth: '80px', height: 'auto' }}
              />
            )}

            <p
              className="support-text text-white small mb-0"
              style={{ fontSize: '0.85rem', lineHeight: '1.3' }}
            >
              {item.ten}
            </p>

          </div>
        </div>
      </a>
    </div>
  ))}
</div>

            )}
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <h4 className="section-title">Tin tức và sự kiện</h4>
          {newsData.main.map((news) => (
            <div key={news.id} className="card mb-3 shadow-sm news-card">
              <div className="row g-0">
                <div className="col-md-6 col-12">
                  <Image
                    src={news.image}
                    alt={news.title}
                    width={400}
                    height={300}
                    className="img-fluid news-image"
                  />
                </div>
                <div className="col-md-6 col-12">
                  <div className="card-body">
                    <h5 className="card-title">{news.title}</h5>
                    <p className="card-text">{news.excerpt}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <ul className="list-group news-list">
            {newsData.list.map((item) => (
              <li key={item.id} className="list-group-item d-flex align-items-start">
                <span className="news-time">{item.time}</span>
                <a href="#" className="flex-grow-1 text-decoration-none text-dark">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
