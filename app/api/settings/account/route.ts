import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      userId,
      fullName,
      email,
    } = await req.json();

    const user =
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          fullName,
          email,
        },
      });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to update account",
      },
      {
        status: 500,
      }
    );
  }
}