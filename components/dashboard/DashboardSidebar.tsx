"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FolderKanban,
  User,
  Settings,
  Bot,
} from "lucide-react";



export default function DashboardSidebar() {
  const [profileImage, setProfileImage] =
  useState("");

const [initials, setInitials] =
  useState("U");
  const pathname = usePathname();

  useEffect(() => {
  async function loadProfile() {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (!storedUser) return;

    const user =
      JSON.parse(storedUser);

    setInitials(
      user.fullName
        ?.split(" ")
        .map(
          (name: string) =>
            name.charAt(0)
        )
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U"
    );

    try {
      const response =
        await fetch(
          "/api/profile",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
            }),
          }
        );

      const data =
        await response.json();

      setProfileImage(
        data.user?.profile
          ?.profileImage || ""
      );
    } catch (error) {
      console.error(error);
    }
  }

  loadProfile();
}, []);

  const inactiveLink =
  "text-zinc-700 dark:text-zinc-300 hover:bg-orange-500/10 hover:text-orange-500";

const activeLink =
  "bg-orange-500 text-black font-semibold";

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-border bg-white dark:bg-zinc-950">
      <div className="flex h-full flex-col p-8">


      <div>

  <div className="flex items-center gap-3">

    <img
      src="/images/logo.png"
      alt="ConnectSphere"
      className="h-12 w-12 object-contain"
    />

    <div>

      <h1 className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-2xl font-black text-transparent">
        ConnectSphere
      </h1>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Growth Command Center
      </p>

    </div>

  </div>
<div
  className="
    mt-8
    rounded-2xl
    border
    border-orange-500/20
    bg-orange-500/5
    p-4
    backdrop-blur
  "
>

  <div className="flex items-center gap-3">

    {profileImage ? (
      <img
        src={profileImage}
        alt="Profile"
        className="
          h-14
          w-14
          rounded-full
          border-2
          border-orange-500
          object-cover
        "
      />
    ) : (
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-orange-500
          text-lg
          font-bold
          text-black
        "
      >
        {initials}
      </div>
    )}

    <div>

      <p className="font-semibold">
        My Profile
      </p>

      <p className="text-xs text-zinc-400">
        ConnectSphere Member
      </p>

    </div>

  </div>

</div>
          <nav className="mt-12 space-y-3">

            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
               pathname === "/dashboard"
  ? activeLink
  : inactiveLink
              }`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              href="/communities"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname === "/communities"
                  ? activeLink
                  : inactiveLink
              }`}
            >
              <Users size={20} />
              Communities
            </Link>

            <Link
              href="/opportunities"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname === "/opportunities"
                  ? activeLink
                  : inactiveLink
              }`}
            >
              <Briefcase size={20} />
              Opportunities
            </Link>

            <Link
              href="/projects"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname === "/projects"
                  ? activeLink
                  : inactiveLink
              }`}
            >
              <FolderKanban size={20} />
              Projects
            </Link>

            <Link
              href="/ai-coach"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname === "/ai-coach"
                  ? activeLink
                  : inactiveLink
              }`}
            >
              <Bot size={20} />
              AI Coach
            </Link>

            <Link
              href="/profile"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname === "/profile"
                  ? activeLink
                  : inactiveLink
              }`}
            >
              <User size={20} />
              Profile
            </Link>

            <Link
              href="/settings"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname === "/settings"
                  ? activeLink
                  : inactiveLink
              }`}
            >
              <Settings size={20} />
              Settings
            </Link>

          </nav>
        </div>

        <div className="mt-auto pt-6">
          <button
            onClick={() => {
              localStorage.removeItem(
                "connectsphere_user"
              );

              window.location.href = "/login";
            }}
            className="w-full rounded-xl border border-red-500/30 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>

      </div>
    </aside>
  );
}