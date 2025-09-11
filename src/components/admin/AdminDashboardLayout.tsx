import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Image, FileText, Users, MessageSquare, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Blog Posts', href: '/admin/dashboard/blog', icon: Newspaper },
  { name: 'Gallery', href: '/admin/dashboard/gallery', icon: Image },
  { name: 'Reports', href: '/admin/dashboard/reports', icon: FileText },
  { name: 'Volunteers', href: '/admin/dashboard/volunteers', icon: Users },
  { name: 'Contact Messages', href: '/admin/dashboard/contact', icon: MessageSquare },
];

export default function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      navigate('/admin', { replace: true });
    }
  };

  // Sidebar is expanded if open (mobile) or hovered (desktop)
  const isSidebarExpanded = sidebarOpen || sidebarHovered;

  return (
    <div className="flex min-h-screen bg-muted/10">
      {/* Sidebar */}
      <aside
        className={`
          bg-background border-r border-border p-4 flex flex-col
          transition-all duration-200
          ${isSidebarExpanded ? 'w-64' : 'w-16'}
          md:sticky md:top-0 md:h-screen
        `}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {/* Mobile toggle button */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            R
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen((v) => !v)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {/* Desktop logo */}
        <div className="hidden md:flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            R
          </div>
          {isSidebarExpanded && (
            <span className="text-xl font-bold text-primary transition-opacity duration-200">Admin Panel</span>
          )}
        </div>
        <nav className="flex-1 space-y-2 mt-2">
          {adminNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors
                ${isSidebarExpanded ? 'space-x-3 justify-start' : 'justify-center'}
              `}
            >
              <item.icon className="h-5 w-5" />
              {isSidebarExpanded && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            {isSidebarExpanded ? 'Logout' : <span className="sr-only">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet /> {/* Renders nested routes */}
      </main>
    </div>
  );
}
