import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { projectId } =
      await req.json();

    const resources =
      await prisma.projectResource.findMany({
        where: {
          projectId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      resources,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load resources",
      },
      {
        status: 500,
      }
    );
  }
}