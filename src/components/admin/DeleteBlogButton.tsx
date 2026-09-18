"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteBlogButtonProps = {
  blogId: number;
  blogTitle: string;
};

export default function DeleteBlogButton({
  blogId,
  blogTitle,
}: DeleteBlogButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleCancel() {
    if (isDeleting) {
      return;
    }

    setIsOpen(false);
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await axios.delete(`/api/admin/blogs/${blogId}`);

      setIsOpen(false);

      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        window.alert(
          error.response?.data?.message ||
            "Failed to delete blog.",
        );
      } else {
        window.alert(
          "Something went wrong. Please try again.",
        );
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={isDeleting}
        className="text-sm font-medium text-red-600 transition-colors hover:text-red-800 
            disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        Delete
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={handleCancel}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-blog-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="delete-blog-title"
              className="text-xl font-bold text-gray-900 text-center"
            >
              Delete Blog
            </h2>

            <p className="mt-3 text-gray-600 text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                "{blogTitle}"
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-gray-500 text-center">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isDeleting}
                className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition-colors 
                    hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition-colors hover:bg-red-700 
                    disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}