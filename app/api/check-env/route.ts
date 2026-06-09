import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    startsWithPostgres:
      process.env.DATABASE_URL?.startsWith("postgresql://"),
    containsNeon:
      process.env.DATABASE_URL?.includes("neon.tech"),
  });
}