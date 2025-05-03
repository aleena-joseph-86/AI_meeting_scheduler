// filepath: c:\RajMadhuramSir\ai-meeting-scheduler\src\app\api\searchProfessionals\route.ts
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

    // Base query
    let query = `
      SELECT name, email, profession, skills, experience, years_of_experience, summary
      FROM profiles
      WHERE profession LIKE ?
    `;
    const params: (string | number)[] = [`%${profession}%`];

    // Add skill filtering if skills are provided
    if (skills && Array.isArray(skills) && skills.length > 0) {
      // Note: Searching JSON arrays can be database-specific.
      // This example assumes skills are stored as a JSON string like '["skill1", "skill2"]'
      // and uses FIND_IN_SET or similar logic might be needed depending on DB and structure.
      // A simpler LIKE approach for demonstration:
      skills.forEach((skill) => {
        query += ` AND skills LIKE ?`;
        params.push(`%${skill}%`);
      });
    }

    // Add ordering (e.g., by years of experience) and limit
    query += ` ORDER BY years_of_experience DESC LIMIT ?`;
    params.push(limit);

    const results = await executeQuery(query, params);

    // Ensure skills are parsed back to an array if stored as JSON string
    const profiles = (results as any[]).map((profile) => ({
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
