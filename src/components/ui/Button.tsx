import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium transition-colors";

  const variantClasses =
    variant === "primary"
      ? "bg-gray-900 text-white hover:bg-gray-700"
      : "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </Link>
  );
}