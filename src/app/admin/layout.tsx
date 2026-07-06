'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, GraduationCap, Settings, LogOut, ShieldAlert, Sun, Moon, ExternalLink } from 'lucide-react';
import { useTheme } from '@/components/ThemeContext';
import styles from './layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    document.body.classList.add('admin-body');
    return () => {
      document.body.classList.remove('admin-body');
    };
  }, []);

  // If on login page, don't wrap in admin panel structure
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/admin/articles', label: 'Artikel & Berita', icon: <FileText size={18} /> },
    { href: '/admin/admissions', label: 'PPDB Pendaftaran', icon: <GraduationCap size={18} /> },
    { href: '/admin/settings', label: 'Pengaturan Web', icon: <Settings size={18} /> },
  ];

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <ShieldAlert className={styles.logoIcon} size={22} />
          <span>Bani Sulaiman CMS</span>
        </div>
        
        <nav className={styles.navMenu}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`${styles.navItem} ${isActive ? styles.activeItem : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={16} />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className={styles.workspace}>
        {/* Workspace Top Header */}
        <header className={styles.workspaceHeader}>
          <div className={styles.sectionTitle}>
            <span>Portal Admin & CMS</span>
          </div>
          <div className={styles.headerActions}>
            <Link href="/" className={styles.viewSiteBtn}>
              <span>Lihat Website</span>
              <ExternalLink size={14} />
            </Link>
            <button onClick={toggleTheme} className={styles.themeToggleBtn} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
