import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } =
      new URL(req.url);

    const projectId =
      searchParams.get("projectId");

    const announcements =
      await prisma.projectAnnouncement.findMany({
        where: {
          projectId:
            projectId || "",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      announcements,
    });
  } catch (error) {
    console.error(error);

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

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const announcement =
      await prisma.projectAnnouncement.create({
        data: {
          title:
            body.title,
          content:
            body.content,
          projectId:
            body.projectId,
        },
      });

    return NextResponse.json({
      success: true,
      announcement,
    });
  } catch (error) {
    console.error(error);

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