import { NextRequest, NextResponse } from "next/server";

const challengeDetails = {
  "1": {
    id: "1",
    title: "CSS Grid Mastery",
    description:
      "Create a responsive photo gallery using CSS Grid. Test your layout skills with this visual challenge.",
    difficulty: "Intermediate",
    category: "CSS",
    points: 150,
    timeEstimate: "45 min",
    participants: 2847,
    completionRate: 68,
    tags: ["CSS", "Grid", "Responsive", "Layout"],
    instructions: `
# CSS Grid Photo Gallery Challenge

Create a responsive photo gallery using CSS Grid that adapts to different screen sizes.

## Requirements:
1. Use CSS Grid to create a 3-column layout on desktop
2. On tablet (768px and below), show 2 columns
3. On mobile (480px and below), show 1 column
4. Each photo should maintain aspect ratio
5. Add a subtle hover effect on images
6. Ensure proper gap between grid items

## Tips:
- Use \`grid-template-columns\` with \`repeat()\` and \`minmax()\`
- Consider using \`grid-auto-rows\` for consistent row heights
- Media queries will help with responsiveness
- \`object-fit: cover\` is useful for images
    `,
    starterCode: {
      html: `<div class="gallery">
  <img src="https://picsum.photos/300/200?random=1" alt="Photo 1">
  <img src="https://picsum.photos/300/200?random=2" alt="Photo 2">
  <img src="https://picsum.photos/300/200?random=3" alt="Photo 3">
  <img src="https://picsum.photos/300/200?random=4" alt="Photo 4">
  <img src="https://picsum.photos/300/200?random=5" alt="Photo 5">
  <img src="https://picsum.photos/300/200?random=6" alt="Photo 6">
</div>`,
      css: `.gallery {
  /* Add your CSS Grid code here */
}

.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

/* Add responsive styles here */`,
      js: `// JavaScript is optional for this challenge
// You can add interactive features if desired`,
    },
    expectedOutput:
      "A responsive grid gallery that shows 3 columns on desktop, 2 on tablet, and 1 on mobile with proper spacing and hover effects.",
    testCases: [
      {
        input: "Desktop viewport (1200px)",
        expected: "3 columns displayed",
        description: "Gallery should show 3 columns on desktop screens",
      },
      {
        input: "Tablet viewport (768px)",
        expected: "2 columns displayed",
        description: "Gallery should show 2 columns on tablet screens",
      },
      {
        input: "Mobile viewport (480px)",
        expected: "1 column displayed",
        description: "Gallery should show 1 column on mobile screens",
      },
    ],
    hints: [
      "Use CSS Grid's repeat() function for responsive columns",
      "Media queries help adjust grid columns for different screen sizes",
      "Consider using grid-gap or gap for spacing between items",
      "object-fit: cover ensures images maintain aspect ratio",
    ],
    solution: {
      html: `<div class="gallery">
  <img src="https://picsum.photos/300/200?random=1" alt="Photo 1">
  <img src="https://picsum.photos/300/200?random=2" alt="Photo 2">
  <img src="https://picsum.photos/300/200?random=3" alt="Photo 3">
  <img src="https://picsum.photos/300/200?random=4" alt="Photo 4">
  <img src="https://picsum.photos/300/200?random=5" alt="Photo 5">
  <img src="https://picsum.photos/300/200?random=6" alt="Photo 6">
</div>`,
      css: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
}

.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.gallery img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .gallery {
    grid-template-columns: 1fr;
    padding: 16px;
  }
}`,
      js: `// Optional: Add image loading animation
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.gallery img');
  images.forEach((img, index) => {
    img.style.opacity = '0';
    img.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      img.style.opacity = '1';
      img.style.transform = 'translateY(0)';
    }, index * 100);
  });
});`,
      explanation:
        "This solution uses CSS Grid with responsive breakpoints to create a flexible photo gallery that adapts to different screen sizes.",
    },
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { challengeId: string } }
) {
  try {
    const challengeId = params.challengeId;
    const challenge =
      challengeDetails[challengeId as keyof typeof challengeDetails];

    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(challenge);
  } catch (error) {
    console.error("Error fetching challenge:", error);
    return NextResponse.json(
      { error: "Failed to fetch challenge" },
      { status: 500 }
    );
  }
}
