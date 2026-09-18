import { auth } from "@/../auth";
import { logoutAdmin } from "@/actions/admin";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const session = await auth();

  const isAuthenticated = Boolean(session?.user);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          JoseBlogs
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href={isAuthenticated ? "/admin/blogs" : "/blogs"}
            className="font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Blogs
          </Link>

          {isAuthenticated ? (
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="font-medium text-gray-700 transition-colors hover:text-gray-900 cursor-pointer"
              >
                Logout
              </button>
            </form>
          ) : (
            <Link
              href="/admin/login"
              className="font-medium text-gray-700 transition-colors hover:text-gray-900 cursor-pointer"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          <MobileMenu isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
}