import { auth } from "@/../auth";
import LogoutButton from "@/components/admin/LogoutButton";
import { db } from "@/prisma/db";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Unauthorized
          </h1>

          <p className="mt-2 text-gray-600">
            Please sign in to access the admin dashboard.
          </p>

          <Link
            href="/admin/login"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  const [totalBlogs, publishedBlogs] = await Promise.all([
    db.orm.public.Blog.aggregate((agg) => ({
      total: agg.count(),
    })),

    db.orm.public.Blog.where({ published: true }).aggregate((agg) => ({
      total: agg.count(),
    })),
  ]);

  const draftCount = totalBlogs.total - publishedBlogs.total;

  return (
    <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                JoseBlogs Admin
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                Dashboard
              </h1>

              <p className="mt-2 text-gray-600">
                Welcome, {session.user.name ?? session.user.email}.
              </p>
            </div>

            <Link
              href="/admin/blogs"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Manage Blogs
            </Link>

           
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-500">
                Total Blogs
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {totalBlogs.total}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-500">
                Published
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {publishedBlogs.total}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-500">
                Drafts
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {draftCount}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Blog Management
            </h2>

            <p className="mt-2 text-gray-600">
              Create and manage your blog posts from the admin panel.
            </p>

            <div className="mt-6">
              <Link
                href="/admin/blogs/new"
                className="inline-flex rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                Create New Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}