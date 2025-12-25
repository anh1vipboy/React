'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface NewsItem {
  id: number;
  ten: string;
  tom_tat: string;
  anh_dai_dien?: string;
  title: string;
  excerpt: string;
  image?: string;
  time: string;
}

const HeroSection: React.FC = () => {
  // ===== CẤU HÌNH: Thay đổi ID tin tức muốn hiển thị tại đây =====
  const FEATURED_NEWS_ID_1 = 1;  // ID tin nổi bật thứ nhất (hiển thị trên)
  const FEATURED_NEWS_ID_2 = 2;  // ID tin nổi bật thứ hai (hiển thị dưới)
  
 
  // ================================================================

  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [heroImage, setHeroImage] = useState<string>('/img/Mask group.png');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log(' Bắt đầu lấy dữ liệu tin tức...');

        // Lấy tin thứ nhất (ID = 1)
        console.log(` Đang lấy tin ID = ${FEATURED_NEWS_ID_1}...`);
        const response1 = await fetch(`/api/news/${FEATURED_NEWS_ID_1}`);
        if (!response1.ok) {
          throw new Error(`Failed to fetch news ${FEATURED_NEWS_ID_1}: ${response1.status}`);
        }
        const news1 = await response1.json();
        console.log(' Tin 1:', news1);

        // Lấy tin thứ hai (ID = 2)
        console.log(` Đang lấy tin ID = ${FEATURED_NEWS_ID_2}...`);
        const response2 = await fetch(`/api/news/${FEATURED_NEWS_ID_2}`);
        if (!response2.ok) {
          throw new Error(`Failed to fetch news ${FEATURED_NEWS_ID_2}: ${response2.status}`);
        }
        const news2 = await response2.json();
        console.log(' Tin 2:', news2);

        // Gộp 2 tin vào mảng theo thứ tự: tin 1 trên, tin 2 dưới
        const newsArray = [news1, news2];
        console.log(' Danh sách tin:', newsArray);
        setFeaturedNews(newsArray);

        // Sử dụng ảnh của tin thứ nhất làm hero image (ảnh lớn bên trái)
        if (news1.image) {
          console.log(' Hero image:', news1.image);
          setHeroImage(news1.image);
        }

        console.log(' Hoàn thành lấy dữ liệu!');
      } catch (error) {
        console.error(' Lỗi khi lấy tin tức:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [FEATURED_NEWS_ID_1, FEATURED_NEWS_ID_2]);

  if (loading) {
    return (
      <section className="hero">
        <div className="container">
          <div className="row hero-section">
            <div className="col-md-12 text-center">
              <p>Đang tải...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="row hero-section">
          <div className="col-md-7 mb-3">
            <Image
              src={heroImage}
              alt="ảnh nổi bật"
              width={800}
              height={600}
              className="a1 img-fluid w-100"
              unoptimized={heroImage.startsWith('http')}
            />
          </div>
          <div className="col-md-5">
            <div className="tinnoibat w-100" style={{ backgroundColor: '#017fcc' }}>
              <h3>TIN NỔI BẬT</h3>
            </div>
            {featuredNews.length > 0 ? (
              featuredNews.map((news, index) => (
                <div key={news.id}>
                  <h4 style={{ color: '#017fcc' }}>{news.ten || 'Không có tiêu đề'}</h4>
                  <div style={{
                    textIndent: '15px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '1.5em',
                    maxHeight: '4.5em'
                  }}>
                    {news.tom_tat || 'Không có nội dung'}
                  </div>
                  <div className="post-meta d-flex justify-content-">
                    <span className="post-time">
                      <Image src="/img/icon _clock time.png" alt="clock" width={16} height={16} />
                      {news.time || 'N/A'}
                    </span>
                    <span className="post-more">Xem thêm</span>
                  </div>
                  {index < featuredNews.length - 1 && <div className="line"></div>}
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p>Không có tin tức</p>
              </div>
            )}
          </div>
          <div className="line1"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
