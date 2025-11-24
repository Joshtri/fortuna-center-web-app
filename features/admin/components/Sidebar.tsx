'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const menuItems = [
  {
    title: 'Dashboard',
    icon: 'solar:home-2-bold-duotone',
    href: '/admin',
    color: 'text-cyan-400',
  },
  {
    title: 'Sessions',
    icon: 'solar:video-library-bold-duotone',
    href: '/admin/sessions',
    color: 'text-blue-400',
  },
  {
    title: 'Analytics',
    icon: 'solar:chart-2-bold-duotone',
    href: '/admin/analytics',
    color: 'text-purple-400',
  },
  {
    title: 'Settings',
    icon: 'solar:settings-bold-duotone',
    href: '/admin/settings',
    color: 'text-green-400',
  },
];

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -280, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-default-200 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-default-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Icon icon="fa6-solid:broadcast-tower" className="text-lg text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-default-900">Fortuna Center</h1>
            <p className="text-xs text-default-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden',
                isActive
                  ? 'bg-default-100 text-default-900 shadow-sm'
                  : 'text-default-500 hover:text-default-900 hover:bg-default-50'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon
                icon={item.icon}
                className={clsx(
                  'text-2xl relative z-10 transition-transform group-hover:scale-110',
                  isActive ? item.color : ''
                )}
              />
              <span className="font-medium relative z-10">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-default-200">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-default-50 hover:bg-default-100 transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold shadow-lg">
            A
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-default-900">Admin User</p>
            <p className="text-xs text-default-400">admin@fortuna.com</p>
          </div>
          <Icon
            icon="solar:logout-2-bold"
            className="text-default-400 group-hover:text-red-400 transition-colors"
          />
        </div>
      </div>
    </motion.aside>
  );
}
