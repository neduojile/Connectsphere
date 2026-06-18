import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      userId,
      profileImage,
    } = await req.json();

    const profile =
      await prisma.profile.update({
        where: {
          userId,
        },
        data: {
          profileImage,
        },
      });

    return NextResponse.json({
      success: true,
      profile,
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