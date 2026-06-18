"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FolderKanban,
  User,
  Settings,
  Menu,
  Bot,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileSidebar() {
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
    shadow-[0_0_20px_rgba(249,115,22,0.15)]
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
  className="overflow-y-auto border-border bg-card text-white"
>
        <SheetTitle className="sr-only">
          ConnectSphere Navigation
        </SheetTitle>

      <div
  className="
    rounded-2xl
    border
    border-orange-500/20
    bg-orange-500/5
    p-4
    backdrop-blur
  "
>

  <div className="flex items-center gap-3">

    <img
      src="/images/logo.png"
      alt="ConnectSphere"
      className="
        h-12
        w-12
        object-contain
        drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]
      "
    />

    <div>

      <h1 className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-xl font-black text-transparent">
        ConnectSphere
      </h1>

      <p className="text-xs text-zinc-400">
        Growth Command Center
      </p>

    </div>

  </div>

</div>

        <nav className="mt-10 space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/communities"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300"
          >
            <Users size={20} />
            Communities
          </Link>

          <Link
            href="/opportunities"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300"
          >
            <Briefcase size={20} />
            Opportunities
          </Link>

          <Link
            href="/projects"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300"
          >
            <FolderKanban size={20} />
            Projects
          </Link>

          <Link
  href="/ai-coach"
  className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300"
>
  <Bot size={20} />
  AI Coach
</Link>

          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300"
          >


            <User size={20} />
            Profile
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300"
          >
            <Settings size={20} />
            Settings
          </Link>
        </nav>

        <div className="mt-8">
  <button
    onClick={() => {
      localStorage.removeItem(
        "connectsphere_user"
      );

      window.location.href =
        "/login";
    }}
    className="
  w-full
  rounded-xl
  border
  border-orange-500/30
  bg-orange-500/5
  py-3
  font-medium
  text-orange-500
  transition-all
  duration-300
  hover:bg-orange-500
  hover:text-black
  hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]
"
  >
    Logout
  </button>
</div>
      </SheetContent>
    </Sheet>
  );
}