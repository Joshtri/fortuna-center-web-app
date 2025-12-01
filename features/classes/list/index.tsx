"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ListGrid } from "@/components/ui/ListGrid";
import { Chip } from "@heroui/react";
import { ACTION_BUTTONS, ADD_BUTTON } from "@/components/ui/Button/ActionButtons";

// Temporary mock data - replace with actual API call
const useMockClasses = () => {
  return {
    data: {
      data: [
        {
          id: "1",
          name: "Mathematics 101",
          code: "MATH101",
          description: "Introduction to Mathematics",
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "English Literature",
          code: "ENG201",
          description: "Advanced English Literature",
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ],
      totalCount: 2,
    },
    isLoading: false,
    isError: false,
    error: null,
  };
};

export default function ClassList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: dataClasses,
    isLoading,
    isError,
    error,
  } = useMockClasses();

  const totalCount = dataClasses?.totalCount || 0;

  const columns = [
    {
      key: "code",
      label: "Code",
      value: (classItem: any) => (
        <div className="font-mono font-semibold text-primary">
          {classItem.code}
        </div>
      ),
    },
    {
      key: "name",
      label: "Class Name",
      value: (classItem: any) => (
        <div>
          <div className="font-semibold">{classItem.name}</div>
          <div className="text-xs text-gray-500">
            {classItem.description || "No description"}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      value: (classItem: any) => (
        <Chip
          size="sm"
          color={classItem.isActive ? "success" : "default"}
          variant="flat"
        >
          {classItem.isActive ? "Active" : "Inactive"}
        </Chip>
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      value: (classItem: any) =>
        new Date(classItem.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center" as const,
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <ListGrid
      keyField="id"
      idField="id"
      title="Class Management"
      description="Manage classes and courses"
      actionButtons={{
        add: ADD_BUTTON.CREATE("/classes/create"),
        show: ACTION_BUTTONS.SHOW((id) => router.push(`/classes/${id}/enroll`)),
      }}
      isError={isError}
      error={error}
      loading={isLoading}
      empty={dataClasses?.data?.length === 0}
      nameField="name"
      searchPlaceholder="Search classes by name or code..."
      data={dataClasses}
      onSearch={handleSearch}
      columns={columns as never}
      pageSize={pageSize}
      showPagination={true}
      totalCount={totalCount}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}
