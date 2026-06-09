import { prisma } from "@/lib/prisma";

export default async function CommunitiesPage() {
  const communities = await prisma.community.findMany();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Communities
        </h1>

        <p className="mt-3 text-zinc-400">
          Discover communities, connect with others,
          and grow together.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {communities.map((community) => (
            <div
              key={community.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-orange-500"
            >
              <h2 className="text-2xl font-semibold">
                {community.name}
              </h2>

              <p className="mt-3 text-zinc-400">
                {community.description}
              </p>

              <button className="mt-6 rounded-xl bg-orange-500 px-4 py-2 font-medium text-black">
                Join Community
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}