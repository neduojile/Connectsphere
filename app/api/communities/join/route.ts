import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const {
      userId,
      communityId,
    } = await req.json();

    const existing =
      await prisma.communityMembership.findUnique(
        {
          where: {
            userId_communityId: {
              userId,
              communityId,
            },
          },
        }
      );

    if (existing) {
      return NextResponse.json({
        success: true,
      });
    }

    await prisma.communityMembership.create(
      {
        data: {
          userId,
          communityId,
        },
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}