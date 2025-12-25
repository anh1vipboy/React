'use client';

import React, { useEffect, useState } from 'react';

interface FooterData {
  content: string;
  image?: string | null;
}

const Footer: React.FC = () => {
  const [footer, setFooter] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch('/api/footer');
        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();
        setFooter(data);
      } catch (error) {
        console.error('Error fetching footer:', error);
      }
    };

    fetchFooter();
  }, []);

  if (!footer) return null;

  return (
   <footer className="site-footer">
  <div className="footer-main">
    <div className="container">
      <div className="row align-items-center">

        {/* CỘT LOGO */}
        <div className="col-lg-2 col-md-3 col-12 text-center mb-3 mb-md-0">
          {footer.image && (
            <img
              src={`http://10.10.20.77:8057/assets/${footer.image}`}
              alt="Footer logo"
              className="footer-logo"
            />
          )}
        </div>

        {/* CỘT NỘI DUNG */}
        <div className="col-lg-10 col-md-9 col-12">
          <h5 className="footer-title text-white mb-2">
            HỖ TRỢ PHÁP LÝ CHO DOANH NGHIỆP
          </h5>

          <div className="footer-text text-white">
            {footer.content.split('\n').map((line, index) => (
              <p key={index} className="mb-1">
                {line}
              </p>
            ))}
          </div>
        </div>

      </div>

      <hr className="footer-divider my-3 border-white " />

      <p className="text-center text-white mb-0 small">
        Ghi rõ nguồn Cổng thông tin điện tử Bộ Tư Pháp (www.moj.gov.vn) khi trích
        dẫn lại thông tin từ địa chỉ này.
      </p>
    </div>
  </div>
</footer>

  );
};

export default Footer;
