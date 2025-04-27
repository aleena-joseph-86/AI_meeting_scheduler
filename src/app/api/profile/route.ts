import { executeQuery } from "@/app/lib/database/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const query = `
      SELECT * FROM profiles WHERE user_id = ?
    `;

    const [rows]: any = await executeQuery(query, [userId]);

    if (!rows.length) {
      return NextResponse.json(null, { status: 200 }); // No profile exists
    }

    return NextResponse.json(rows[0], { status: 200 });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to fetch profile from DB" },
      { status: 500 }
    );
  }
}
