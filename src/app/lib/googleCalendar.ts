import { executeQuery } from './database/db';
import { google } from 'googleapis';

// Setup Google OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Fetch access/refresh token for a user
async function getAccess(email: string) {
  const [rows] = await executeQuery(
    'SELECT access_token, refresh_token FROM users WHERE email = ?',
    [email]
  );

  if (!rows || (Array.isArray(rows) && rows.length === 0)) {
    throw new Error('No tokens found for this user');
  }

  const user = Array.isArray(rows) ? rows[0] : rows;

  oAuth2Client.setCredentials({
    access_token: user.access_token,
    refresh_token: user.refresh_token,
  });

  return oAuth2Client;
}

// Book a meeting with multiple attendees
export async function bookMeeting(
  hostEmail: string,
  attendeeEmails: string[],
  startTime: string,
  endTime: string,
  summary: string,
  description: string
) {
  const auth = await getAccess(hostEmail);
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary,
    description,
    start: {
      dateTime: startTime,
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: endTime,
      timeZone: 'Asia/Kolkata',
    },
    attendees: attendeeEmails.map(email => ({ email })),
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    sendUpdates: 'all', // Notify all attendees
    requestBody: event,
  });

  return response.data;
}

// Check if all attendees are free at given time
export async function isFree(attendeeEmails: string[], startTime: string, endTime: string) {
  const auth = await getAccess(attendeeEmails[0]); // Use first person's token
  const calendar = google.calendar({ version: 'v3', auth });

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: startTime,
      timeMax: endTime,
      timeZone: 'Asia/Kolkata',
      items: attendeeEmails.map(email => ({ id: email })),
    },
  });

  for (const email of attendeeEmails) {
    const busySlots = response.data.calendars?.[email]?.busy ?? [];
    if (busySlots.length > 0) {
      return false; // Someone is busy
    }
  }

  return true; // Everyone is free
}

// Find nearest available time slot for all attendees
export async function findNearestAvailableTime(attendeeEmails: string[], hoursAhead = 6) {
  const auth = await getAccess(attendeeEmails[0]); 
  const calendar = google.calendar({ version: 'v3', auth });

  const now = new Date();
  const later = new Date();
  later.setHours(now.getHours() + hoursAhead);

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: now.toISOString(),
      timeMax: later.toISOString(),
      timeZone: 'Asia/Kolkata',
      items: attendeeEmails.map(email => ({ id: email })),
    },
  });

  let busySlots: { start: string; end: string }[] = [];

  // Convert busy times from API response to standard { start, end }
  for (const email of attendeeEmails) {
    const userBusy = response.data.calendars?.[email]?.busy ?? [];

    busySlots = busySlots.concat(userBusy.map(slot => ({
      start: slot.start!,
      end: slot.end!,
    })));
  }

  busySlots.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  if (busySlots.length === 0) {
    return { availableFrom: now };
  }

  let lastEndTime = now;
  for (const slot of busySlots) {
    const busyStart = new Date(slot.start!);
    if (lastEndTime < busyStart) {
      return { availableFrom: lastEndTime };
    }
    lastEndTime = new Date(slot.end!);
  }

  return { availableFrom: lastEndTime };
}

// Get user events
export async function getUserEvents(email: string) {
  const auth = await getAccess(email);
  const calendar = google.calendar({ version: 'v3', auth });

  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 20,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return response.data.items ?? [];
}
