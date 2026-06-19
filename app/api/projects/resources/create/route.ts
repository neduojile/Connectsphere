import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {

  try {

    const {
      title,
      description,
      url,
      resourceType,
      projectId,
    } = await req.json();

    const resource =
      await prisma.projectResource.create({
        data: {
          title,
          description,
          url,
          resourceType,
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
        error:
          "Failed to create resource",
      },
      {
        status: 500,
      }
    );

  }

}

export async function DELETE(
  req: Request
) {

  try {

    const {
      resourceId,
    } = await req.json();

    await prisma.projectResource.delete({
      where: {
        id: resourceId,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to delete resource",
      },
      {
        status: 500,
      }
    );

  }

}