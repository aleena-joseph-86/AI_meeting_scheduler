"use client";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<any>();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    handleSubmission({
      prompt,
    });
  };

  async function handleSubmission(payload: any) {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: payload.prompt,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: string = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching reply:", error);
      }
    };
    fetchData();
  }

  return (
    <div className={styles.page}>
      <div className="input-area">
        <textarea
          className="text-area"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="type here"
        ></textarea>
      </div>
      <div className="submit">
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          Generate
        </button>
      </div>
    </div>
  );
}
