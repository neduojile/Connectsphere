import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ===========================
   GET ANNOUNCEMENTS
=========================== */

export async function GET(
  req: Request
) {
  try {
    const { searchParams } =
      new URL(req.url);

    const projectId =
      searchParams.get(
        "projectId"
      );

    const announcements =
      await prisma.projectAnnouncement.findMany(
        {
          where: {
            projectId:
              projectId || "",
          },

          orderBy: {
            createdAt: "desc",
          },
        }
      );

    return NextResponse.json({
      success: true,
      announcements,
    });
  } catch (error) {
    console.error(
      "ANNOUNCEMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load announcements",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===========================
   CREATE ANNOUNCEMENT
=========================== */

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const project =
      await prisma.project.findUnique(
        {
          where: {
            id: body.projectId,
          },
        }
      );

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

    if (
      project.ownerId !==
      body.userId
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only project owners can create announcements",
        },
        {
          status: 403,
        }
      );
    }

    const announcement =
      await prisma.projectAnnouncement.create(
        {
          data: {
            title:
              body.title,
            content:
              body.content,
            projectId:
              body.projectId,
          },
        }
      );

    return NextResponse.json({
      success: true,
      announcement,
    });
  } catch (error) {
    console.error(
      "CREATE ANNOUNCEMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to create announcement",
      },
      {
        status: 500,
      }
    );
  }
}