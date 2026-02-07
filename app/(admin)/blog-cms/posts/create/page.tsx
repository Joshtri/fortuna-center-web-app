"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogForm from "@/features/blog/BlogForm";
import { BlogCategory, BlogAuthor, BlogTag } from "@/features/blog/interfaces";
import { NAV_URL } from "@/constants/url";

export default function CreateBlogPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch categories for the select input
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/blog/categories");
        const json = await res.json();
        if (json.success) {
          setCategories(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    // Fetch tags
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/blog-cms/tags");
        const json = await res.json();
        if (json.success) {
          setTags(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    // Fetch authors
    const fetchAuthors = async () => {
      try {
        const res = await fetch("/api/users?source=db");
        const json = await res.json();
        if (json.success) {
          setAuthors(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch authors:", error);
      }
    };

    fetchCategories();
    fetchTags();
    fetchAuthors();
  }, []);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blog-cms/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const json = await res.json();
        router.push(NAV_URL.ADMIN.BLOG_CMS.POSTS);
      } else {
        const error = await res.json();
        alert(`Failed to create post: ${error.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-default-900">Create New Post</h1>
        <p className="text-default-500 mt-1">
          Write a new article for the blog
        </p>
      </div>

      <BlogForm
        categories={categories}
        tags={tags}
        authors={authors}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
