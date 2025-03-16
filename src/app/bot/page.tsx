"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

const botReplies = [
  "Sure. Let's set up your profile. What do you do?",
  "What is your domain of interest?",
  "What are the services you provide?",
  "What can the client talk to you?",
  "When are you available for a call or meet?",
  "Shall we see your profile ?",
];

export default function Chatbot() {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [botReplyIndex, setBotReplyIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const initialMessage: { sender: "bot"; text: string } = {
      sender: "bot",
      text: "Hi there! I'm your personal assistant. How can I help?",
    };
    setMessages([initialMessage]);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: { sender: "user"; text: string } = {
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      if (botReplyIndex < botReplies.length) {
        const botResponse: { sender: "bot"; text: string } = {
          sender: "bot",
          text: botReplies[botReplyIndex],
        };

        setMessages((prev) => [...prev, botResponse]);
        setBotReplyIndex((prevIndex) => prevIndex + 1);
      }

      if (botReplyIndex === botReplies.length - 1) {
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      }
    }, 1000);

    setInput("");
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
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}
