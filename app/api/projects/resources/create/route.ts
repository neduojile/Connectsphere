import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      title,
      description,
      url,
      projectId,
    } = await req.json();

    const resource =
      await prisma.projectResource.create({
        data: {
          title,
          description,
          url,
          projectId,
        },
      });

    return NextResponse.json({
      success: true,
      resource,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create resource",
      },
      {
        status: 500,
      }
    );
  }
}