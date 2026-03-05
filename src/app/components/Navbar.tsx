"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Flame, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  title?: string;
  subtitle?: string;
  onLogout?: () => void;
}

export default function Navbar({
  title,
  subtitle,
  onLogout,
}: NavbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const avatarInitial = useMemo(
    () => user?.name?.trim().charAt(0).toUpperCase() || "U",
    [user]
  );

  const navItems = useMemo(
    () => [
      { label: "Explore", href: "/learn", activeWhen: /^\/learn$/ },
      { label: "Problems", href: "/problems", activeWhen: /^\/problems/ },
      { label: "Contest", href: "/competitions", activeWhen: /^\/competitions/ },
      { label: "Discuss", href: "/progress", activeWhen: /^\/progress/ },
      { label: "Interview", href: "/tracks", activeWhen: /^\/tracks/ },
    ],
    []
  );

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
      return;
    }
    await logout();
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-zinc-800 bg-[#1a1c22]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-14 w-full max-w-[1580px] items-center justify-between gap-3 px-3 md:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold text-zinc-100 hover:bg-zinc-800/70"
          >
            <span className="text-lg text-amber-400">⌂</span>
            <span>MLBoost</span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = item.activeWhen.test(pathname);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-md px-3 py-1.5 text-sm transition ${
                    isActive
                      ? "bg-zinc-700/80 font-medium text-white"
                      : "text-zinc-300 hover:bg-zinc-800/70 hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-amber-400 hover:bg-zinc-800/70">
              Store <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden h-9 items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/60 px-3 text-zinc-400 md:flex">
            <Search className="h-4 w-4" />
            <input
              aria-label="Search"
              placeholder="Search"
              className="w-36 bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
            />
          </div>
          <button
            aria-label="Notifications"
            className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            aria-label="Streak"
            className="inline-flex items-center gap-1 rounded-md p-2 text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100"
          >
            <Flame className="h-4 w-4" />
            <span className="hidden text-xs text-zinc-500 sm:inline">0</span>
          </button>
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/90 text-xs font-semibold text-zinc-900">
            {avatarInitial}
          </div>
          <button className="rounded-lg bg-amber-500/20 px-3 py-1.5 text-sm text-amber-300 hover:bg-amber-500/30">
            Premium
          </button>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-zinc-700 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Logout
          </button>
        </div>
      </nav>
      {(title || subtitle) && (
        <div className="mx-auto flex w-full max-w-[1580px] items-center justify-between px-3 pb-2 md:px-6 lg:px-8">
          <div className="min-w-0">
            {title ? (
              <h1 className="truncate text-sm font-semibold tracking-tight text-zinc-200 md:text-base">
                {title}
              </h1>
            ) : null}
            {subtitle ? (
              <p className="truncate text-xs text-zinc-500">{subtitle}</p>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
