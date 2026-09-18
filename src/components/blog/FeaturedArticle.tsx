import Image from "next/image";
import Button from "../ui/Button";

type FeaturedBlog = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  imageUrl: string | null;
  readTime: string;
};

type FeaturedArticleProps = {
  blog: FeaturedBlog;
};

export default function FeaturedArticle({
  blog,
}: FeaturedArticleProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
      <div className="grid md:grid-cols-2">
        {/* Featured Image */}
        <div className="relative aspect-video bg-gray-200 md:aspect-auto">
          {blog.imageUrl ? (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full min-h-64 items-center justify-center text-gray-500">
              No image available
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 md:p-10">
          <span className="text-sm font-semibold text-gray-500">
            {blog.category}
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {blog.title}
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            {blog.excerpt}
          </p>

          <p className="mt-4 text-sm text-gray-500">
            {blog.readTime}
          </p>

          <div className="mt-6">
            <Button href={`/blogs/${blog.slug}`}>
              Read Blog
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}