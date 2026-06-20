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
  const [search, setSearch] =
    useState("");

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

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1 md:grid-cols-3">

        {filteredCommunities.map(
          (community) => (

            <Link
              href={`/communities/${community.id}`}
              key={community.id}
              className="group block rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500"
            >

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">

                <Users
                  size={22}
                  className="text-orange-500"
                />

              </div>

              <div className="flex items-start justify-between">

                <h2 className="text-2xl font-bold">
                  {community.name}
                </h2>

                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-500">
                  Community
                </span>

              </div>

              <div className="mt-3 flex items-center gap-2">

                <Users
                  size={14}
                  className="text-orange-500"
                />

                <span className="text-sm text-orange-500">
                  {community._count.memberships}
                  {" "}
                  Members
                </span>

              </div>

              <p className="mt-4 min-h-[72px] line-clamp-3 text-zinc-400">
                {community.description}
              </p>

              <div
                className="mt-6 flex gap-3"
                onClick={(e) =>
                  e.preventDefault()
                }
              >

               <button
  disabled
  className="rounded-xl bg-zinc-800 px-4 py-2 font-semibold text-zinc-400 cursor-not-allowed"
>
  Coming Soon
</button>


              </div>

            </Link>

          )
        )}

      </div>

      {filteredCommunities.length === 0 && (

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-12 text-center">

          <Users
            size={60}
            className="mx-auto text-orange-500"
          />

          <h3 className="mt-5 text-2xl font-bold">
            No Communities Found
          </h3>

          <p className="mt-3 text-zinc-500">
            Try searching for another
            community.
          </p>

        </div>

      )}

    </>
  );
}