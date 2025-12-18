'use client';

import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-12 mb-4 mb-lg-0">
              <div className="footer-content">
                <Image
                  src="/img/image 24.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="footer-logo"
                />
                <div className="footer-text">
                  <h2>Hỗ Trợ Pháp Lý Cho Doanh Nghiệp</h2>
                  <div className="footer-info">
                    <p>
                      <strong>Trưởng Ban biên tập:</strong> Đồng chí Lê Ve Quốc - Cục
                      trưởng Cục Phổ biến, giáo dục pháp luật
                    </p>
                    <p>
                      <strong>Giấy phép số:</strong> 28/GP-BC ngày 25/03/2005
                    </p>
                    <p>
                      <strong>Địa chỉ:</strong> 58-60 Trần Phú, Ba Đình, Hà Nội
                    </p>
                    <p>
                      <strong>Điện thoại:</strong> 024.62739643
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="line3 my-3"></div>

            <div className="col-12 footer-bottom">
              <p className="text-center mb-0" style={{ color: 'white' }}>
                Ghi rõ nguồn Cổng thông tin điện tử Bộ Tư Pháp (www.moj.gov.vn) khi
                trích dẫn lại thông tin từ địa chỉ này.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
