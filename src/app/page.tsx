import { db } from "@/prisma/db";
import ArticleGrid from "@/components/blog/ArticleGrid";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const blogs = await db.orm.public.Blog.all();

  const publishedBlogs = blogs
    .filter((blog) => blog.published)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    );

  const featuredBlog = publishedBlogs[0];
  const latestBlogs = publishedBlogs.slice(1, 4);

  return (
    <main>
      {/* Hero Section */}
      <section className="w-full">
        <Link href="/blogs">
          <Image
            src="/images/hero_section.png"
            alt="JoseBlogs - Ideas Today, A Better Tomorrow"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            className="h-auto w-full"
          />
        </Link>
      </section>

      {/* Featured Blog */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Featured"
          title="Featured Blog"
          description="Explore one of our latest blogs about modern web development."
        />

        {featuredBlog ? (
          <FeaturedArticle blog={featuredBlog} />
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No featured blog available
            </h2>

            <p className="mt-2 text-gray-600">
              Check back soon for new blogs.
            </p>
          </div>
        )}
      </section>

      {/* Latest Blogs */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionHeading
          eyebrow="Discover"
          title="Latest Blogs"
          description="Practical blogs, tutorials and insights for modern developers."
        />

        <ArticleGrid blogs={latestBlogs} />
      </section>
    </main>
  );
}