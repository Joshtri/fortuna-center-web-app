"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Avatar,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { BlogPost, BlogCategory, BlogAuthor, BlogTag } from "./interfaces";
import { Icon } from "@iconify/react";
import TextEditor from "@/components/editor/TextEditor";

interface BlogFormProps {
  initialData?: BlogPost;
  categories: BlogCategory[];
  tags: BlogTag[];
  authors?: BlogAuthor[];
  onSubmit: (data: unknown) => Promise<void>;
  isLoading?: boolean;
}

export default function BlogForm({
  initialData,
  categories,
  tags,
  authors = [],
  onSubmit,
  isLoading = false,
}: BlogFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      // slug: initialData?.slug || "",
      content: initialData?.content || "", // Make sure content maps correctly even if html
      excerpt: initialData?.excerpt || "",
      coverImage: initialData?.coverImage || "", // Assuming this field exists on BlogPost interface now? Warning check interface
      status: initialData?.status || "draft",
      categoryIds: initialData?.categories?.map((c) => c.category.id) || [],
      tagIds: (initialData as any)?.tags?.map((t: any) => t.tag.id) || [], // Cast because interface update might propagate slow
      authorId: initialData?.author?.id || "",
      publishedAt: initialData?.publishedAt
        ? new Date(initialData.publishedAt).toISOString().split("T")[0]
        : "",
    },
  });

  // Auto-generate slug from title if creating new post
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setValue("title", newTitle);
    /* if (!initialData) {
      const slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", slug);
    } */
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-default-200 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon icon="solar:document-text-bold" className="text-primary" />
              Content
            </h2>

            <Input
              label="Title"
              placeholder="Enter post title"
              variant="bordered"
              {...register("title", { required: "Title is required" })}
              onChange={handleTitleChange}
              errorMessage={errors.title?.message as string}
              isInvalid={!!errors.title}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <div className="bg-white text-black rounded-xl overflow-hidden border border-default-200 focus-within:ring-2 ring-primary/50 transition-all min-h-[400px]">
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: "Content is required" }}
                  render={({ field }) => (
                    <TextEditor
                      value={field.value}
                      onChange={field.onChange}
                      className="min-h-[350px]"
                    />
                  )}
                />
              </div>
              {errors.content && (
                <p className="text-danger text-xs">
                  {errors.content.message as string}
                </p>
              )}
            </div>

            <Textarea
              label="Excerpt"
              placeholder="Brief summary of the post..."
              variant="bordered"
              {...register("excerpt")}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-default-200 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon icon="solar:settings-bold" className="text-primary" />
              Settings
            </h2>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  label="Status"
                  variant="bordered"
                  selectedKeys={[field.value]}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <SelectItem key="draft">Draft</SelectItem>
                  <SelectItem key="published">Published</SelectItem>
                  <SelectItem key="archived">Archived</SelectItem>
                </Select>
              )}
            />

            <Input
              type="date"
              label="Publish Date"
              variant="bordered"
              {...register("publishedAt")}
              description="Leave empty to publish immediately upon saving."
            />

            <Controller
              name="categoryIds"
              control={control}
              render={({ field }) => (
                <Select
                  label="Categories"
                  variant="bordered"
                  selectionMode="multiple"
                  selectedKeys={new Set(field.value)}
                  onSelectionChange={(keys) => field.onChange(Array.from(keys))}
                  classNames={{
                    trigger: "min-h-unit-12 py-2",
                  }}
                >
                  {categories.map((category) => (
                    <SelectItem key={category.id}>{category.name}</SelectItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              name="tagIds"
              control={control}
              render={({ field }) => (
                <Select
                  label="Tags"
                  variant="bordered"
                  selectionMode="multiple"
                  selectedKeys={new Set(field.value)}
                  onSelectionChange={(keys) => field.onChange(Array.from(keys))}
                  classNames={{
                    trigger: "min-h-unit-12 py-2",
                  }}
                >
                  {tags.map((tag) => (
                    <SelectItem key={tag.id}>{tag.name}</SelectItem>
                  ))}
                </Select>
              )}
            />

            <Input
              label="Cover Image URL"
              placeholder="https://..."
              variant="bordered"
              {...register("coverImage")}
              startContent={
                <Icon icon="solar:link-bold" className="text-default-400" />
              }
            />

            {/* Author Selection */}
            {authors.length > 0 && (
              <Controller
                name="authorId"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Author"
                    variant="bordered"
                    placeholder="Select author"
                    selectedKeys={field.value ? [field.value] : []}
                    onChange={(e) => field.onChange(e.target.value)}
                    items={authors}
                  >
                    {(author) => (
                      <SelectItem key={author.id} textValue={author.fullName}>
                        <div className="flex items-center gap-2">
                          <Avatar
                            src={author.imageUrl}
                            name={author.fullName}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <span className="text-small">
                              {author.fullName}
                            </span>
                            <span className="text-tiny text-default-400">
                              {author.email}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                )}
              />
            )}
          </div>

          <div className="flex gap-3">
            <Button
              color="primary"
              variant="solid"
              type="submit"
              isLoading={isLoading}
              className="flex-1 font-bold"
              startContent={!isLoading && <Icon icon="solar:disk-bold" />}
            >
              Save Post
            </Button>
            <Button
              variant="flat"
              onPress={() => router.back()}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
