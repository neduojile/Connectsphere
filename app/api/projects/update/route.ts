import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const {
      projectId,
      userId,
      title,
      description,
      category,
      difficulty,
      tech,
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
        error: "Project not found",
      });
    }

    if (
      project.ownerId !==
      userId
    ) {
      return NextResponse.json({
        success: false,
        error:
          "Only owner can edit",
      });
    }

    const updated =
      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          title,
          description,
          category,
          difficulty,
          tech,
        },
      });

    return NextResponse.json({
      success: true,
      project: updated,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to update project",
      },
      {
        status: 500,
      }
    );
  }
}