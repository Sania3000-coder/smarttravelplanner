
import { useEffect, useRef, useState } from "react";

function TravelChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm TravelBuddy AI ✈️ Welcome! I can help you plan trips, explore destinations, manage your budget and find travel ideas. Where would you like to go?"
    }
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, isOpen, loading]);

  async function sendMessage(text = input) {
    const question = text.trim();

    if (!question || loading) return;

    const oldMessages = messages;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question
      }
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chatbot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: question,
            history: oldMessages.slice(-10)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.reply || "Unable to get AI response."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply
        }
      ]);

    } catch (error) {
      console.error("TravelBuddy Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: error.message || "Something went wrong. Please try again."
        }
      ]);

    } finally {
      setLoading(false);
    }
  }

  const suggestions = [
    "🏖️ Plan a Goa trip",
    "🏔️ Manali itinerary",
    "💰 Budget travel",
    "🏨 Hotel suggestions"
  ];

  return (
    <>
      <style>{`
        .tb-toggle {
          position: fixed;
          right: 25px;
          bottom: 25px;
          width: 64px;
          height: 64px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, #176b78, #102a43);
          color: white;
          font-size: 27px;
          cursor: pointer;
          box-shadow: 0 8px 25px #102a4350;
          z-index: 2000;
          transition: .25s;
        }

        .tb-toggle:hover {
          transform: scale(1.08);
        }

        .tb-window {
          position: fixed;
          right: 25px;
          bottom: 105px;
          width: 370px;
          max-width: calc(100vw - 30px);
          height: 530px;
          max-height: calc(100vh - 130px);
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 15px 45px #102a4330;
          z-index: 2000;
          font-family: Arial, sans-serif;
          border: 1px solid #e5eeee;
        }

        .tb-header {
          background: linear-gradient(135deg, #102a43, #176b78);
          color: white;
          padding: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tb-header h3 {
          margin: 0 0 6px;
          font-size: 19px;
        }

        .tb-header small {
          color: #d6eeee;
          font-size: 12px;
        }

        .tb-close {
          background: transparent;
          color: white;
          border: none;
          font-size: 27px;
          cursor: pointer;
        }

        .tb-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          background: linear-gradient(180deg, #f0fafa, #fffaf6);
        }

        .tb-message {
          width: fit-content;
          max-width: 88%;
          padding: 12px 14px;
          border-radius: 15px;
          margin: 10px 0;
          font-size: 14px;
          line-height: 1.6;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .tb-bot {
          background: white;
          border: 1px solid #e0eeee;
          color: #243b53;
          border-bottom-left-radius: 4px;
          box-shadow: 0 3px 10px #102a430a;
        }

        .tb-user {
          background: linear-gradient(135deg, #176b78, #102a43);
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 4px;
        }

        .tb-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          padding: 10px 12px;
          background: white;
        }

        .tb-chip {
          border: 1px solid #b8dada;
          color: #176b78;
          background: #f0fafa;
          padding: 8px 10px;
          border-radius: 18px;
          cursor: pointer;
          font-size: 11px;
          transition: .2s;
        }

        .tb-chip:hover:not(:disabled) {
          background: #176b78;
          color: white;
        }

        .tb-chip:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .tb-form {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-top: 1px solid #e8eeee;
          background: white;
        }

        .tb-input {
          min-width: 0;
          flex: 1;
          padding: 12px;
          border: 1px solid #d8e5e5;
          border-radius: 22px;
          outline: none;
          font-size: 13px;
        }

        .tb-input:focus {
          border-color: #176b78;
        }

        .tb-send {
          width: 44px;
          min-width: 44px;
          border: none;
          border-radius: 50%;
          background: #176b78;
          color: white;
          font-size: 18px;
          cursor: pointer;
        }

        .tb-send:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .tb-thinking {
          color: #176b78;
          font-style: italic;
          animation: tbPulse 1s infinite alternate;
        }

        @keyframes tbPulse {
          from {
            opacity: .45;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 420px) {
          .tb-toggle {
            right: 16px;
            bottom: 16px;
          }

          .tb-window {
            right: 12px;
            bottom: 90px;
            width: calc(100vw - 24px);
            max-width: none;
          }
        }
      `}</style>

      {isOpen && (
        <div className="tb-window">

          <div className="tb-header">
            <div>
              <h3>✈️ TravelBuddy AI</h3>
              <small>● AI Travel Assistant · Online</small>
            </div>

            <button
              className="tb-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>

          <div className="tb-messages" aria-live="polite">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`tb-message ${
                  message.sender === "user"
                    ? "tb-user"
                    : "tb-bot"
                }`}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="tb-message tb-bot tb-thinking">
                TravelBuddy is thinking... ✨
              </div>
            )}

            <div ref={bottomRef} />

          </div>

          <div className="tb-chips">
            {suggestions.map((suggestion) => (
              <button
                className="tb-chip"
                key={suggestion}
                disabled={loading}
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form
            className="tb-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              className="tb-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about travel..."
              aria-label="Type a message"
              disabled={loading}
            />

            <button
              className="tb-send"
              type="submit"
              aria-label="Send message"
              disabled={loading || !input.trim()}
            >
              {loading ? "..." : "➤"}
            </button>
          </form>

        </div>
      )}

      <button
        className="tb-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close TravelBuddy" : "Open TravelBuddy"}
      >
        {isOpen ? "×" : "💬"}
      </button>
    </>
  );
}

export default TravelChatbot;
