import ArticleCard from "./ArticleCard";

export default function RelatedBlogs() {
  return (
    <section className="border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Related Blogs
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* {relatedBlogs.map((blog) => (
          <ArticleCard key={blog.slug} {...blog} />
        ))} */}
      </div>
    </section>
  );
}