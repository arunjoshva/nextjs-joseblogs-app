import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  imageUrl: string | null;
  readTime: string;
};

export default function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  imageUrl,
  readTime,
}: ArticleCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
      <Link href={`/blogs/${slug}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No image available
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-gray-500">
              {category}
            </span>

            <span className="text-sm text-gray-500">
              {readTime}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900">
            {title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
            {excerpt}
          </p>

          <span className="mt-5 inline-flex text-sm font-semibold text-gray-900">
            Read Blog →
          </span>
        </div>
      </Link>
    </article>
  );
}