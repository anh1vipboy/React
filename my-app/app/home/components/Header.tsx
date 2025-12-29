'use client';

import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="row w-100 align-items-center">
          <div className="col-md-8 d-flex align-items-center">
            <Image
              src="/img/image 24.png"
              alt="logo"
              width={80}
              height={80}
              className="logo img-fluid"
              style={{ marginRight: '1em' }}
            />
            <h2 style={{ color: '#017fcc' }}>Hỗ Trợ Pháp Lý Cho Doanh Nghiệp</h2>
          </div>
          <div className="col-md-4 d-flex justify-content-end align-items-center gap-4">
            <div className="search-wrapper"   >
              <input
                type="text"
                className="form-control search-input"
                placeholder="Tìm kiếm"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="search-icon"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>
            <div className="login-wrapper d-flex flex-column align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <span className="login-text">Đăng nhập</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
