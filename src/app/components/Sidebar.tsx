import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface SidebarItem {
  icon: ReactNode;
  label: string;
  path: string;
}

interface SidebarProps {
  items: SidebarItem[];
  role: string;
}

export function Sidebar({ items, role }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-white h-screen border-r border-gray-200 fixed left-0 top-0 transition-all duration-300 z-50`}>
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className={`${collapsed ? 'hidden' : 'block'}`}>
          <h2 className="text-xl">Smart ERP</h2>
          <p className="text-xs text-gray-500 mt-1">{role} Portal</p>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      <nav className="p-4">
        {items.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
