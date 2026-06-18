"use client";

import { useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import JoinButton from "./JoinButton";
import CommunitySearch from "./CommunitySearch";

interface Community {
  id: string;
  name: string;
  description: string;
  _count: {
    memberships: number;
  };
}

export default function CommunitiesClient({
  communities,
}: {
  communities: Community[];
}) {
  const [search, setSearch] = useState("");

  const filteredCommunities =
    communities.filter((community) =>
      community.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <>
      <CommunitySearch
        search={search}
        setSearch={setSearch}
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredCommunities.map((community) => (
          <Link
            href={`/communities/${community.id}`}
            key={community.id}
            className="group block rounded-3xl border border-border bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
              <Users
                size={22}
                className="text-orange-500"
              />
            </div>

            <h2 className="text-2xl font-bold">
              {community.name}
            </h2>

            <p className="mt-2 text-sm text-orange-500">
              {community._count.memberships} Members
            </p>

            <p className="mt-3 text-muted-foreground">
              {community.description}
            </p>

            <div
              className="mt-6"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              <JoinButton
                communityId={community.id}
              />
            </div>
          </Link>
        ))}
      </div>

      {filteredCommunities.length === 0 && (
        <div className="rounded-3xl border border-border bg-zinc-950 p-10 text-center">
          <h3 className="text-xl font-bold">
            No communities found
          </h3>

          <p className="mt-2 text-zinc-500">
            Try a different search term.
          </p>
        </div>
      )}
    </>
  );
}