import { executeQuery } from "@/app/lib/database/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    email,
    name,
    image_url,
    education,
    profession,
    domain,
    skills,
    experience,
    years_of_experience,
    available_time,
    summary,
  } = await req.json();
//  console.log( email,
//   name,
//   image_url,
//   education,
//   profession,
//   domain,
//   skills,
//   experience,
//   years_of_experience,
//   available_time,
//   summary);
  const query = `
    INSERT INTO profiles (
      email,
      name,
      image_url,
      education,
      profession,
      domain,
      skills,
      experience,
      years_of_experience,
      available_time,
      summary
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [response] = (await executeQuery(query, [
      email || null,
      name || null,
      image_url || null,
      education || null,
      profession || null,
      domain || null,
      JSON.stringify(skills || []),
      experience || 0,
      years_of_experience || null,
      available_time || null,
      summary || null,
    ])) as any;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("DB insert error:", error);
    return NextResponse.json(
      { error: "Unable to save to DB" },
      { status: 500 }
    );
  }
}
