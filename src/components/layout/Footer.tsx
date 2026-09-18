import Link from "next/link";

export default function Footer(){
    return(
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl px-6 py-4 items-center justify-center">
                <p className="text-gray-600">© 2026 {" "} <Link href="/" className="transition-colors hover:text-gray-900">JoseBlogs</Link>{" "} | All Rights Reserved</p>
            </div>
        </footer>
    );
}