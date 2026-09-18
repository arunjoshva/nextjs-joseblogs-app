import { auth } from "@/../auth";
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const blogs = await db.orm.public.Blog.all();

    const adminBlogs = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      category: blog.category,
      imageUrl: blog.imageUrl,
      readTime: blog.readTime,
      published: blog.published,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));

    return NextResponse.json(adminBlogs);
  } catch (error) {
    console.error("Fetch admin blogs error:", error);

    return NextResponse.json(
      { message: "Failed to fetch blogs." },
      { status: 500 },
    );
  }
}