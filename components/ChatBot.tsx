import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const BOT_AVATAR = "/assets/icons/logo-icon.svg";
const USER_AVATAR = "/assets/icons/user.svg";

const FAQ = [
  {
    q: "How do I register as a patient?",
    a: "Just fill out the registration form on the homepage and click 'Submit'. You'll be guided through the process!",
  },
  {
    q: "How do I book an appointment?",
    a: "After registering, use the appointment form to select your doctor and preferred date/time.",
  },
  {
    q: "How do I cancel an appointment?",
    a: "Go to your appointments section and click 'Cancel' next to the appointment you wish to cancel.",
  },
  {
    q: "Is my information secure?",
    a: "Absolutely! We use secure, HIPAA-compliant systems to protect your data.",
  },
  {
    q: "How do I contact support?",
    a: "You can use this chatbot or email us at support@justcare.com for help.",
  },
];

function getBotResponse(input: string) {
  const lower = input.toLowerCase();
  for (const { q, a } of FAQ) {
    if (lower.includes(q.split(" ")[2]) || lower.includes(q.split(" ")[3])) {
      return a;
    }
  }
  if (lower.includes("help") || lower.includes("how") || lower.includes("guide")) {
    return "I'm here to help! You can ask me about registration, booking, cancellation, or anything else about JustCare.";
  }
  return "I'm not sure about that, but you can ask about registration, booking, cancellation, or support!";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! 👋 I'm the JustCare Assistant. How can I help you today? You can ask about registration, booking, cancellation, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setTimeout(() => {
      const botMsg = { from: "bot", text: getBotResponse(input) };
      setMessages((msgs) => [...msgs, botMsg]);
    }, 600);
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
        onClick={() => setOpen(true)}
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
          <div className="relative m-6 w-full max-w-sm rounded-2xl bg-card border border-border/50 shadow-2xl flex flex-col overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-primary/10">
              <div className="flex items-center gap-2">
                <Image src={BOT_AVATAR} alt="Bot" width={32} height={32} className="rounded-full" />
                <span className="font-semibold text-primary">JustCare Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Chat Body */}
            <div ref={chatRef} className="flex-1 px-4 py-3 space-y-3 overflow-y-auto bg-background" style={{ maxHeight: 350 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-end gap-2 max-w-[80%] ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                    <Image src={msg.from === "user" ? USER_AVATAR : BOT_AVATAR} alt={msg.from} width={28} height={28} className="rounded-full border border-border/50" />
                    <div className={`px-3 py-2 rounded-xl text-sm shadow ${msg.from === "user" ? "bg-primary text-white" : "bg-muted/60 text-foreground"}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Input */}
            <form onSubmit={sendMessage} className="flex items-center gap-2 px-4 py-3 border-t border-border/50 bg-background">
              <input
                type="text"
                className="flex-1 rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
              <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 