"use client";

import { logoutAdmin } from "@/actions/admin";
import Link from "next/link";
import { useState } from "react";

type MobileMenuProps = {
  isAuthenticated: boolean;
};

export default function MobileMenu({
  isAuthenticated,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        {isOpen ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <span className="text-2xl leading-none">☰</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          <Link
            href={isAuthenticated ? "/admin/blogs" : "/blogs"}
            onClick={closeMenu}
            className="block rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            Blogs
          </Link>

          {isAuthenticated ? (
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="block w-full rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-colors
                    hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
              >
                Logout
              </button>
            </form>
          ) : (
            <Link
              href="/admin/login"
              onClick={closeMenu}
              className="block rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Admin
            </Link>
          )}
        </div>
      )}
    </div>
  );
}