// src/components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { path: '/receiving', title: 'Приемка', icon: '📦' },
  { path: '/shipping', title: 'Отгрузка', icon: '🚚' },
  { path: '/operations', title: 'Операции', icon: '⚙️' },
  { path: '/resource-management', title: 'Управление ресурсами', icon: '👥' },
  { path: '/yard-management', title: 'Управление двором', icon: '🏭' },
  { path: '/products', title: 'Настройка склада', icon: '🔧' },
  { path: '/reference-data', title: 'Справочники', icon: '📚' },
  { path: '/billing', title: 'Биллинг', icon: '💰' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname.startsWith(item.path) ? 'active' : ''}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;