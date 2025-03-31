import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session?.accessToken) return res.status(401).json({ message: "Unauthorized" });

  const calendar = google.calendar({ version: "v3" });

  try {
    const now = new Date();
    const end = new Date();
    end.setHours(now.getHours() + 8);

    const events = await calendar.events.list({
      auth: session.accessToken,
      calendarId: "primary",
      timeMin: now.toISOString(),
      timeMax: end.toISOString(),
    });

    const busySlots = events.data.items?.map((event) => ({
      start: event.start?.dateTime,
      end: event.end?.dateTime,
    }));

    return res.json({ busySlots });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
