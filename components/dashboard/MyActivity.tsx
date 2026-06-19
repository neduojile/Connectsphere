"use client";

import {
  FolderKanban,
  Users,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

export default function MyActivity() {

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

      <h2 className="text-2xl font-black">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3">
          <FolderKanban className="text-orange-500" />
          <span>Projects Joined</span>
        </div>

        <div className="flex items-center gap-3">
          <Users className="text-orange-500" />
          <span>Communities Joined</span>
        </div>

        <div className="flex items-center gap-3">
          <MessageCircle className="text-orange-500" />
          <span>Chat Messages Sent</span>
        </div>

        <div className="flex items-center gap-3">
          <HelpCircle className="text-orange-500" />
          <span>Questions Asked</span>
        </div>

      </div>

    </div>

  );

}