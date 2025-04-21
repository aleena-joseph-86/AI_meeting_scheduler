import { NextRequest, NextResponse } from "next/server";
import { processRequest } from "@/app/lib/bot";

export async function POST(req: NextRequest) {
  const input = await req.json();

  if (!input || !input.prompt) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const rawOutput = await processRequest(input.prompt);

    // Extract json from the rawOutput string
    const jsonOutput = rawOutput.text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const cleanJson = jsonOutput ? jsonOutput[1] : rawOutput.text;

    const parsedJson = JSON.parse(cleanJson);

    console.log("Parsed JSON output:", parsedJson);
    return NextResponse.json(parsedJson, { status: 200 });
  } catch (error) {
    console.error("Error fetching code:", error);
    return NextResponse.json(
      { error: "Unable to fetch code" },
      { status: 500 }
    );
  }
}
