import { executeQuery } from "@/app/lib/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { profession, skills, limit = 5 } = await req.json();

    if (!profession) {
      return NextResponse.json(
        { error: "Profession is required" },
        { status: 400 }
      );
    }

    // Normalize profession input (remove hyphens and spaces)
    const normalizedProfession = profession
      .toLowerCase()
      .replace(/[-\s]/g, "");

    // Query only by normalized profession
    let query = `
      SELECT 
        name, 
        email, 
        profession, 
        skills, 
        experience, 
        years_of_experience, 
        summary 
      FROM profiles 
      WHERE REPLACE(REPLACE(LOWER(profession), '-', ''), ' ', '') LIKE ?
      ORDER BY years_of_experience DESC
      LIMIT ?
    `;

    const params: (string | number)[] = [`%${normalizedProfession}%`, limit];

    const [rows] = await executeQuery(query, params);

    const profiles = (rows as any[]).map((profile) => ({
      ...profile,
      skills:
        typeof profile.skills === "string"
          ? JSON.parse(profile.skills)
          : profile.skills,
    }));

    return NextResponse.json(profiles, { status: 200 });
  } catch (error) {
    console.error("Search professionals error:", error);
    return NextResponse.json(
      { error: "Failed to search professionals" },
      { status: 500 }
    );
  }
}
