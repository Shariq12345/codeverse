import { NextResponse } from "next/server";
import { getTutorial } from "@/lib/markdown";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tutorialId: string }> }
) {
  try {
    const { tutorialId } = await params;
    const tutorial = await getTutorial(tutorialId);

    if (!tutorial) {
      return NextResponse.json(
        { error: "Tutorial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tutorial);
  } catch (error) {
    console.error("Error loading tutorial:", error);
    return NextResponse.json(
      { error: "Failed to load tutorial" },
      { status: 500 }
    );
  }
}
