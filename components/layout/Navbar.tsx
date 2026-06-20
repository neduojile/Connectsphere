"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
       <div className="overflow-hidden rounded-full">
  <img
    src="/images/logo.png"
    alt="ConnectSphere"
    className="h-10 w-10 object-cover"
  />
</div>

          <span className="text-xl font-black text-white">
            ConnectSphere
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-4 md:p-4 md:p-8 md:flex">

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

        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="rounded-xl border border-zinc-700 px-5 py-2 transition hover:border-orange-500"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-orange-500 px-5 py-2 font-medium text-black transition hover:bg-orange-400"
          >
            Get Started
          </Link>

        </div>

      </div>
    </header>
  );
}