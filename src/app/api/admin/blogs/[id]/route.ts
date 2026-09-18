import { auth } from "@/../auth";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const blogId = Number(id);

    if (!Number.isInteger(blogId)) {
      return NextResponse.json(
        { message: "Invalid blog ID." },
        { status: 400 },
      );
    }

    const blogs = await db.orm.public.Blog.all();

    const blog = blogs.find((item) => item.id === blogId);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Fetch blog error:", error);

    return NextResponse.json(
      { message: "Failed to fetch blog." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const blogId = Number(id);

    if (!Number.isInteger(blogId)) {
      return NextResponse.json(
        { message: "Invalid blog ID." },
        { status: 400 },
      );
    }

    const blogs = await db.orm.public.Blog.all();

    const blog = blogs.find((item) => item.id === blogId);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found." },
        { status: 404 },
      );
    }

    const body = await request.json();

    const updateData: {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      category?: string;
      imageUrl?: string;
      readTime?: string;
      published?: boolean;
      updatedAt?: string;
    } = {};

    if (body.title !== undefined) {
      const title = String(body.title).trim();

      if (!title) {
        return NextResponse.json(
          { message: "Title cannot be empty." },
          { status: 400 },
        );
      }

      updateData.title = title;
    }

    if (body.slug !== undefined) {
      const slug = String(body.slug).trim();

      if (!slug) {
        return NextResponse.json(
          { message: "Slug cannot be empty." },
          { status: 400 },
        );
      }

      updateData.slug = slug;
    }

    if (body.excerpt !== undefined) {
      const excerpt = String(body.excerpt).trim();

      if (!excerpt) {
        return NextResponse.json(
          { message: "Excerpt cannot be empty." },
          { status: 400 },
        );
      }

      updateData.excerpt = excerpt;
    }

    if (body.content !== undefined) {
      const content = String(body.content).trim();

      if (!content) {
        return NextResponse.json(
          { message: "Content cannot be empty." },
          { status: 400 },
        );
      }

      updateData.content = content;
    }

    if (body.category !== undefined) {
      const category = String(body.category).trim();

      if (!category) {
        return NextResponse.json(
          { message: "Category cannot be empty." },
          { status: 400 },
        );
      }

      updateData.category = category;
    }

    if (body.imageUrl !== undefined) {
      const imageUrl = String(body.imageUrl).trim();

      if (!imageUrl) {
        return NextResponse.json(
          { message: "Image URL cannot be empty." },
          { status: 400 },
        );
      }

      try {
        new URL(imageUrl);
      } catch {
        return NextResponse.json(
          { message: "Please provide a valid image URL." },
          { status: 400 },
        );
      }

      updateData.imageUrl = imageUrl;
    }

    if (body.readTime !== undefined) {
      const readTime = String(body.readTime).trim();

      if (!readTime) {
        return NextResponse.json(
          { message: "Read time cannot be empty." },
          { status: 400 },
        );
      }

      updateData.readTime = readTime;
    }

    if (body.published !== undefined) {
      updateData.published = Boolean(body.published);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No fields provided for update." },
        { status: 400 },
      );
    }

    updateData.updatedAt = new Date().toISOString();

    await db.orm.public.Blog.where({ id: blogId }).update(
      updateData,
    );

    return NextResponse.json(
      { message: "Blog updated successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update blog error:", error);

    return NextResponse.json(
      { message: "Failed to update blog." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext,
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const blogId = Number(id);

    if (!Number.isInteger(blogId)) {
      return NextResponse.json(
        { message: "Invalid blog ID." },
        { status: 400 },
      );
    }

    const blogs = await db.orm.public.Blog.all();

    const blog = blogs.find((item) => item.id === blogId);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found." },
        { status: 404 },
      );
    }

    await db.orm.public.Blog.where({ id: blogId }).delete();

    return NextResponse.json(
      { message: "Blog deleted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete blog error:", error);

    return NextResponse.json(
      { message: "Failed to delete blog." },
      { status: 500 },
    );
  }
}