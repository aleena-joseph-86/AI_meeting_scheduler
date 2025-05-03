"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { getSession } from "next-auth/react";

type Message = {
  sender: "user" | "bot";
  text: string;
  professionals?: any[];
};

const botReplies = [
  "Sure. Let's set up your profile. What is your name?",
  "What is your educational background?",
  "What is your profession (eg., Full Stack Developer, Frontend Engineer, Backend Engineer)?",
  "What is your domain (eg., AI/ML, Web Development, E-commerce, SaaS Application, UI/UX etc)?",
  "What are your skills?",
  "What are your top 5 skills?",
  "What is your experience level (beginner, intermediate, experienced)?",
  "What many years of experience do you have?",
  "What is your available time?",
  "Please confirm if you want to proceed with the provided information.",
  "Shall we see your profile?",
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [botReplyIndex, setBotReplyIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isProfileSetup, setIsProfileSetup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const initialMessage: Message = {
      sender: "bot",
      text: "Hi there! I'm your personal assistant. Do you wanna set up a profile or look for a professional?",
    };
    setMessages([initialMessage]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.toLowerCase();
    setInput("");

    const isFirstRealMessage = botReplyIndex === 0 && messages.length === 1;

    if (isFirstRealMessage) {
      if (userInput.includes("profile") || userInput.includes("set up")) {
        setIsProfileSetup(true);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: botReplies[0] },
          ]);
          setBotReplyIndex(1);
        }, 1000);
      } else if (
        userInput.includes("look") ||
        userInput.includes("find") ||
        userInput.includes("connect") ||
        userInput.includes("professional")
      ) {
        setIsProfileSetup(false);
        await handleProfessionalSearch(input);
      } else {
        setIsProfileSetup(true);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: botReplies[0] },
          ]);
          setBotReplyIndex(1);
        }, 1000);
      }
      return;
    }

    if (isProfileSetup) {
      if (botReplyIndex < botReplies.length) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: botReplies[botReplyIndex] },
          ]);
          setBotReplyIndex((prev) => prev + 1);
        }, 1000);
      }

      if (botReplyIndex === botReplies.length) {
        setLoading(true);
        const allUserMessages = [...messages, userMessage]
          .filter((msg) => msg.sender === "user")
          .map((msg) => msg.text)
          .join("\n");

        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: allUserMessages }),
          });

          const data = await res.json();

          const profileData = {
            name: data.name,
            education: data.education,
            profession: data.profession,
            domain: data.domain,
            skills: data.skills,
            experience: data.experience,
            years_of_experience: data.years_of_experience,
            available_time: data.available_time,
            summary: data.summary,
          };

          const saveRes = await fetch("/api/saveProfile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileData),
          });

          if (!saveRes.ok) throw new Error("Failed to save profile");

          setTimeout(() => {
            setLoading(false);
            router.push("/profile");
          }, 2500);
        } catch (err) {
          console.error("Error saving profile:", err);
          setLoading(false);
        }
      }
    } else {
      await handleProfessionalSearch(input);
    }
  };

  const handleProfessionalSearch = async (userInput: string) => {
    setLoading(true);
    try {
      const chatResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userInput,
          type: "professional_search",
        }),
      });

      if (!chatResponse.ok) throw new Error("Chat API request failed");

      const chatData = await chatResponse.json();

      if (chatData.isRecommendationRequest && chatData.requestedProfession) {
        const searchResponse = await fetch("/api/searchProfessionals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profession: chatData.requestedProfession,
            skills: chatData.requestedSkills || [],
            limit: 5,
          }),
        });

        if (!searchResponse.ok)
          throw new Error("Search professionals API request failed");

        const professionals = await searchResponse.json();

        const botResponse: Message = {
          sender: "bot",
          text:
            professionals.length > 0
              ? `I found ${professionals.length} ${chatData.requestedProfession} professional${professionals.length > 1 ? "s" : ""}${
                  chatData.requestedSkills?.length > 0
                    ? ` with skills: ${chatData.requestedSkills.join(", ")}`
                    : ""
                }. Here are the top ${professionals.length}:`
              : `Sorry, I couldn't find any ${chatData.requestedProfession} professionals${
                  chatData.requestedSkills?.length > 0
                    ? ` with skills: ${chatData.requestedSkills.join(", ")}`
                    : ""
                }.`,
          professionals,
        };

        setMessages((prev) => [...prev, botResponse]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "I'm not sure how to help with that request. Could you please specify if you're looking for a professional?",
          },
        ]);
      }
    } catch (error) {
      console.error("Professional search error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong while searching for professionals. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (professional: any) => {
    const session = await getSession();

    if (!session?.user?.email) {
      alert("You must be signed in to book a meeting");
      return;
    }

    if (!professional.email) {
      alert("Professional's email not found.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hostEmail: session.user.email,
          attendeeEmail: professional.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const meetingTime = new Date(data.startTime).toLocaleString();
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Meeting booked with ${professional.name} on ${meetingTime}. Calendar invites sent!`,
          },
        ]);
        setModalMessage(
          `Meeting successfully scheduled with ${professional.name} on ${meetingTime}.`
        );
        setShowModal(true);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err: any) {
      console.error("Connect failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Failed to schedule a meeting. ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
            {msg.sender === "bot" &&
              msg.professionals &&
              msg.professionals.length > 0 && (
                <div className="professionalsList">
                  {msg.professionals.map((prof: any, pIdx: number) => (
                    <div key={pIdx} className="professionalCard">
                      <h3>{prof.name}</h3>
                      <p>
                        <strong>Profession:</strong> {prof.profession}
                      </p>
                      {prof.skills && (
                        <p>
                          <strong>Skills:</strong> {prof.skills.join(", ")}
                        </p>
                      )}
                      {prof.years_of_experience && (
                        <p>
                          <strong>Experience:</strong>{" "}
                          {prof.years_of_experience} years
                        </p>
                      )}
                      {prof.summary && (
                        <p>
                          <strong>Summary:</strong> {prof.summary}
                        </p>
                      )}
                      <button
                        className="connectButton"
                        onClick={() => handleConnect(prof)}
                      >
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
        {loading && (
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
            Loading...
          </div>
        )}
      </div>

      <div className="inputContainer">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className="chatInput"
        />
        <button onClick={sendMessage} disabled={loading} className="sendButton">
          Send
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Meeting Scheduled 🎉</h2>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
