"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Users,
  Briefcase,
  FolderKanban,
  User,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileSidebar() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "connectsphere_user"
      );

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Communities",
      href: "/communities",
      icon: Users,
    },
    {
      name: "Opportunities",
      href: "/opportunities",
      icon: Briefcase,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>

        <button
          className="
            rounded-xl
            border
            border-orange-500/30
            bg-orange-500/10
            px-4
            py-2
            text-orange-500
            transition-all
            duration-300
            hover:scale-105
          "
        >
          <Menu size={18} />
        </button>

      </SheetTrigger>

      <SheetContent
        side="left"
        className="
          w-[85%]
          max-w-[320px]
          border-r
          border-orange-500/10
          bg-[#080808]
          text-white
          p-0
          overflow-y-auto
        "
      >
        <SheetTitle className="sr-only">
          ConnectSphere Navigation
        </SheetTitle>

        <div className="flex min-h-screen flex-col">

          {/* HEADER */}

{/* HEADER */}

<div className="border-b border-zinc-800 p-5">

  <div
    className="
      rounded-2xl
      border
      border-orange-500/20
      bg-gradient-to-br
      from-orange-500/10
      to-transparent
      p-4
    "
  >

    <div className="flex items-center gap-3">

      <img
        src="/images/logo.png"
        alt="ConnectSphere"
        className="h-10 w-10 object-contain"
      />

      <div>

        <h1 className="text-xl font-black text-orange-500">
          ConnectSphere
        </h1>

        <p className="text-xs text-zinc-400">
          Growth Command Center
        </p>

      </div>

    </div>

  </div>

</div>

{/* USER */}
          {/* USER */}

          <div className="px-5 pt-5">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">

              <p className="text-xs text-zinc-500">
                Signed In As
              </p>

              <h3 className="mt-1 font-bold">
                {user?.fullName ||
                  "ConnectSphere User"}
              </h3>

              <p className="mt-1 text-sm text-orange-500">
                {user?.profile
                  ?.careerGoal ||
                  "Explorer"}
              </p>

            </div>

          </div>

          {/* NAVIGATION */}

          <nav className="flex-1 px-4 py-6">

            <div className="space-y-2">

              {menuItems.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        px-4
                        py-3
                        text-zinc-300
                        transition-all
                        duration-300
                        hover:bg-orange-500/10
                        hover:text-orange-500
                      "
                    >
                      <Icon
                        size={20}
                      />

                      <span className="font-medium">
                        {item.name}
                      </span>
                    </Link>
                  );
                }
              )}

            </div>

          </nav>

          {/* FOOTER */}

          <div className="border-t border-zinc-800 p-5">

            <button
              onClick={() => {
                localStorage.removeItem(
                  "connectsphere_user"
                );

                window.location.href =
                  "/login";
              }}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-orange-500/20
                bg-orange-500/10
                py-3
                font-semibold
                text-orange-500
                transition-all
                duration-300
                hover:bg-orange-500
                hover:text-black
              "
            >
              <LogOut
                size={18}
              />

              Logout
            </button>

          </div>

        </div>

      </SheetContent>

    </Sheet>
  );
}