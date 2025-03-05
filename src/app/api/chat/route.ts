import { NextRequest, NextResponse } from "next/server";
import { processRequest } from "@/app/lib/bot";

export async function POST(req: NextRequest) {
  const input = await req.json();

  if (!input || !input.prompt) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const output = await processRequest(input.prompt);
    console.log(output);
    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.error("Error fetching code:", error);
    return NextResponse.json(
      { error: "Unable to fetch code" },
      { status: 500 }
    );
  }
}
