'use client'

// import Head from 'next/head'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
    <>
      {/* <Head>
        <title>AI Meeting Scheduler</title>
      </Head> */}
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.content}>
            <h1>Smart Scheduling Powered by AI</h1>
            <p>Book meetings, match with professionals, and manage your calendar — intelligently and effortlessly.</p>
            <button onClick={() => router.push('/bot')}>Start Scheduling</button>
          </div>
        </section>

        <section className={styles.features}>
          <h2>Why Choose Us?</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Smart Matching</h3>
              <p>Connect with the right professionals based on expertise, availability & pricing.</p>
            </div>
            <div className={styles.card}>
              <h3>AI Assistant</h3>
              <p>Talk to the assistant naturally and let it handle scheduling for you.</p>
            </div>
            <div className={styles.card}>
              <h3>Auto Reminders</h3>
              <p>Stay ahead with automatic meeting summaries and follow-ups.</p>
            </div>
            <div className={styles.card}>
              <h3>Cross-Platform</h3>
              <p>Works with Google Calendar, Outlook, Zoom, Teams, and more.</p>
            </div>
          </div>
        </section>

        <section className={styles.comparison}>
          <h2>Better Than Calendly & Cal.com</h2>
          <div className={styles.grid}>
            <div className={styles.compareCard}>
              <h4>Calendly / Cal.com</h4>
              <ul>
                <li>❌ No smart matching</li>
                <li>❌ No pricing transparency</li>
                <li>❌ No prioritization of meetings</li>
              </ul>
            </div>
            <div className={styles.compareCardActive}>
              <h4>Our App</h4>
              <ul>
                <li>✅ Smart AI matching with pricing & expertise</li>
                <li>✅ Intelligent meeting prioritization</li>
                <li>✅ Full service discovery — not just scheduling</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Streamline Your Meetings</h2>
          <p>No more emails or searching. One AI to handle it all.</p>
          <button onClick={() => router.push('/bot')}>Try It Now</button>
        </section>
      </main>
    </>
  )
}
