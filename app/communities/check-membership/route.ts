import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, communityId } =
      await req.json();

    const membership =
      await prisma.communityMembership.findUnique({
        where: {
          userId_communityId: {
            userId,
            communityId,
          },
        },
      });

    return NextResponse.json({
      joined: !!membership,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}