import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } =
      await req.json();

    await prisma.profile.deleteMany({
      where: {
        userId,
      },
    });

    await prisma.communityMembership.deleteMany({
      where: {
        userId,
      },
    });

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to delete account",
      },
      {
        status: 500,
      }
    );
  }
}