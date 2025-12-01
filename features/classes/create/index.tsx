"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Switch, Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function ClassCreate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/classes");
      } else {
        console.error("Failed to create class");
      }
    } catch (error) {
      console.error("Error creating class:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          variant="light"
          startContent={<Icon icon="lucide:arrow-left" />}
          onPress={() => router.back()}
        >
          Back
        </Button>
      </div>

      <Card>
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold mb-6">Create New Class</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Class Code"
                placeholder="e.g., MATH101"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                isRequired
                variant="bordered"
              />

              <Input
                label="Class Name"
                placeholder="e.g., Mathematics 101"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                isRequired
                variant="bordered"
              />
            </div>

            <Textarea
              label="Description"
              placeholder="Enter class description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              variant="bordered"
              minRows={4}
            />

            <Switch
              isSelected={formData.isActive}
              onValueChange={(value) =>
                setFormData({ ...formData, isActive: value })
              }
            >
              Active
            </Switch>

            <div className="flex gap-4 justify-end">
              <Button
                variant="light"
                onPress={() => router.back()}
                isDisabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                isLoading={loading}
                startContent={!loading && <Icon icon="lucide:plus" />}
              >
                Create Class
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
