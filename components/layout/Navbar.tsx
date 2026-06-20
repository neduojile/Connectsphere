"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 md:px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
        >
          <div className="overflow-hidden rounded-full shrink-0">
            <img
              src="/images/logo.png"
              alt="ConnectSphere"
              className="h-8 w-8 md:h-10 md:w-10 object-cover"
            />
          </div>

          <span className="truncate text-sm font-black text-white sm:text-base md:text-xl">
            ConnectSphere
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden md:flex items-center gap-6">

          <Link
            href="/"
            className="text-zinc-300 transition hover:text-orange-500"
          >
            Home
          </Link>

          <Link
            href="/login"
            className="text-zinc-300 transition hover:text-orange-500"
          >
            Communities
          </Link>

          <Link
            href="/login"
            className="text-zinc-300 transition hover:text-orange-500"
          >
            Projects
          </Link>

          <Link
            href="/login"
            className="text-zinc-300 transition hover:text-orange-500"
          >
            Opportunities
          </Link>

        </nav>

        {/* Auth Buttons */}

        <div className="flex shrink-0 items-center gap-2">

          <Link
            href="/login"
            className="rounded-xl border border-zinc-700 px-3 py-2 text-xs sm:text-sm transition hover:border-orange-500"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-orange-500 px-3 py-2 text-xs sm:text-sm font-medium text-black transition hover:bg-orange-400"
          >
            Get Started
          </Link>

        </div>

      </div>
    </header>
  );
}