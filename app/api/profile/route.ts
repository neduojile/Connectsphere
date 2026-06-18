import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,

        memberships: {
          include: {
            community: true,
          },
        },
      },
    });

   console.log(user);

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load profile",
      },
      {
        status: 500,
      }
    );
  }
}