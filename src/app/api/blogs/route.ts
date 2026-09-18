import { auth } from "@/../auth";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await db.orm.public.Blog.all();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Fetch blogs error:", error);

    return NextResponse.json(
      { message: "Failed to fetch blogs." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();

    const title = String(body.title || "").trim();
    const slug = String(body.slug || "").trim();
    const excerpt = String(body.excerpt || "").trim();
    const content = String(body.content || "").trim();
    const category = String(body.category || "").trim();
    const imageUrl = String(body.imageUrl || "").trim();
    const readTime = String(body.readTime || "").trim();
    const published = Boolean(body.published);

    if (
      !title ||
      !slug ||
      !excerpt ||
      !content ||
      !category ||
      !imageUrl ||
      !readTime
    ) {
      return NextResponse.json(
        { message: "All required fields must be provided." },
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

    await db.orm.public.Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      imageUrl,
      readTime,
      published,
    });

    return NextResponse.json(
      { message: "Blog created successfully!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create blog error:", error);

    return NextResponse.json(
      { message: "Failed to create blog." },
      { status: 500 },
    );
  }
}