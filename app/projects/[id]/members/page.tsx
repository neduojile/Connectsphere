"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Users,
  Crown,
  Search,
  Calendar,
} from "lucide-react";

export default function MembersPage() {

  const params = useParams();

  const [members, setMembers] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [ownerId, setOwnerId] =
    useState("");

    const [currentUserId,
  setCurrentUserId] =
  useState("");

  async function loadMembers() {

    const response =
      await fetch(
        `/api/projects/${params.id}`
      );

    const data =
      await response.json();

    setOwnerId(
      data.project.ownerId
    );

    const allMembers = [
      {
        id: data.project.owner.id,
        fullName:
          data.project.owner.fullName,
        joinedAt:
          data.project.createdAt,
      },

      ...(data.project
        .memberships || []).map(
        (membership: any) => ({
          id:
            membership.user.id,
          fullName:
            membership.user.fullName,
          joinedAt:
            membership.joinedAt,
        })
      ),
    ];

    setMembers(allMembers);
  }

  useEffect(() => {

  const storedUser =
    localStorage.getItem(
      "connectsphere_user"
    );

  if (storedUser) {

    const user =
      JSON.parse(
        storedUser
      );

    setCurrentUserId(
      user.id
    );

  }

  loadMembers();

}, []);

  const filteredMembers =
    members.filter((member) =>
      member.fullName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="space-y-8">

      <div>

        <div className="flex items-center gap-3">

          <Users
            size={34}
            className="text-orange-500"
          />

          <h1 className="text-4xl font-black">
            Members
          </h1>

        </div>

        <p className="mt-2 text-zinc-500">
          View and manage project members.
        </p>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Users
              size={18}
              className="text-orange-500"
            />

            <span className="font-semibold">

              {members.length}
              {" "}
              Members

            </span>

          </div>

        </div>

        <div className="relative mt-4">

          <Search
            size={18}
            className="absolute left-4 top-4 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search members..."
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-4 pl-12 pr-4"
          />

        </div>

      </div>

      <div className="grid gap-4">

        {filteredMembers.length ===
  0 && (

  <div className="rounded-3xl border border-dashed border-zinc-700 p-10 text-center">

    <h3 className="text-xl font-bold">

      No Members Found

    </h3>

    <p className="mt-2 text-zinc-500">

      Try another search.

    </p>

  </div>

)}

        {filteredMembers.map(
          (member) => (

            <div
              key={member.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                 <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-bold text-black">

<div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border border-black" />

                    {member.fullName
                      ?.charAt(0)}

                  </div>

                  <div>

                    <div className="flex items-center gap-2">
<div className="flex items-center gap-2">

  <h3 className="font-bold">

    {member.fullName}

  </h3>

  {member.id ===
    currentUserId && (

    <span className="rounded-full bg-green-500 px-2 py-1 text-[10px] font-bold text-black">

      YOU

    </span>

  )}

</div>

                      {member.id ===
                        ownerId && (

                        <span className="flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-black">

                          <Crown
                            size={12}
                          />

                          Owner

                        </span>

                      )}

                    </div>

                    <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">

                      <Calendar
                        size={14}
                      />

                      Joined{" "}
                      {new Date(
                        member.joinedAt
                      ).toLocaleDateString()}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );
}