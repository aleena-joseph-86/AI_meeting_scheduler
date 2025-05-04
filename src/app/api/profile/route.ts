// /app/api/profile/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options as authOptions } from "@/app/api/auth/[...nextauth]/options";
import { executeQuery } from "@/app/lib/database/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const getProfileQuery = "SELECT * FROM profiles WHERE email = ? LIMIT 1";
    const [profileResult] = await executeQuery(getProfileQuery, [email]) as any;

    if (!profileResult || profileResult.length === 0) {
      return NextResponse.json(null, { status: 200 }); // No profile found
    }

    const profile = profileResult[0];
    profile.skills = JSON.parse(profile.skills || "[]");

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
