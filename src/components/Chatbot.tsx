import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, RefreshCw, Sparkles, MessageCircleCode } from "lucide-react";
import { ChatMessage } from "../types";

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  serviceSelectedFromHero?: string;
}

export default function Chatbot({ isOpen, onClose, serviceSelectedFromHero }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Halo! Selamat datang di Telkomsel Enterprise. Saya adalah **digiBiz Assistant**, AI Virtual Assistant resmi PT Telkomsel.\n\nSaya siap membantu Anda memberikan informasi mendalam mengenai solusi B2B kami seperti SD-WAN, IoT Control Center, 5G Private Network, hingga Google Workspace korporasi. Ada solusi digital yang ingin Anda tanyakan hari ini?",
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isApiConfigured, setIsApiConfigured] = useState(true); // Tracks if actual key is running
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickChips = [
    "Bagaimana cara daftar SD-WAN?",
    "Apa keuntungan IoT Fleet Tracker?",
    "Jelaskan solusi 5G Private Network",
    "Berapa biaya Cloud SaaS korporat?",
    "Bagaimana cara konsultasi tatap muka?"
  ];

  // Scroll to bottom whenever messages list updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle auto-trigger from service selection
  useEffect(() => {
    if (serviceSelectedFromHero && isOpen) {
      handleSendMessage(`Saya tertarik dengan solusi ${serviceSelectedFromHero}. Bisa jelaskan secara detail?`);
    }
  }, [serviceSelectedFromHero, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    // Create user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Package conversation history for contextual Gemini AI chat
      const history = messages
        .filter(m => m.id !== "welcome") // skip introductory system greeting from history raw array
        .map(m => ({
          role: m.role === "user" ? "user" : "model",
          content: m.content
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history })
      });

      const data = await res.json();

      if (res.ok) {
        let cleanReply = data.reply;
        // Strip out simulated prefix if present, we'll format with nice indicators
        if (cleanReply.startsWith("[digiBiz AI Assistant]: ")) {
          cleanReply = cleanReply.replace("[digiBiz AI Assistant]: ", "");
        }

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: cleanReply,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        };
        
        setIsApiConfigured(!data.isMock);
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || "Gagal menghubungi server");
      }
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Mohon maaf, terjadi kendala saat menghubungkan dengan server AI. Anda dapat terus mengajukan pertanyaan, atau langsung mengisi **Formulir Konsultasi Bisnis** di bagian bawah agar kami dapat menugaskan Account Manager untuk memandu Anda.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] sm:w-[420px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transform transition-all duration-300 animate-scale-up">
      
      {/* Chat Header */}
      <div className="bg-[#E21E26] text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#E21E26]" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-bold text-sm">digiBiz Assistant</h3>
              <span className="bg-white/20 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Enterprise AI
              </span>
            </div>
            <span className="text-[10px] text-white/80 font-light flex items-center">
              <Sparkles className="w-2.5 h-2.5 text-yellow-300 mr-1 shrink-0 animate-pulse" />
              <span>Sedia Melayani 24/7 • B2B Solutions</span>
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
          title="Tutup Chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Model status bar indicator */}
      {!isApiConfigured && (
        <div className="bg-yellow-50 text-yellow-800 text-[10px] px-4 py-1.5 border-b border-yellow-100 font-semibold flex items-center justify-between">
          <span>💡 Menggunakan asisten cadangan (Offline Hub)</span>
          <span className="text-[9px] bg-yellow-200 px-1 py-0.5 rounded">MOCK MODE</span>
        </div>
      )}

      {/* Messages Display Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white font-semibold text-xs ${
                msg.role === "user" ? "bg-gray-800" : "bg-[#E21E26]"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className="flex flex-col max-w-[80%]">
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap font-light shadow-xs ${
                  msg.role === "user"
                    ? "bg-[#E21E26] text-white rounded-tr-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                }`}
              >
                {/* Standard formatting parsing for bold strings */}
                {msg.content.split("**").map((chunk, i) => 
                  i % 2 === 1 ? <strong key={i} className="font-extrabold">{chunk}</strong> : chunk
                )}
              </div>
              <span
                className={`text-[9px] text-gray-400 mt-1 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#E21E26] text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white text-gray-600 border border-gray-100 p-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-xs flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-[#E21E26] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-[#E21E26] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-[#E21E26] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      {messages.length < 4 && (
        <div className="p-3 bg-white border-t border-gray-50 overflow-x-auto flex space-x-2 whitespace-nowrap scrollbar-none">
          {quickChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(chip)}
              className="text-[10px] font-semibold text-[#E21E26] bg-red-50 hover:bg-[#E21E26] hover:text-white px-3 py-1.5 rounded-full border border-red-100/50 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Tanyakan mengenai solusi IoT, SD-WAN..."
          disabled={isLoading}
          className="flex-1 text-xs border border-gray-200 focus:border-[#E21E26] focus:ring-1 focus:ring-[#E21E26] rounded-xl px-4 py-2.5 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="bg-[#E21E26] text-white p-2.5 rounded-xl disabled:bg-gray-200 disabled:text-gray-400 hover:bg-[#c1151c] transition-all"
          title="Kirim Pesan"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
