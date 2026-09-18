import { db } from "@/prisma/db";
import ArticleGrid from "@/components/blog/ArticleGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function BlogsPage() {
  const blogs = await db.orm.public.Blog.all();

  const publishedBlogs = blogs
    .filter((blog) => blog.published)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    );

  return (
    <main>
      {/* Page Header */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Explore"
            title="Blogs"
            description="Practical blogs, tutorials and insights about modern web development, programming and technology."
          />
        </div>
      </section>

      {/* Blog List */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            All Blogs
          </h2>
        </div>

        <ArticleGrid blogs={publishedBlogs} />
      </section>
    </main>
  );
}