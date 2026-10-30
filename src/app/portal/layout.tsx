'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/portal/Sidebar';
import TopNav from '@/components/portal/TopNav';
import HeyClickyModal from '@/components/portal/HeyClickyModal';
import { UserProfile } from '@/data/mockData';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [heyClickyOpen, setHeyClickyOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<UserProfile['role']>('teacher');

  // Global Keyboard listener for Cmd+K / Ctrl+K to open Hey-Clicky
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setHeyClickyOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen text-slate-100 flex flex-col">
      {/* Collapsible Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Pane adjusted for sidebar width */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <TopNav
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenHeyClicky={() => setHeyClickyOpen(true)}
          activeRole={activeRole}
          onChangeRole={setActiveRole}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Hey-Clicky AI Omni-Navigator Modal */}
      <HeyClickyModal
        isOpen={heyClickyOpen}
        onClose={() => setHeyClickyOpen(false)}
      />
    </div>
  );
}

