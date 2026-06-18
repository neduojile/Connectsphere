import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } =
    new URL(req.url);

  const projectId =
    searchParams.get("projectId");

  const discussions =
    await prisma.projectDiscussion.findMany({
      where: {
        projectId: projectId || "",
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json({
    success: true,
    discussions,
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  const discussion =
 await prisma.projectDiscussion.create({
  data: {
    content: body.message,
    userId: body.userId,
    projectId: body.projectId,
  },
});

  return NextResponse.json({
    success: true,
    discussion,
  });
}