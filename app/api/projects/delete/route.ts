import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const {
      projectId,
      userId,
    } = await req.json();

    const project =
      await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

    if (!project) {
      return NextResponse.json({
        success: false,
        error:
          "Project not found",
      });
    }

    if (
      project.ownerId !==
      userId
    ) {
      return NextResponse.json({
        success: false,
        error:
          "Only project owner can delete",
      });
    }

    await prisma.projectMembership.deleteMany({
      where: {
        projectId,
      },
    });

    await prisma.project.delete({
      where: {
        id: projectId,
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
          "Failed to delete project",
      },
      {
        status: 500,
      }
    );
  }
}