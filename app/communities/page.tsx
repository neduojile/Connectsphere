import AppLayout from "@/components/layout/AppLayout";
import CommunitiesClient from "@/components/communities/CommunitiesClient";
import { prisma } from "@/lib/prisma";
import {
  Users,
  Network,
  Activity,
} from "lucide-react";

export default async function CommunitiesPage() {

  const communities =
    await prisma.community.findMany({
      include: {
        _count: {
          select: {
            memberships: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

const totalMembers =
  communities.reduce(
    (
      total: number,
      community: any
    ) =>
      total +
      community._count.memberships,
    0
  );
  return (
    <AppLayout>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="mb-12">

          <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
            ConnectSphere
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-5xl">
            Communities
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Discover communities,
            connect with like-minded
            people, collaborate on
            projects and grow together.
          </p>

        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-center justify-between">

              <Users
                size={24}
                className="text-orange-500"
              />

              <span className="text-xs text-zinc-500">
                LIVE
              </span>

            </div>

            <h2 className="mt-5 text-4xl font-black text-orange-500">
              {communities.length}
            </h2>

            <p className="text-zinc-500">
              Communities
            </p>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-center justify-between">

              <Network
                size={24}
                className="text-orange-500"
              />

              <span className="text-xs text-zinc-500">
                LIVE
              </span>

            </div>

            <h2 className="mt-5 text-4xl font-black text-orange-500">
              {totalMembers}
            </h2>

            <p className="text-zinc-500">
              Community Members
            </p>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-center justify-between">

              <Activity
                size={24}
                className="text-orange-500"
              />

              <span className="text-xs text-zinc-500">
                ACTIVE
              </span>

            </div>

            <h2 className="mt-5 text-4xl font-black text-orange-500">
              {communities.length}
            </h2>

            <p className="text-zinc-500">
              Active Communities
            </p>

          </div>

        </div>

        <CommunitiesClient
          communities={communities}
        />

      </div>

    </AppLayout>
  );
}