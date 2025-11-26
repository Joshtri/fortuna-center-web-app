import { Icon } from "@iconify/react";
import { type ReactNode } from "react";

export interface NavigationItem {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
  description?: string;
}

export interface AdminNavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Public menu items - visible to all users
 */
export const publicMenuItems: NavigationItem[] = [
  {
    key: "home",
    label: "Home",
    href: "/",
    icon: <Icon icon="lucide:home" className="w-4 h-4" />,
    description: "Home page",
  },
  {
    key: "about",
    label: "About",
    href: "/about",
    icon: <Icon icon="lucide:info" className="w-4 h-4" />,
    description: "About Fortuna Center",
  },
  {
    key: "broadcast-live",
    label: "Broadcast Live",
    href: "/broadcast-live",
    icon: <Icon icon="lucide:radio" className="w-4 h-4" />,
    description: "Watch live broadcast",
  },
];

/**
 * System/Private menu items - visible only to authenticated users
 */
export const systemMenuItems: NavigationItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <Icon icon="lucide:home" className="w-4 h-4" />,
    description: "Go to dashboard",
  },
  {
    key: "my-posts",
    label: "My Posts",
    href: "/my-posts",
    icon: <Icon icon="lucide:pen-square" className="w-4 h-4" />,
    description: "Manage your posts",
  },
  {
    key: "drafts",
    label: "Drafts",
    href: "/drafts",
    icon: <Icon icon="lucide:book-open" className="w-4 h-4" />,
    description: "View your drafts",
  },
  {
    key: "profile",
    label: "Profile",
    href: "/profile",
    icon: <Icon icon="lucide:user" className="w-4 h-4" />,
    description: "View your profile",
  },
  {
    key: "settings",
    label: "Settings",
    href: "/settings",
    icon: <Icon icon="lucide:settings" className="w-4 h-4" />,
    description: "Account settings",
  },
];

/**
 * All navigation items combined
 */
export const allMenuItems: NavigationItem[] = [
  ...publicMenuItems,
  ...systemMenuItems,
];

/**
 * Get menu item by key
 */
export const getMenuItemByKey = (key: string): NavigationItem | undefined => {
  return allMenuItems.find((item) => item.key === key);
};

/**
 * Get public menu items
 */
export const getPublicMenuItems = (): NavigationItem[] => {
  return publicMenuItems;
};

/**
 * Get system/private menu items
 */
export const getSystemMenuItems = (): NavigationItem[] => {
  return systemMenuItems;
};

/**
 * Admin/System sidebar navigation - used in admin panel
 */
export const adminSidebarNavigation: AdminNavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: (props) => <Icon icon="solar:home-2-bold-duotone" {...props} /> },
  { name: "Sessions", href: "/sessions", icon: (props) => <Icon icon="solar:video-library-bold-duotone" {...props} /> },
//   { name: "Posts", href: "/posts", icon: (props) => <Icon icon="lucide:file-text" {...props} /> },
//   { name: "Labels", href: "/labels", icon: (props) => <Icon icon="lucide:tags" {...props} /> },
  { name: "Users", href: "/users", icon: (props) => <Icon icon="lucide:users" {...props} /> },
//   { name: "Comments", href: "/comments", icon: (props) => <Icon icon="lucide:messages-square" {...props} /> },
//   { name: "Types", href: "/types", icon: (props) => <Icon icon="lucide:type" {...props} /> },
  { name: "Analytics", href: "/analytics", icon: (props) => <Icon icon="solar:chart-2-bold-duotone" {...props} /> },
  { name: "Settings", href: "/settings", icon: (props) => <Icon icon="solar:settings-bold-duotone" {...props} /> },
];

/**
 * Teacher sidebar navigation - used in teacher panel
 */
export const teacherSidebarNavigation: AdminNavigationItem[] = [
  { name: "Dashboard", href: "/teacher/dashboard", icon: (props) => <Icon icon="solar:home-2-bold-duotone" {...props} /> },
  { name: "My Classes", href: "/teacher/classes", icon: (props) => <Icon icon="solar:users-group-rounded-bold-duotone" {...props} /> },
  { name: "Lessons", href: "/teacher/lessons", icon: (props) => <Icon icon="solar:book-bold-duotone" {...props} /> },
  { name: "Assignments", href: "/teacher/assignments", icon: (props) => <Icon icon="solar:document-text-bold-duotone" {...props} /> },
  { name: "Grades", href: "/teacher/grades", icon: (props) => <Icon icon="solar:chart-square-bold-duotone" {...props} /> },
  { name: "Settings", href: "/teacher/settings", icon: (props) => <Icon icon="solar:settings-bold-duotone" {...props} /> },
];

/**
 * Student sidebar navigation - used in student panel
 */
export const studentSidebarNavigation: AdminNavigationItem[] = [
  { name: "Dashboard", href: "/student/dashboard", icon: (props) => <Icon icon="solar:home-2-bold-duotone" {...props} /> },
  { name: "My Courses", href: "/student/courses", icon: (props) => <Icon icon="solar:book-2-bold-duotone" {...props} /> },
  { name: "Assignments", href: "/student/assignments", icon: (props) => <Icon icon="solar:document-bold-duotone" {...props} /> },
  { name: "Grades", href: "/student/grades", icon: (props) => <Icon icon="solar:chart-bold-duotone" {...props} /> },
  { name: "Schedule", href: "/student/schedule", icon: (props) => <Icon icon="solar:calendar-bold-duotone" {...props} /> },
  { name: "Settings", href: "/student/settings", icon: (props) => <Icon icon="solar:settings-bold-duotone" {...props} /> },
];

/**
 * Administrative Employee sidebar navigation
 */
export const administrativeEmployeeSidebarNavigation: AdminNavigationItem[] = [
  { name: "Dashboard", href: "/administrative/dashboard", icon: (props) => <Icon icon="solar:home-2-bold-duotone" {...props} /> },
  { name: "Users", href: "/administrative/users", icon: (props) => <Icon icon="lucide:users" {...props} /> },
  { name: "Reports", href: "/administrative/reports", icon: (props) => <Icon icon="solar:document-text-bold-duotone" {...props} /> },
  { name: "Attendance", href: "/administrative/attendance", icon: (props) => <Icon icon="solar:calendar-mark-bold-duotone" {...props} /> },
  { name: "Settings", href: "/administrative/settings", icon: (props) => <Icon icon="solar:settings-bold-duotone" {...props} /> },
];

/**
 * Get navigation items by role
 */
export const getNavigationByRole = (role: string): AdminNavigationItem[] => {
  switch (role) {
    case "ADMIN":
      return adminSidebarNavigation;
    case "TEACHER":
      return teacherSidebarNavigation;
    case "STUDENT":
      return studentSidebarNavigation;
    case "ADMINISTRATIVE_EMPLOYEE":
      return administrativeEmployeeSidebarNavigation;
    default:
      return [];
  }
};

/**
 * Get admin sidebar navigation items
 */
export const getAdminSidebarNavigation = (): AdminNavigationItem[] => {
  return adminSidebarNavigation;
};
