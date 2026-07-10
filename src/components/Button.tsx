import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes =
    variant === "primary"
      ? "bg-gold text-ivory shadow-soft hover:bg-[#A87318]"
      : "border border-gold/45 bg-ivory/70 text-coffee hover:bg-gold/10";

  const baseClass =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-cream";

  if (props.target === "_blank") {
    return (
      <a href={href} className={`${baseClass} ${classes} ${className}`} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClass} ${classes} ${className}`} {...props}>
      {children}
    </Link>
  );
}
