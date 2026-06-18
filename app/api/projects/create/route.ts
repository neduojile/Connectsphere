import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      ownerId,
      title,
      description,
      category,
      difficulty,
      tech,
    } = await req.json();

    const project =
      await prisma.project.create({
        data: {
          ownerId,
          title,
          description,
          category,
          difficulty,
          tech,
        },
      });

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
          "Failed to create project",
      },
      {
        status: 500,
      }
    );
  }
}