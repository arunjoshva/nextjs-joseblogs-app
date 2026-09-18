"use client";

import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string | null;
  readTime: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [blog, setBlog] = useState<Blog | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    imageUrl: "",
    readTime: "",
    published: false,
  });

  useEffect(() => {
    async function fetchBlog() {
      try {
        setIsLoading(true);
        setError("");

        const response = await axios.get(
          `/api/admin/blogs/${blogId}`,
        );

        const data: Blog = response.data;

        setBlog(data);

        setFormData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          category: data.category,
          imageUrl: data.imageUrl ?? "",
          readTime: data.readTime,
          published: data.published,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Failed to load blog.",
          );
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlog();
  }, [blogId]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));

    setSuccess("");
    setError("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.patch(
        `/api/admin/blogs/${blogId}`,
        {
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          imageUrl: formData.imageUrl,
          readTime: formData.readTime,
          published: formData.published,
        },
      );

      if (response.status === 200) {
        setSuccess("Blog updated successfully!");

        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 100);

        setTimeout(() => {
          router.push("/admin/blogs");
        }, 1500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Failed to update blog. Please try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-6 py-12">
        <p className="text-gray-600">Loading blog...</p>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Blog Not Found
          </h1>

          <p className="mt-2 text-gray-600">
            The blog you are trying to edit could not be found.
          </p>

          <Link
            href="/admin/blogs"
            className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            Back to Blogs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/admin/blogs"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            ← Back to Blogs
          </Link>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Edit Blog
          </h1>

          <p className="mt-2 text-gray-600">
            Update your blog post.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-900"
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-900"
              >
                Slug
              </label>

              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />

              <p className="mt-2 text-sm text-gray-500">
                This will be used in the blog URL.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-900"
                >
                  Category
                </label>

                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div>
                <label
                  htmlFor="readTime"
                  className="block text-sm font-medium text-gray-900"
                >
                  Read Time
                </label>

                <input
                  id="readTime"
                  name="readTime"
                  type="text"
                  value={formData.readTime}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-900"
              >
                Image URL
              </label>

              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                placeholder="https://res.cloudinary.com/..."
              />

              <p className="mt-2 text-sm text-gray-500">
                Paste the image URL from Cloudinary or another image host.
              </p>
            </div>

            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-900"
              >
                Excerpt
              </label>

              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={4}
                className="mt-2 w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-900"
              >
                Content
              </label>

              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={16}
                className="mt-2 w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="published"
                name="published"
                type="checkbox"
                checked={formData.published}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />

              <div>
                <label
                  htmlFor="published"
                  className="text-sm font-medium text-gray-900"
                >
                  Published
                </label>

                <p className="mt-1 text-sm text-gray-500">
                  Published blogs are visible on the public blog pages.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/admin/blogs"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 font-medium
                    text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60
                    cursor-pointer"
              >
                {isSubmitting ? "Updating..." : "Update Blog"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}