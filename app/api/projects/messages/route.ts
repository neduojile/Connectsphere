import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } =
    new URL(req.url);

  const projectId =
    searchParams.get("projectId");

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

  return NextResponse.json({
    success: true,
    messages,
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