import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } =
      await params;

    const project =
      await prisma.project.findUnique({
        where: {
          id,
        },
      include: {
  owner: true,

  memberships: {
    include: {
      user: true,
    },
  },

  resources: true,

  discussions: {
    include: {
      user: true,
    },
  },

  questions: {
    include: {
      user: true,
    },
  },

  announcements: true,
},
      });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load project",
      },
      {
        status: 500,
      }
    );
  }
}