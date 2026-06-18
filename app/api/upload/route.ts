import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { image } =
      await req.json();

    const uploaded =
      await cloudinary.uploader.upload(
        image,
        {
          folder:
            "connectsphere/profiles",
        }
      );

    return NextResponse.json({
      success: true,
      url: uploaded.secure_url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}