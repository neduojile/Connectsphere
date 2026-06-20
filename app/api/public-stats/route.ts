import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users =
      await prisma.user.count();

    const communities =
      await prisma.community.count();

    const projects =
      await prisma.project.count();

    return NextResponse.json({
      users,
      communities,
      projects,
    });
  } catch (error) {
    console.error(
      "PUBLIC STATS ERROR:",
      error
    );

    return NextResponse.json(
      {
        users: 0,
        communities: 0,
        projects: 0,
      },
      {
        status: 500,
      }
    );
  }
}