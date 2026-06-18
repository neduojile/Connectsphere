import Link from "next/link";
import { Users, Activity, FolderKanban } from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";
import JoinButton from "@/components/communities/JoinButton";
import { prisma } from "@/lib/prisma";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const community =
    await prisma.community.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            memberships: true,
          },
        },
      },
    });

  if (!community) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold">
            Community Not Found
          </h1>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl">

        <Link
          href="/communities"
          className="text-orange-500 transition hover:text-orange-400"
        >
          ← Back to Communities
        </Link>

        <div className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-zinc-950 via-zinc-950 to-orange-950/20 p-8">

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative z-10">

            {/* Banner */}
            <div className="mb-8 h-40 rounded-3xl bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />

            {/* Community Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-500/10">
              <Users
                size={30}
                className="text-orange-500"
              />
            </div>

            {/* Community Info */}
            <h1 className="text-5xl font-black">
              {community.name}
            </h1>

            <p className="mt-3 text-orange-500">
              {community._count.memberships} Members
            </p>

            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              {community.description}
            </p>

            {/* Join Button */}
            <div className="mt-8">
              <JoinButton
                communityId={community.id}
              />
            </div>

            {/* Members Section */}
            <div className="mt-10">
              <h3 className="mb-4 text-xl font-bold">
                Community Members
              </h3>

              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-orange-500 font-bold text-black">
                    A
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-orange-400 font-bold text-black">
                    J
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-orange-300 font-bold text-black">
                    M
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-orange-200 font-bold text-black">
                    K
                  </div>
                </div>

                <span className="ml-4 text-muted-foreground">
                  + {community._count.memberships} members
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl border border-border bg-card/30 p-5">
                <div className="flex items-center gap-2">
                  <Users
                    size={18}
                    className="text-orange-500"
                  />
                  <p className="text-sm text-zinc-500">
                    Members
                  </p>
                </div>

                <h3 className="mt-3 text-3xl font-black text-orange-500">
                  {community._count.memberships}
                </h3>
              </div>

              <div className="rounded-2xl border border-border bg-card/30 p-5">
                <div className="flex items-center gap-2">
                  <Activity
                    size={18}
                    className="text-orange-500"
                  />
                  <p className="text-sm text-zinc-500">
                    Activity Score
                  </p>
                </div>

                <h3 className="mt-3 text-3xl font-black text-orange-500">
                  89
                </h3>
              </div>

              <div className="rounded-2xl border border-border bg-card/30 p-5">
                <div className="flex items-center gap-2">
                  <FolderKanban
                    size={18}
                    className="text-orange-500"
                  />
                  <p className="text-sm text-zinc-500">
                    Projects
                  </p>
                </div>

                <h3 className="mt-3 text-3xl font-black text-orange-500">
                  12
                </h3>
              </div>

            </div>

            {/* Recent Activity */}

<div className="mt-12">
  <h2 className="mb-5 text-2xl font-bold">
    Recent Activity
  </h2>

  <div className="space-y-4">

    <div className="rounded-2xl border border-border bg-zinc-950/60 p-4 transition hover:border-green-500">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span>John joined the community</span>
      </div>
    </div>

    <div className="rounded-2xl border border-border bg-zinc-950/60 p-4 transition hover:border-orange-500">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-orange-500" />
        <span>New Web3 project created</span>
      </div>
    </div>

    <div className="rounded-2xl border border-border bg-zinc-950/60 p-4 transition hover:border-blue-500">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-blue-500" />
        <span>Mentor session scheduled</span>
      </div>
    </div>

    <div className="rounded-2xl border border-border bg-zinc-950/60 p-4 transition hover:border-purple-500">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-purple-500" />
        <span>Discussion started</span>
      </div>
    </div>

  </div>
</div>


{/* Community Leaders */}

<div className="mt-12">
  <h2 className="mb-5 text-2xl font-bold">
    Community Leaders
  </h2>

  <div className="grid gap-5 md:grid-cols-3">

    <div className="rounded-3xl border border-border bg-zinc-950/60 p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-black">
        S
      </div>

      <h3 className="mt-4 font-bold">
        Sarah Johnson
      </h3>

      <p className="text-zinc-500">
        Lead Mentor
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-zinc-950/60 p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-xl font-bold text-black">
        D
      </div>

      <h3 className="mt-4 font-bold">
        David James
      </h3>

      <p className="text-zinc-500">
        Community Admin
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-zinc-950/60 p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-300 text-xl font-bold text-black">
        M
      </div>

      <h3 className="mt-4 font-bold">
        Michael Peter
      </h3>

      <p className="text-zinc-500">
        Project Coordinator
      </p>
    </div>

  </div>
</div>

{/* Quick Actions */}

<div className="mt-12">
  <h2 className="mb-5 text-2xl font-bold">
    Quick Actions
  </h2>

  <div className="grid gap-5 md:grid-cols-2">

    <button className="rounded-3xl bg-orange-500 p-6 text-lg font-bold text-black transition hover:bg-orange-400">
      Start Discussion
    </button>

    <button className="rounded-3xl border border-zinc-700 bg-zinc-950 p-6 text-lg transition hover:border-orange-500">
      Create Project
    </button>

    <button className="rounded-3xl border border-zinc-700 bg-zinc-950 p-6 text-lg transition hover:border-orange-500">
      Find Mentor
    </button>

    <button className="rounded-3xl border border-zinc-700 bg-zinc-950 p-6 text-lg transition hover:border-orange-500">
      Invite Friends
    </button>

  </div>
</div>

          </div>
        </div>

      </div>
    </AppLayout>
  );
}