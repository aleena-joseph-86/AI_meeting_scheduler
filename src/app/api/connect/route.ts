import { NextRequest, NextResponse } from "next/server";
import {
  findNearestAvailableTime,
  isFree,
  bookMeeting,
} from "@/app/lib/googleCalendar";

export async function POST(req: NextRequest) {
  const { hostEmail, attendeeEmail } = await req.json();

  if (!hostEmail || !attendeeEmail) {
    return NextResponse.json({ error: "Missing emails" }, { status: 400 });
  }

  try {
    const { availableFrom } = await findNearestAvailableTime([
      hostEmail,
      attendeeEmail,
    ]);
    const startTime = new Date(availableFrom);
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 min meeting

    const isBothFree = await isFree(
      [hostEmail, attendeeEmail],
      startTime.toISOString(),
      endTime.toISOString()
    );

    if (!isBothFree) {
      return NextResponse.json(
        { error: "No common free time found." },
        { status: 409 }
      );
    }

    const event = await bookMeeting(
      hostEmail,
      [attendeeEmail],
      startTime.toISOString(),
      endTime.toISOString(),
      "AI Meeting Schedular: Intro Meeting",
      "Auto-scheduled via AI Assistant"
    );

    return NextResponse.json({ event, startTime, endTime });
  } catch (error: any) {
    console.error("Connect API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
