import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json();

    const opportunity =
      await prisma.opportunity.create({
        data: {
          title: body.title,
          organization:
            body.organization,
          category:
            body.category,
          location:
            body.location,
          workMode:
            body.workMode,
          skills:
            body.skills,
          description:
            body.description,
          applyLink:
            body.applyLink,
          deadline:
            new Date(
              body.deadline
            ),
          postedById:
            body.postedById,
        },
      });

    return NextResponse.json({
      success: true,
      opportunity,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );

  }
}