"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

const botReplies = [
  "Sure. Let's set up your profile. What is your name?",
  "What is your education background?",
  "What is your profession?",
  "What is your domain?",
  "What are your skills?",
  "What are your top 5 skills?",
  "What is your experience level (beginner, intermediate, experienced)?",
  "What are your years of experience?",
  "What is your available time?",
  "Please confirm if you want to proceed with the provided information.",
  "Shall we see your profile?",
];

export default function Chatbot() {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [botReplyIndex, setBotReplyIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initialMessage: { sender: "bot"; text: string } = {
      sender: "bot",
      text: "Hi there! I'm your personal assistant. Do you wanna set up a profile or look for a professtional?",
    };
    setMessages([initialMessage]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: { sender: "user"; text: string } = {
      sender: "user",
      text: input,
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    if (botReplyIndex < botReplies.length) {
      const botResponse: { sender: "bot"; text: string } = {
        sender: "bot",
        text: botReplies[botReplyIndex],
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botResponse]);
        setBotReplyIndex((prevIndex) => prevIndex + 1);
      }, 1000);
    }

    //After final question is answered, call API
    if (botReplyIndex === botReplies.length - 1) {
      setLoading(true);
      //Extract all user messages and send to API
      const allUserMessages = updatedMessages
        .filter((msg) => msg.sender === "user")
        .map((msg) => msg.text)
        .join("\n");

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: allUserMessages }),
        });

        const data = await response.json();

        console.log("Extracted profile data:", data);

        const profileData = {
          name: data.name || null,
          education: data.education || null,
          profession: data.profession || null,
          domain: data.domain || null,
          skills: data.skills || null,
          experience: data.experience || null,
          years_of_experience: data.years_of_experience || null,
          available_time: data.available_time || null,
          summary: data.summary || null,
        };

        const saveResponse = await fetch("/api/safeProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        });

        if (!saveResponse.ok) {
          throw new Error("Failed to save profile data");
        }

        setTimeout(() => {
          setLoading(false);
          router.push("/profile");
        }, 2500);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      {loading && (
        <div className="loader">
          <p>Generating your profile...</p>
          <div className="spinner" />
        </div>
      )}

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Type a message..." />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}
