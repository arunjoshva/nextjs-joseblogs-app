import { auth } from "@/../auth";
import { db } from "@/prisma/db";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({
  params,
}: BlogPageProps) {
  const { slug } = await params;

  const session = await auth();

  const blogs = await db.orm.public.Blog.all();

  const blog = blogs.find(
    (item) => item.slug === slug && item.published,
  );

  if (!blog) {
    notFound();
  }

  const backToBlogsUrl = session?.user
    ? "/admin/blogs"
    : "/blogs";

  return (
    <main className="min-h-[calc(100vh-73px)] bg-white">
      <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <Link
          href={backToBlogsUrl}
          className="inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          ← Back to Blogs
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
              {blog.category}
            </span>

            <span className="text-gray-500">
              {blog.readTime}
            </span>

            <span className="text-gray-400">•</span>

            <span className="text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            {blog.excerpt}
          </p>
        </header>

        {blog.imageUrl && (
          <div className="mt-10 overflow-hidden rounded-2xl">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="mt-10 border-t border-gray-200 pt-10">
          <div className="whitespace-pre-wrap text-base leading-8 text-gray-700 sm:text-lg">
            {blog.content}
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link
            href={backToBlogsUrl}
            className="inline-flex rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            ← Back to Blogs
          </Link>
        </div>
      </article>
    </main>
  );
}