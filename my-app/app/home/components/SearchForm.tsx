'use client';

import React, { useState } from 'react';

const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState({
    documentType: 'Tất cả',
    category: 'Tất cả',
    authority: 'Tất cả',
    fromYear: 'Từ năm',
    toYear: 'Đến năm',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search data:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="hero2_section">
      <div className="container">
        <h3 style={{ color: '#017fcc' }}>VĂN BẢN PHÁP LUẬT</h3>
        <div className="col-lg-12 col-md-12 col-sm-6">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              <div className="col-md-2 col-sm-6">
                <label className="form-label">Loại văn bản</label>
                <select
                  className="form-select"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                >
                  <option>Tất cả</option>
                  <option></option>
                  <option></option>
                  <option></option>
                </select>
              </div>

              <div className="col-md-2 col-sm-6">
                <label className="form-label">Phần loại</label>
                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option>Tất cả</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>

              <div className="col-md-2 col-sm-6">
                <label className="form-label">Cơ quan ban hành</label>
                <select
                  className="form-select"
                  name="authority"
                  value={formData.authority}
                  onChange={handleChange}
                >
                  <option>Tất cả</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>

              <div className="col-md-2 col-sm-6">
                <label className="form-label">Năm phát hành</label>
                <select
                  className="form-select"
                  name="fromYear"
                  value={formData.fromYear}
                  onChange={handleChange}
                >
                  <option>Từ năm</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </div>

              <div className="col-md-2 col-sm-6">
                
                <select
                  className="form-select"
                  name="toYear"
                  value={formData.toYear}
                  onChange={handleChange}
                >
                  <option>Đến năm</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </div>

              <div className="col-md-2 col-sm-6">
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: '#0B5ED7', color: 'white' }}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
