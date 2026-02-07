"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { BlogPost, BlogCategory } from "@/features/blog/interfaces";

// Public Blog Service
export function useBlogPosts(filters?: { q?: string; status?: string }) {
    return useQuery({
        queryKey: ["public-posts", filters],
        queryFn: async () => {
            const { data } = await apiClient.get("/api/blog-cms/posts", {
                params: {
                    ...filters,
                    status: filters?.status || "published", // Default to published for public
                },
            });
            return data.data as BlogPost[];
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useBlogCategories() {
    return useQuery({
        queryKey: ["blog-categories"],
        queryFn: async () => {
            const { data } = await apiClient.get("/api/blog-cms/categories");
            return data.data as BlogCategory[];
        },
        staleTime: 60 * 60 * 1000, // 1 hour
    });
}

export function useBlogPostDetail(id?: string) {
    return useQuery({
        queryKey: ["post-detail", id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/api/blog-cms/posts/${id}`);
            return data.data as BlogPost;
        },
        enabled: !!id,
    });
}

export function useBlogPostBySlug(slug?: string) {
    return useQuery({
        queryKey: ["post-detail-slug", slug],
        queryFn: async () => {
            const { data } = await apiClient.get(`/api/blog-cms/posts/slug/${slug}`);
            return data.data as BlogPost;
        },
        enabled: !!slug,
    });
}
