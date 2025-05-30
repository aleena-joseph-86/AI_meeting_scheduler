import { NextRequest, NextResponse } from "next/server";
import { processRequest, processRecommendationRequest } from "@/app/lib/bot";

export async function POST(req: NextRequest) {
  const input = await req.json();

  if (!input || !input.prompt) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    let parsedJson;

    if (input.type === "professional_search") {
      // Use search-specific logic
      parsedJson = await processRecommendationRequest(input.prompt);
    } else {
      // Default: profile creation
      const rawOutput = await processRequest(input.prompt);

      const jsonOutput = rawOutput.text.match(
        /```(?:json)?\s*([\s\S]*?)\s*```/i
      );
      const cleanJson = jsonOutput ? jsonOutput[1] : rawOutput.text;

      parsedJson = JSON.parse(cleanJson);
    }

    return NextResponse.json(parsedJson, { status: 200 });
  } catch (error) {
    console.error("Error fetching code:", error);
    return NextResponse.json(
      { error: "Unable to fetch code" },
      { status: 500 }
    );
  }
}
