import Header from './home/components/Header';
import Navigation from './home/components/Navigation';
import HeroSection from './home/components/HeroSection';
import SearchForm from './home/components/SearchForm';
import DocumentsTable from './home/components/DocumentsTable';
import NewsSection from './home/components/NewsSection';
import BannerSection from './home/components/BannerSection';
import Footer from './home/components/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      <Navigation />
      <HeroSection />
      <SearchForm />
      <DocumentsTable />
      <div>
        <Image
          src="/img/ảnh-01 1.png"
          alt="Banner"
          width={1920}
          height={400}
          className="img-fluid w-100 my-4"
        />
      </div>
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
