'use client';

import React from 'react';
import Image from 'next/image';
import newsData from '@/data/news.json';

const NewsSection: React.FC = () => {
  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
          <h4 className="section-title text-uppercase fw-bold text-primary mb-3">HỖ TRỢ PHÁP LÝ</h4>
          <div className="support-grid">
            <div className="row g-3">
              {newsData.breakingImage.map((news) => (
                <div key={news.id} className="col-lg-4 col-md-4 col-6">
                  <div className="support-box h-100 box">
                    <div className="support-box-inner text-center p-3 d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={news.image}
                        alt={news.alt}
                        className="img-fluid mb-2"
                        style={{ maxWidth: '80px', height: 'auto' }}
                      />
                      <p className="support-text text-white small mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.3' }}>{news.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
