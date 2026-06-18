import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request
) {
  const { searchParams } =
    new URL(req.url);

  const category =
    searchParams.get("category");

  const mentors =
    await prisma.mentor.findMany({
      where: category
        ? {
            category,
          }
        : {},
    });

  return NextResponse.json({
    mentors,
  });
}