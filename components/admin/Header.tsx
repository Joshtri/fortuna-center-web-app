'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl hover:bg-white/10 transition-all text-white/60 hover:text-white"
        >
          <Icon icon="solar:hamburger-menu-bold" className="text-2xl" />
        </button>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Icon
              icon="solar:magnifer-bold"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 w-64 transition-all"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-white/10 transition-all text-white/60 hover:text-white">
            <Icon icon="solar:bell-bold-duotone" className="text-2xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* View Site */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all text-sm font-medium"
          >
            <Icon icon="solar:eye-bold" />
            View Site
          </Link>
        </div>
      </div>
    </header>
  );
}
