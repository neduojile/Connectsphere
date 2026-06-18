interface StatsCardProps {
  number: string;
  label: string;
}

export default function StatsCard({
  number,
  label,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-zinc-950 p-6">
      <h3 className="text-3xl font-bold text-orange-500">
        {number}
      </h3>

      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
    </div>
  );
}