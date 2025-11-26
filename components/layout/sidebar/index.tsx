"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button/Button";
import { Tooltip } from "@heroui/react";
import Image from "next/image";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  setSidebarOpen: (open: boolean) => void;
  isDark: boolean;
  navigationItems: NavigationItem[];
  title?: string;
  logoLight?: string;
  logoDark?: string;
  homeHref?: string;
}

export function Sidebar({
  sidebarOpen,
  sidebarCollapsed,
  setSidebarOpen,
  isDark,
  navigationItems,
  title = "Dashboard",
  logoLight = "/joshtri-lenggu-outlined.png",
  logoDark = "/joshtri-lenggu-solid.png",
  homeHref = "/dashboard",
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800
          transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}
          lg:translate-x-0 flex flex-col
        `}
        style={{ width: sidebarCollapsed ? "80px" : "256px" }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <Link
            href={homeHref}
            className={`flex items-center gap-2 transition-all duration-300 ${
              sidebarCollapsed ? "justify-center w-full" : ""
            }`}
          >
            {isDark ? (
              <Image
                src={logoDark}
                alt="Logo"
                width={128}
                height={128}
                quality={100}
                priority={true}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <Image
                src={logoLight}
                alt="Logo"
                width={128}
                height={128}
                quality={100}
                priority={true}
                className="w-8 h-8 object-contain"
              />
            )}
            {!sidebarCollapsed && (
              <Text className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                {title}
              </Text>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1"
            aria-label="Close sidebar"
          >
            <Icon icon="lucide:x" className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            const navLink = (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-150 relative group
                  ${sidebarCollapsed ? "justify-center" : ""}
                  ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && (
                  <span className="whitespace-nowrap">{item.name}</span>
                )}
              </Link>
            );

            // Show tooltip only when collapsed on desktop
            return sidebarCollapsed ? (
              <Tooltip
                key={item.name}
                content={item.name}
                placement="right"
                delay={0}
                closeDelay={0}
                classNames={{
                  base: "hidden lg:block",
                  content:
                    "bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg",
                }}
              >
                {navLink}
              </Tooltip>
            ) : (
              navLink
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4 flex flex-col items-center justify-center space-y-2 shrink-0">
          {sidebarCollapsed ? (
            // Collapsed state - icon only with tooltips
            <>
              <Tooltip
                content="Back to Site"
                placement="right"
                delay={0}
                classNames={{
                  base: "hidden lg:block",
                  content:
                    "bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg",
                }}
              >
                <Button
                  as={Link}
                  href="/"
                  size="sm"
                  target="_blank"
                  variant="light"
                  isIconOnly
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <Icon icon="lucide:home" className="w-5 h-5" />
                </Button>
              </Tooltip>
              <Tooltip
                content="Log Out"
                placement="right"
                delay={0}
                classNames={{
                  base: "hidden lg:block",
                  content:
                    "bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg",
                }}
              >
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  isIconOnly
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <Icon icon="lucide:log-out" className="w-5 h-5" />
                </Button>
              </Tooltip>
            </>
          ) : (
            // Expanded state - full buttons
            <div className="flex flex-col items-center justify-center w-full space-y-2">
              <Button
                as={Link}
                href="/"
                size="sm"
                target="_blank"
                variant="light"
                className="w-full flex items-center justify-center gap-3 px-3 py-2 text-sm font-medium"
                startContent={<Icon icon="lucide:home" className="w-5 h-5" />}
              >
                Back to Site
              </Button>
              <Button
                size="sm"
                className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                color="danger"
                variant="flat"
                startContent={<Icon icon="lucide:log-out" className="w-5 h-5" />}
              >
                Log Out
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
