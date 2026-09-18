import ArticleCard from "./ArticleCard";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  imageUrl: string | null;
  readTime: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type ArticleGridProps = {
  blogs: Blog[];
};

export default function ArticleGrid({
  blogs,
}: ArticleGridProps) {
  if (blogs.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-12 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          No blogs available
        </h3>

        <p className="mt-2 text-gray-600">
          Check back soon for new blogs.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <ArticleCard
          key={blog.id}
          title={blog.title}
          slug={blog.slug}
          excerpt={blog.excerpt}
          category={blog.category}
          imageUrl={blog.imageUrl}
          readTime={blog.readTime}
        />
      ))}
    </div>
  );
}