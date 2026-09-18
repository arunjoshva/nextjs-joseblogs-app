import { auth } from "@/../auth";
import { db } from "@/prisma/db";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminBlogsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const blogs = await db.orm.public.Blog.all();

  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime(),
  );

  return (
    <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
              Manage Blogs
            </h1>

            <p className="mt-2 text-gray-600">
              View and manage your blog posts.
            </p>
          </div>

          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            Create New Blog
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {sortedBlogs.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                No blogs found
              </h2>

              <p className="mt-2 text-gray-600">
                Create your first blog post to see it here.
              </p>

              <Link
                href="/admin/blogs/new"
                className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition-colors hover:bg-gray-800"
              >
                Create New Blog
              </Link>
            </div>
          ) : (
            <div className="w-full">
              <table className="w-full table-fixed">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900 sm:px-6">
                      Blog
                    </th>

                    <th className="w-28 px-3 py-4 text-left text-sm font-semibold text-gray-900 sm:w-auto sm:px-6">
                      Status
                    </th>

                    <th className="w-24 px-3 py-4 text-center text-sm font-semibold text-gray-900 sm:w-auto sm:px-6">
                      Actions
                    </th>

                    <th className="hidden px-6 py-4 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                      Category
                    </th>

                    <th className="hidden px-6 py-4 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                      Read Time
                    </th>

                    <th className="hidden px-6 py-4 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                      Updated
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {sortedBlogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-4 py-5 sm:px-6">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-900">
                            {blog.title}
                          </p>

                          <p className="mt-1 truncate text-sm text-gray-500">
                            /{blog.slug}
                          </p>
                        </div>
                      </td>

                      <td className="px-3 py-5 sm:px-6">
                        {blog.published ? (
                          <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 sm:px-3">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 sm:px-3">
                            Draft
                          </span>
                        )}
                      </td>

                      <td className="px-3 py-5 sm:px-6">
                        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                          >
                            View
                          </Link>

                          <Link
                            href={`/admin/blogs/${blog.id}/edit`}
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                          >
                            Edit
                          </Link>

                          <DeleteBlogButton
                            blogId={blog.id}
                            blogTitle={blog.title}
                          />
                        </div>
                      </td>

                      <td className="hidden px-6 py-5 sm:table-cell">
                        <span className="text-sm text-gray-700">
                          {blog.category}
                        </span>
                      </td>

                      <td className="hidden px-6 py-5 sm:table-cell">
                        <span className="text-sm text-gray-700">
                          {blog.readTime}
                        </span>
                      </td>

                      <td className="hidden px-6 py-5 sm:table-cell">
                        <span className="text-sm text-gray-700">
                          {new Date(
                            blog.updatedAt,
                          ).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}