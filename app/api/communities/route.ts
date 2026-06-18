import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const communities =
      await prisma.community.findMany({
        include: {
          memberships: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    const formatted =
      communities.map(
        (community) => ({
          ...community,
          memberCount:
            community.memberships
              .length,
        })
      );

    return NextResponse.json({
      success: true,
      communities: formatted,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load communities",
      },
      {
        status: 500,
      }
    );
  }
}