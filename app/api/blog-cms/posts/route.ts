
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { db } from "@/db";
import { posts, users, postToCategories, postToTags } from "@/db/schema";

type CreatePostPayload = {
    title: string;
    slug?: string;
    content: string;
    excerpt?: string;
    coverImage?: string;
    categoryIds?: string[];
    tagIds?: string[];
    authorId?: string;
    status?: "draft" | "published" | "archived";
    publishedAt?: string; // ISO date string
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get("q");
        const status = searchParams.get("status");

        const filters = [];
        if (query) {
            filters.push(
                sql`(${ilike(posts.title, `%${query}%`)} OR ${ilike(
                    posts.content,
                    `%${query}%`
                )})`
            );
        }
        if (status) {
            // safe cast or validation needed in real app, but for now simple string cast
            filters.push(eq(posts.status, status as "draft" | "published" | "archived"));
        }

        const where = filters.length ? and(...filters) : undefined;

        // Use query builder for simpler relation fetching if needed, but for now simple select with author join is safer
        // Drizzle's query.findMany is often cleaner for relations
        const data = await db.query.posts.findMany({
            where: where,
            orderBy: [desc(posts.createdAt)],
            with: {
                author: {
                    columns: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                categories: {
                    with: {
                        category: true,
                    },
                },
            },
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch posts",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { userId: clerkUserId } = await auth();
        if (!clerkUserId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Lookup database user ID from Clerk ID
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.clerkId, clerkUserId))
            .limit(1);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found in database" },
                { status: 404 }
            );
        }

        const body = (await request.json()) as CreatePostPayload;
        const {
            title,
            slug: providedSlug,
            content,
            excerpt,
            coverImage,
            categoryIds = [],
            tagIds = [],
            authorId,
            status = "draft",
            publishedAt,
        } = body;

        if (!title || !content) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required fields: title, content",
                },
                { status: 400 }
            );
        }

        // Generate slug if not provided
        let finalSlug = providedSlug || title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");

        // Basic uniqueness check (append random string if needed) could be here, 
        // but for now relying on database constraint or client to provide unique slug.
        // Or simply append a timestamp to ensure uniqueness if auto-generating
        if (!providedSlug) {
            finalSlug = `${finalSlug}-${Date.now()}`;
        }

        // Transaction for creating post and linking categories
        const result = await db.transaction(async (tx) => {
            const [newPost] = await tx
                .insert(posts)
                .values({
                    title,
                    slug: finalSlug,
                    content,
                    excerpt,
                    coverImage,
                    authorId: authorId || user.id,
                    status,
                    publishedAt: publishedAt ? new Date(publishedAt) : (status === 'published' ? new Date() : null),
                })
                .returning();

            if (categoryIds.length > 0) {
                await tx.insert(postToCategories).values(
                    categoryIds.map((catId) => ({
                        postId: newPost.id,
                        categoryId: catId,
                    }))
                );
            }

            if (tagIds.length > 0) {
                await tx.insert(postToTags).values(
                    tagIds.map((tagId) => ({
                        postId: newPost.id,
                        tagId: tagId,
                    }))
                );
            }

            return newPost;
        });

        return NextResponse.json(
            { success: true, data: result, message: "Post created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create post",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
