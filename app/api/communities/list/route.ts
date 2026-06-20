import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {

    const communities =
      await prisma.community.findMany({
        include: {
          _count: {
            select: {
              memberships: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    const totalMembers =
      communities.reduce(
        (total, community) =>
          total +
          community._count.memberships,
        0
      );

    return NextResponse.json({
      success: true,
      communities,
      totalMembers,
    });

  } catch (error) {

    console.error(
      "COMMUNITIES ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        communities: [],
        totalMembers: 0,
      },
      {
        status: 500,
      }
    );

  }
}