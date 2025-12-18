'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import menuData from '@/data/menu.json';

const Navigation: React.FC = () => {
  return (
    <nav className="navbar-menu">
      <div className="container-fluid">
        <div className="d-flex align-items-center my-3">
          <div className="nav-logo">
            <Image src="/img/logoHome.png" alt="Home" width={60} height={60} />
          </div>
          <ul className="nav-menu">
            {menuData.menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <Link
                  href={item.href}
                  className={`nav-link ${item.active ? 'active' : ''}`}
                  aria-current={item.active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
