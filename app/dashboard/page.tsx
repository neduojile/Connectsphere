export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Welcome to ConnectSphere.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-zinc-400">
              ConnectScore
            </h3>

            <p className="mt-2 text-4xl font-bold text-orange-500">
              0
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-zinc-400">
              Communities
            </h3>

            <p className="mt-2 text-4xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-zinc-400">
              Projects
            </h3>

            <p className="mt-2 text-4xl font-bold">
              0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}