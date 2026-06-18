import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const { userId } =
      await req.json();

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          profile: true,
          memberships: true,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      connectScore:
        user.profile
          ?.connectScore || 0,

      communities:
        user.memberships
          .length,

      projects: 0,

      connections: 0,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}