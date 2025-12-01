"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Skeleton,
} from "@heroui/react";
import { UserButton, useUser, SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  NavigationItem,
  publicMenuItems,
  systemMenuItems,
} from "@/config/navigationItem";
import { textToSlug } from "@/lib/slug";
import { useSearchContext } from "@/providers/SearchProvider";
import { Text } from "@/components/ui/Text";
import AuthButtons from "./AuthButtons";
import { Icon } from "@iconify/react";
import HeaderDateTimeWidget from "@/components/HeaderDateTimeWidget";

interface TypeItem {
  id: string;
  name: string;
}

interface NavbarProps {
  // Mode configuration
  mode?: "public" | "dashboard";

  // Dashboard mode props
  onMenuClick?: () => void;
  onToggleCollapse?: () => void;
  sidebarCollapsed?: boolean;

  // Public mode props
  logo?: string;
  logoDark?: string;
  brandName?: string;
  menuItems?: NavigationItem[];
  showThemeToggle?: boolean;
  showAuth?: boolean;
}

export default function Navbar({
  mode = "public",
  onMenuClick,
  onToggleCollapse,
  sidebarCollapsed = false,
  logo,
  logoDark,
  brandName = "FORTUNA CENTER",
  menuItems = publicMenuItems,
  showThemeToggle = true,
  showAuth = true,
}: NavbarProps) {
  const [isDark, setIsDark] = useState(false);
  const [types, setTypes] = useState<TypeItem[]>([]);
  const [typesLoading, setTypesLoading] = useState(true);
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const { setIsOpen: openSearch } = useSearchContext();

  // Check and load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);

    const htmlElement = document.documentElement;
    if (shouldBeDark && !htmlElement.classList.contains("dark")) {
      htmlElement.classList.add("dark");
    } else if (!shouldBeDark && htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
    }
  }, []);

  // Fetch types for blog dropdown (only for public mode)
  useEffect(() => {
    if (mode !== "public") return;

    const fetchTypes = async () => {
      try {
        const response = await fetch("/api/public/types");
        const result = await response.json();
        if (result.success) {
          setTypes(result.data);
        }
      } catch (error) {
        console.error("Error fetching types:", error);
      } finally {
        setTypesLoading(false);
      }
    };

    fetchTypes();
  }, [mode]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark");

    if (newIsDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  // Dashboard mode navbar
  if (mode === "dashboard") {
    return (
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Icon icon="material-symbols:menu" className="w-5 h-5" />
            </button>

            {/* Desktop collapse toggle */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? (
                <Icon
                  icon="material-symbols:chevron-right"
                  className="w-5 h-5"
                />
              ) : (
                <Icon
                  icon="material-symbols:chevron-left"
                  className="w-5 h-5"
                />
              )}
            </button>

            <div className="ml-4">
              <HeaderDateTimeWidget />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* User Profile */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
              {!isLoaded ? (
                // Loading state
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end gap-1">
                    <Skeleton className="h-4 w-24 rounded-lg" />
                    <Skeleton className="h-3 w-32 rounded-lg" />
                  </div>
                  <Skeleton className="rounded-full w-10 h-10" />
                </div>
              ) : (
                // Loaded state with user info
                <SignedIn>
                  <div className="hidden sm:block text-right">
                    <Text className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.fullName || user?.firstName || "-"}
                    </Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.primaryEmailAddress?.emailAddress || "-"}
                    </Text>
                  </div>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                      },
                    }}
                  />
                </SignedIn>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Public mode navbar
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo & Navigation */}
          <div className="flex items-center gap-12">
            {/* Logo */}
            <NextLink href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden transition-transform group-hover:scale-105 shadow-sm bg-white p-1">
                <div className="relative w-full h-full">
                  <Image
                    src={logo || logoDark || "/apple-touch-icon.png"}
                    alt={brandName}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {brandName}
              </span>
            </NextLink>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {menuItems.map((item) => {
                // Handle Blog item specially for dropdown
                if (item.key === "blog") {
                  return (
                    <Dropdown key={item.key} placement="bottom-start">
                      <DropdownTrigger>
                        <Button
                          variant="light"
                          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all px-4 py-2 h-auto rounded-full"
                          endContent={
                            <Icon
                              icon="lucide:chevron-down"
                              className="w-4 h-4 opacity-50"
                            />
                          }
                        >
                          <div className="flex items-center gap-2">
                            {item.icon}
                            {item.label}
                          </div>
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Blog categories"
                        className="w-56 p-2"
                        itemClasses={{
                          base: "rounded-lg data-[hover=true]:bg-blue-50 dark:data-[hover=true]:bg-blue-900/20 data-[hover=true]:text-blue-600 dark:data-[hover=true]:text-blue-400",
                        }}
                      >
                        {typesLoading ? (
                          <DropdownItem key="loading" isDisabled>
                            Loading...
                          </DropdownItem>
                        ) : types.length === 0 ? (
                          <DropdownItem key="no-types" isDisabled>
                            No categories
                          </DropdownItem>
                        ) : (
                          types.map((type) => (
                            <DropdownItem
                              key={type.id}
                              onPress={() =>
                                router.push(`/${textToSlug(type.name)}`)
                              }
                            >
                              {type.name}
                            </DropdownItem>
                          ))
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  );
                }

                return (
                  <NextLink
                    key={item.key}
                    href={item.href}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center gap-2 px-4 py-2 rounded-full"
                  >
                    {item.icon}
                    {item.label}
                  </NextLink>
                );
              })}
            </div>
          </div>

          {/* Right: Theme Toggle, Mobile Menu, Auth */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {showThemeToggle && (
              <Button
                isIconOnly
                variant="light"
                aria-label="Toggle theme"
                onClick={toggleTheme}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full w-10 h-10"
              >
                {isDark ? (
                  <Icon icon="solar:sun-bold" className="w-5 h-5" />
                ) : (
                  <Icon icon="solar:moon-bold" className="w-5 h-5" />
                )}
              </Button>
            )}

            {/* Mobile Menu - Dropdown */}
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  className="md:hidden text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full w-10 h-10"
                  aria-label="Menu"
                >
                  <Icon icon="solar:hamburger-menu-bold" className="w-6 h-6" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Mobile menu"
                className="p-2"
                itemClasses={{
                  base: "rounded-lg data-[hover=true]:bg-blue-50 dark:data-[hover=true]:bg-blue-900/20 data-[hover=true]:text-blue-600 dark:data-[hover=true]:text-blue-400 py-3",
                }}
              >
                <DropdownSection title="Navigation" showDivider>
                  {menuItems.map((item) => {
                    if (item.key === "blog") {
                      return (
                        <DropdownItem
                          key={item.key}
                          startContent={item.icon}
                          textValue={item.label}
                          className="font-semibold"
                        >
                          {item.label}
                        </DropdownItem>
                      );
                    }

                    return (
                      <DropdownItem
                        key={item.key}
                        startContent={item.icon}
                        onPress={() => router.push(item.href)}
                      >
                        {item.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownSection>

                {/* Blog Categories in Mobile */}
                {!typesLoading && types.length > 0 ? (
                  <DropdownSection title="Categories" showDivider>
                    {types.map((type) => (
                      <DropdownItem
                        key={type.id}
                        onPress={() => router.push(`/${textToSlug(type.name)}`)}
                      >
                        {type.name}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                ) : null}

                {isSignedIn && systemMenuItems.length > 0 ? (
                  <DropdownSection title="System" showDivider>
                    {systemMenuItems.map((item) => (
                      <DropdownItem
                        key={item.key}
                        startContent={item.icon}
                        onPress={() => router.push(item.href)}
                      >
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                ) : null}

                {!isSignedIn ? (
                  <DropdownSection title="Account">
                    <DropdownItem
                      key="login"
                      onPress={() => router.push("/auth/login")}
                      startContent={<Icon icon="solar:login-2-bold" />}
                    >
                      Login
                    </DropdownItem>
                    <DropdownItem
                      key="signup"
                      onPress={() => router.push("/auth/signup")}
                      startContent={<Icon icon="solar:user-plus-bold" />}
                    >
                      Sign Up
                    </DropdownItem>
                  </DropdownSection>
                ) : null}
              </DropdownMenu>
            </Dropdown>

            {/* Auth Buttons */}
            {showAuth && (
              <div className="hidden md:block">
                <AuthButtons />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
