"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import type { AuthUser } from "@/lib/auth";

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrator",
  owner: "Eigentümer",
  manager: "Verwalter",
};

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/apartments", label: "Wohnungen" },
  { href: "/alerts", label: "Meldungen" },
  { href: "/settings", label: "Einstellungen" },
];

type NavbarProps = {
  user: AuthUser | null;
};

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-white border-r border-gray-200 flex flex-col z-10">
      <div className="px-6 py-5 border-b border-gray-100">
        <p className="text-base font-bold text-gray-900 tracking-tight">
          Project X
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Energy Management</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#E6F1FB] text-[#185FA5]"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="mb-3 px-2">
            <p className="text-xs font-medium text-gray-900 truncate">
              {user.fullName ?? user.email}
            </p>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {user.fullName ? user.email : null}
            </p>
            <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-[#E6F1FB] text-[#185FA5] text-xs font-medium">
              {ROLE_LABELS[user.role] ?? user.role}
            </span>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors text-left"
            >
              Abmelden
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
