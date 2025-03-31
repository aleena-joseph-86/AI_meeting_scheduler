import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session?.accessToken) return res.status(401).json({ message: "Unauthorized" });

  const { timeSlot } = req.body;
  const calendar = google.calendar({ version: "v3" });

  try {
    const events = await calendar.events.list({
      auth: session.accessToken,
      calendarId: "primary",
      timeMin: new Date(timeSlot).toISOString(),
      timeMax: new Date(new Date(timeSlot).getTime() + 60 * 60 * 1000).toISOString(),
    });

    const hasConflict: boolean = events.data.items ? events.data.items.length > 0 : false;
    return res.json({ conflict: hasConflict });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
