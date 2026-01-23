'use client';
import { useEffect,useState } from 'react';
import Header from './home/components/Header';
import Navigation from './home/components/Navigation';
import HeroSection from './home/components/HeroSection';
import SearchForm from './home/components/SearchForm';
import DocumentsTable from './home/components/DocumentsTable';
import NewsSection from './home/components/NewsSection';
import BannerSection from './home/components/BannerSection';
import Footer from './home/components/Footer';
import Image from 'next/image';
interface HomeBanner {
  anh?: string;
  ten?: string;
  link?: string;
  mo_tab_moi?: boolean;
}

export default function Home() {
  const [banner, setBanner] = useState<HomeBanner | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch('/api/home-banner');
        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();
        setBanner(data);
      } catch (err) {
        console.error('Error fetching home banner:', err);
      }
    };

    fetchBanner();
  }, []);

  return (
    <>
      <Header />
      <Navigation />
      <HeroSection />
      <SearchForm />
      <DocumentsTable />
      {/* Banner Động */}
      {banner?.anh && (
  <div>
    <a
      href={banner.link || '#'}
      target={banner.mo_tab_moi ? '_blank' : '_self'}
      rel={banner.mo_tab_moi ? 'noopener noreferrer' : undefined}
    >
      <img
        src={`http://10.10.20.77:8057/assets/${banner.anh}`}
        alt={banner.ten || 'Home Banner'}
        className="img-fluid w-100 my-4"
        style={{  objectFit: 'cover' }}
      />
    </a>
  </div>
)}

      <div className="container">
        <div className="line2 my-3"></div>
      </div>
      <NewsSection />
      <div className="container">
        <div className="line2 my-3"></div>
      </div>
      <BannerSection />
      <div className="container">
        <div className="line2 my-3"></div>
      </div>
      <Footer />
    </>
  );
}
