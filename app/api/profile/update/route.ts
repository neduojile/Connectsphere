import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      userId,
      bio,
      location,
      headline,
      careerGoal,
      interests,
      skills,
      experienceLevel,
      faithBased,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      availabilityStatus,
      profileImage,
      bannerImage,
    } = await req.json();

    let connectScore = 0;

    if (bio) connectScore += 10;
    if (location) connectScore += 10;
    if (headline) connectScore += 10;

    if (careerGoal) connectScore += 15;
    if (interests) connectScore += 15;
    if (skills) connectScore += 15;

    if (experienceLevel) connectScore += 10;

    if (linkedinUrl) connectScore += 5;
    if (githubUrl) connectScore += 5;
    if (portfolioUrl) connectScore += 5;

    if (profileImage) connectScore += 10;
    if (bannerImage) connectScore += 5;

    if (availabilityStatus) connectScore += 10;

    console.log({
      profileImage,
      bannerImage,
    });

    const profile =
      await prisma.profile.update({
        where: {
          userId,
        },
        data: {
          bio,
          location,
          headline,

          profileImage,
          bannerImage,

          careerGoal,
          interests,
          skills,
          experienceLevel,

          faithBased,

          linkedinUrl,
          githubUrl,
          portfolioUrl,

          availabilityStatus,

          connectScore,
        },
      });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update profile",
      },
      {
        status: 500,
      }
    );
  }
}