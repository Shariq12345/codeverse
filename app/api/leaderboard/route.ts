import { NextResponse } from "next/server";

// Mock leaderboard data
const generateLeaderboardData = () => {
  const names = [
    "Sarah Chen",
    "Alex Rodriguez",
    "Emma Thompson",
    "David Kim",
    "Maria Garcia",
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Lisa Wang",
    "Tom Brown",
    "Anna Lee",
    "Chris Wilson",
    "Nina Patel",
    "Sam Taylor",
    "Rachel Green",
    "Kevin Zhang",
    "Sophie Martin",
    "Daniel Adams",
    "Maya Patel",
    "James Wilson",
  ];

  const usernames = names.map(
    (name) => `@${name.toLowerCase().replace(" ", "")}`
  );
  const countries = [
    "US",
    "CA",
    "UK",
    "DE",
    "FR",
    "AU",
    "IN",
    "JP",
    "KR",
    "ES",
  ];
  const badges = ["Master", "Expert", "Advanced", "Intermediate", "Beginner"];

  return names.map((name, index) => ({
    id: `${index + 1}`,
    name,
    username: usernames[index],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(
      " ",
      ""
    )}`,
    points: Math.max(
      5000 - index * 200 - Math.floor(Math.random() * 300),
      1000
    ),
    challengesCompleted: Math.max(
      50 - index * 2 - Math.floor(Math.random() * 10),
      10
    ),
    streak: Math.floor(Math.random() * 15) + 1,
    rank: index + 1,
    badge: badges[Math.min(Math.floor(index / 4), 4)],
    country: countries[index % countries.length],
    joinedDate: new Date(
      2024,
      Math.floor(Math.random() * 8),
      Math.floor(Math.random() * 28) + 1
    )
      .toISOString()
      .slice(0, 7),
  }));
};

export async function GET() {
  try {
    const leaderboard = generateLeaderboardData();
    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
