import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { challengeId: string } }
) {
  try {
    const challengeId = params.challengeId;
    const body = await request.json();
    const { code, timeSpent } = body;

    // In a real app, you would:
    // 1. Validate the submitted code
    // 2. Run tests against the code
    // 3. Calculate score based on correctness and efficiency
    // 4. Save the submission to database
    // 5. Update user points and statistics

    // Mock validation and scoring
    const mockResult = {
      success: true,
      score: Math.floor(Math.random() * 100) + 1, // Random score between 1-100
      points: 150,
      rank: Math.floor(Math.random() * 1000) + 1,
      timeSpent,
      feedback: [
        {
          type: "success",
          message: "Great job! Your solution meets all requirements.",
        },
        {
          type: "tip",
          message:
            "Consider adding more semantic HTML for better accessibility.",
        },
      ],
      testResults: [
        { test: "Desktop layout", passed: true },
        { test: "Tablet responsiveness", passed: true },
        { test: "Mobile layout", passed: true },
        { test: "Hover effects", passed: true },
      ],
    };

    return NextResponse.json(mockResult);
  } catch (error) {
    console.error("Error submitting challenge:", error);
    return NextResponse.json(
      { error: "Failed to submit challenge" },
      { status: 500 }
    );
  }
}
