"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { UserRole } from "@/enums/common";
import { Toast } from "@/components/ui/Toast";
import { useQueryClient } from "@tanstack/react-query";

import { UserCreateEditForm } from "@/features/users/form/UserCreateEditForm";
import { CreateOrEditFormWrapper } from "@/components/form/CreateOrEditFormWrapper";

interface UserFormData {
  email: string;
  firstName: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  role: UserRole;
}

export default function CreateUserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Initial values for the form
  const defaultValues: Partial<UserFormData> = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    role: UserRole.STUDENT,
  };

  const handleCreateUser = async (formData: UserFormData) => {
    setError(null);
    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = data.message || "Failed to create user";
        if (data.details && Array.isArray(data.details)) {
          const detailsStr = data.details
            .map((d: any) => d.message || d.code || JSON.stringify(d))
            .join("; ");
          errorMessage = `${errorMessage}: ${detailsStr}`;
        }
        throw new Error(errorMessage);
      }

      setSuccess(true);
      Toast({
        title: "Success",
        description: "User created successfully!",
        color: "success",
      });

      // Invalidate users list
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      // Redirect after delay
      setTimeout(() => {
        router.push("/users");
      }, 1000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      setError(msg);
      Toast({
        title: "Error",
        description: msg,
        color: "danger",
      });
    }
  };

  // if (success) {
  //   return (
  //     <div className="max-w-4xl mx-auto p-4">
  //       <div className="flex gap-2 items-start bg-green-50 border border-green-200 rounded-lg p-3">
  //         <Icon
  //           icon="lucide:check-circle-2"
  //           className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
  //         />
  //         <div className="text-sm text-green-800">
  //           <p className="font-semibold">User created successfully!</p>
  //           <p>Redirecting to user list...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="flex flex-col items-start px-4 py-4">
          <h1 className="text-2xl font-bold">Create New User</h1>
          <p className="text-sm text-gray-500">
            Add a new user account with role assignment
          </p>
        </CardHeader>
        <CardBody>
          {error && (
            <div className="flex gap-2 items-start bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <Icon
                icon="lucide:alert-circle"
                className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
              />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <CreateOrEditFormWrapper<UserFormData>
            onSubmit={handleCreateUser}
            defaultValues={defaultValues}
            mode="create"
          >
            <UserCreateEditForm mode="create" />
          </CreateOrEditFormWrapper>
        </CardBody>
      </Card>
    </div>
  );
}
