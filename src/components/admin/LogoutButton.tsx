import { logoutAdmin } from "@/actions/admin";

export default function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-medium 
            text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
      >
        Logout
      </button>
    </form>
  );
}