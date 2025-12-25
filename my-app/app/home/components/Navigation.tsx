'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  id: number;
  ten: string;
  url: string | null;
  sort: number;
  menu_cha_id: number | null;
  status: string;
}

const Navigation: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenus() {
      try {
        const response = await fetch('/api/menus');
        if (response.ok) {
          const data = await response.json();
          // Filter only top-level menus (menu_cha_id is null)
          const topLevelMenus = data.filter((item: MenuItem) => item.menu_cha_id === null);
          setMenuItems(topLevelMenus);
          // setMenuItems(data);
        }
      } catch (error) {
        console.error('Error fetching menus:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenus();
  }, []);

  return (
    <nav className="navbar-menu">
      <div className="container-fluid">
        <div className="d-flex align-items-center my-3">
          <div className="nav-logo">
            <Image src="/img/logoHome.png" alt="Home" width={60} height={60} />
          </div>
          <ul className="nav-menu">
            {loading ? (
              <li className="nav-item">Đang tải...</li>
            ) : (
              menuItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <Link
                    href={item.url || '#'}
                    className="nav-link"
                  >
                    {item.ten}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
