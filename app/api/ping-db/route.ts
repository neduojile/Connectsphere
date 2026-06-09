import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    envExists: !!process.env.DATABASE_URL,
    nodeVersion: process.version,
  });
}
