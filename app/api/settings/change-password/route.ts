import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const {
      userId,
      currentPassword,
      newPassword,
    } = await req.json();

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const validPassword =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Current password is incorrect",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password:
          hashedPassword,
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
          "Failed to change password",
      },
      {
        status: 500,
      }
    );
  }
}