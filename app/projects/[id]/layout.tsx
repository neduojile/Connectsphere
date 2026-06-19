"use client";

import Link from "next/link";
import {
  useParams,
  usePathname,
} from "next/navigation";
import {
  useState,
} from "react";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params =
    useParams();

  const pathname =
    usePathname();

  const [menuOpen,
    setMenuOpen] =
    useState(false);

const links = [
  {
    name: "Overview",
    href: `/projects/${params.id}/overview`,
  },
  {
    name: "Chat",
    href: `/projects/${params.id}/chat`,
  },
  {
    name: "Resources",
    href: `/projects/${params.id}/resources`,
  },
  
  {
    name: "Q&A",
    href: `/projects/${params.id}/questions`,
  },
  {
    name: "Announcements",
    href: `/projects/${params.id}/announcements`,
  },
  {
    name: "Members",
    href: `/projects/${params.id}/members`,
  },
];

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="border-b border-zinc-800 p-4 lg:hidden">

        <button
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          className="rounded-xl bg-zinc-900 px-4 py-2"
        >
          Workspace Menu
        </button>

      </div>

      {menuOpen && (

        <div className="border-b border-zinc-800 p-4 lg:hidden">

          <nav className="space-y-2">

            {links.map(
              (link) => (

                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() =>
                    setMenuOpen(
                      false
                    )
                  }
                  className={`block rounded-xl px-4 py-3 ${
                    pathname ===
                    link.href
                      ? "bg-orange-500 text-black"
                      : "bg-zinc-900"
                  }`}
                >
                  {link.name}
                </Link>

              )
            )}

          </nav>

        </div>

      )}

      <div className="mx-auto flex max-w-[1700px]">

        <aside className="hidden w-72 border-r border-zinc-800 p-6 lg:block">

          <h2 className="mb-2 text-3xl font-black">
            Workspace
          </h2>

          <p className="mb-8 text-sm text-zinc-500">
            Project Navigation
          </p>

          <nav className="space-y-2">

            {links.map(
              (link) => (

                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 transition ${
                    pathname ===
                    link.href
                      ? "bg-orange-500 text-black"
                      : "hover:bg-zinc-900"
                  }`}
                >
                  {link.name}
                </Link>

              )
            )}

          </nav>

        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">

          <div className="mb-6 xl:hidden">

            <button
              className="
              w-full
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              p-4
              text-left
              "
            >
              Workspace Panel
            </button>

          </div>

          {children}

        </main>

        <aside className="hidden w-80 border-l border-zinc-800 p-6 xl:block">

          <h3 className="mb-6 text-xl font-bold">
            Workspace Intelligence
          </h3>

          <div className="space-y-5">

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">

              <p className="text-sm text-zinc-500">
                Workspace Health
              </p>

              <h2 className="mt-2 text-3xl font-black text-green-500">
                100%
              </h2>

            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">

              <p className="text-sm text-zinc-500">
                Completion Progress
              </p>

              <div className="mt-4 h-3 rounded-full bg-zinc-800">

                <div className="h-3 w-[15%] rounded-full bg-orange-500" />

              </div>

              <p className="mt-3 text-sm">
                15% Complete
              </p>

            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">

              <p className="mb-4 text-sm text-zinc-500">
                Latest Announcement
              </p>

              <div className="rounded-2xl bg-black p-4">
                No announcements yet
              </div>

            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">

              <p className="mb-4 text-sm text-zinc-500">
                Active Contributors
              </p>

              <div className="space-y-3">

                <div className="rounded-xl bg-black p-3">
                  No contributors yet
                </div>

              </div>

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}