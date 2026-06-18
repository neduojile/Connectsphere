import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const {
      userId,
      projectId,
    } = await req.json();

    const existing =
      await prisma.projectMembership.findFirst({
        where: {
          userId,
          projectId,
        },
      });

    if (existing) {
      return NextResponse.json({
        success: false,
        error:
          "Already joined",
      });
    }

    const membership =
      await prisma.projectMembership.create({
        data: {
          userId,
          projectId,
        },
      });

    return NextResponse.json({
      success: true,
      membership,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to join project",
      },
      {
        status: 500,
      }
    );
  }
}