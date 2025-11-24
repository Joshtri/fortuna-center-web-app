'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Sidebar from '@/features/admin/components/Sidebar';
import Header from '@/features/admin/components/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <Sidebar isOpen={isSidebarOpen} />
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={clsx(
          'flex-1 transition-all duration-300',
          isSidebarOpen ? 'ml-[280px]' : 'ml-0'
        )}
      >
        {/* Header */}
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
