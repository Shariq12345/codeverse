import { NextResponse } from "next/server";
import { getAllTutorials } from "@/lib/markdown";

export async function GET() {
  try {
    const tutorials = await getAllTutorials();
    return NextResponse.json(tutorials);
  } catch (error) {
    console.error("Error loading tutorials:", error);
    return NextResponse.json(
      { error: "Failed to load tutorials" },
      { status: 500 }
    );
  }
}
