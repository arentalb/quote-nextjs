import Link from "next/link";
import { MoveRight } from "lucide-react";
import React from "react";

interface MagicLinkProps {
  href: string;
  title: string;
}

export default function MagicLink({ href, title }: MagicLinkProps) {
  return (
    <div className="flex items-end justify-end mt-8">
      <Link
        href={href}
        className="group flex items-center justify-center gap-2 text-sm text-gray-600 transition-all"
      >
        <p className="transition-all group-hover:scale-105 group-hover:text-gray-400">
          {title}
        </p>
        <MoveRight className="w-5 h-5 transition-all group-hover:scale-105 group-hover:translate-x-2 group-hover:text-gray-400" />
      </Link>
    </div>
  );
}
