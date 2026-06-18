"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function CommunitySearch({
  search,
  setSearch,
}: Props) {
  return (
    <div className="relative mb-8">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        type="text"
        placeholder="Search communities..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-2xl border border-border bg-zinc-950 py-4 pl-12 pr-4 text-white outline-none transition focus:border-orange-500"
      />
    </div>
  );
}