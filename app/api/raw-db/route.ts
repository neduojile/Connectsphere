import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    databaseUrl: process.env.DATABASE_URL?.includes("neon.tech"),
    length: process.env.DATABASE_URL?.length,
  });
}