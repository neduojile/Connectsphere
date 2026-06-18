import AppLayout from "@/components/layout/AppLayout";
import CommunitiesClient from "@/components/communities/CommunitiesClient";
import { prisma } from "@/lib/prisma";
import { Users } from "lucide-react";

export default async function CommunitiesPage() {
  const communities = await prisma.community.findMany({
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

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl">

        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
            ConnectSphere
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-5xl">
            Communities
          </h1>

          <p className="mt-4 max-w-2xl text-muted-foreground">
            Discover communities, connect with like-minded
            individuals, collaborate on projects, and grow
            together within the ConnectSphere ecosystem.
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-border bg-zinc-950 p-6">
          <div className="flex items-center gap-3">
            <Users
              size={24}
              className="text-orange-500"
            />

            <div>
              <h2 className="font-bold">
                Total Communities
              </h2>

              <p className="text-zinc-500">
                {communities.length} communities available
              </p>
            </div>
          </div>
        </div>

        <CommunitiesClient
          communities={communities}
        />

      </div>
    </AppLayout>
  );
}