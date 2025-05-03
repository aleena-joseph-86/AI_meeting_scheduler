// app/calendar/page.tsx
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { getUserEvents } from "../lib/googleCalendar";
import styles from "./calendar.module.scss";

export default async function CalendarPage() {
  const session = await getServerSession(options);

  if (!session?.user?.email) {
    // Optionally redirect or show login
    return <p>You must be signed in to view calendar events.</p>;
  }

  const events = await getUserEvents(session.user.email);
  console.log("events: ",events);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upcoming Google Calendar Events</h1>
      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <ul className={styles.eventList}>
          {events.map((event: any) => (
            <li key={event.id} className={styles.eventItem}>
              <h3 className={styles.eventTitle}>{event.summary || "No title"}</h3>
              <p className={styles.eventTime}>
                {new Date(event.start.dateTime || event.start.date!).toLocaleString()} →{" "}
                {new Date(event.end.dateTime || event.end.date!).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
