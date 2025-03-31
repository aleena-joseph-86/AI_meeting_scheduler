import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session?.accessToken) return res.status(401).json({ message: "Unauthorized" });

  const { timeSlot, participants } = req.body;
  const calendar = google.calendar({ version: "v3" });

  try {
    const event = {
      summary: "Scheduled Meeting",
      start: { dateTime: new Date(timeSlot).toISOString() },
      end: { dateTime: new Date(new Date(timeSlot).getTime() + 60 * 60 * 1000).toISOString() },
      attendees: participants.map((email: any) => ({ email })),
      reminders: { useDefault: true },
    };

    await calendar.events.insert({
      auth: session.accessToken,
      calendarId: "primary",
      requestBody: event,
    });

    return res.json({ message: "Meeting scheduled on Google Calendar." });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
