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

    await prisma.projectMembership.deleteMany({
      where: {
        userId,
        projectId,
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
          "Failed to leave project",
      },
      {
        status: 500,
      }
    );
  }
}