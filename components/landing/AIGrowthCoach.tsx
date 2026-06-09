export default function AIGrowthCoach() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="mb-12">
        <span className="text-sm font-medium text-orange-500">
          AI Growth Coach
        </span>

        <h2 className="mt-4 text-4xl font-bold md:text-5xl">
          Personalized growth guidance for every youth.
        </h2>

        <p className="mt-4 max-w-2xl text-zinc-400">
          ConnectSphere uses AI to analyze skills, interests,
          ministry passions, and career goals to generate
          actionable growth recommendations.
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <h3 className="text-xl font-semibold">
              Growth Snapshot
            </h3>

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-black p-4">
                <p className="text-zinc-400 text-sm">
                  Growth Score
                </p>

                <h4 className="text-3xl font-bold text-orange-500">
                  92%
                </h4>
              </div>

              <div className="rounded-xl bg-black p-4">
                <p className="text-zinc-400 text-sm">
                  Recommended Mentor
                </p>

                <h4 className="font-semibold">
                  Pastor Samuel
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              AI Recommendations
            </h3>

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-black p-4">
                Join Product Builders Community
              </div>

              <div className="rounded-xl bg-black p-4">
                Attend Leadership Development Summit
              </div>

              <div className="rounded-xl bg-black p-4">
                Apply for Community Project Lead
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}