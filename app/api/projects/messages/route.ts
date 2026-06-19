import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {

  const { searchParams } =
    new URL(req.url);

  const projectId =
    searchParams.get("projectId");

  const project =
    await prisma.project.findUnique({
      where: {
        id: projectId || "",
      },

      include: {
        memberships: true,
      },
    });

  const messages =
    await prisma.projectMessage.findMany({
      where: {
        projectId:
          projectId || "",
      },

      include: {
        user: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    });

  const formatted =
    messages.map(
      (message: any) => ({
        ...message,

        isOwner:
          message.userId ===
          project?.ownerId,
      })
    );

  return NextResponse.json({
    success: true,

    messages: formatted,

    project,

    memberCount:
      (project?.memberships
        ?.length || 0) + 1,

    messageCount:
      messages.length,
  });
}

export async function POST(req: Request) {
  const body =
    await req.json();

  const message =
    await prisma.projectMessage.create({
      data: {
        content:
          body.content,

        userId:
          body.userId,

        projectId:
          body.projectId,
      },

      include: {
        user: true,
      },
    });

  return NextResponse.json({
    success: true,
    message,
  });
}