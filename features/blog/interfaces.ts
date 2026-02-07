export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    coverImage: string | null;
    status: "draft" | "published" | "archived";
    publishedAt: string | null;
    createdAt: string;
    author: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        imageUrl: string | null;
    };
    categories: {
        category: {
            id: string;
            name: string;
            slug: string;
        };
    }[];
    tags: {
        tag: {
            id: string;
            name: string;
            slug: string;
        };
    }[];
    viewCount: number;
    likeCount: number;
}

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface BlogAuthor {
    id: string;
    fullName: string;
    email: string;
    imageUrl: string;
}

export interface BlogTag {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
}

export interface BlogComment {
    id: string;
    content: string;
    createdAt: string;
    isEdited: boolean;
    post: {
        id: string;
        title: string;
    };
    author: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        imageUrl: string | null;
    };
}
