"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function TerminalChat() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Manual message state to handle raw stream
  const [messages, setMessages] = useState<ChatMessage[]>([
      { 
        id: "0", 
        role: "assistant", 
        content: language === 'pt' 
            ? "Gustavo_AI v2.0 initialized. Type 'help' or ask anything." 
            : "Gustavo_AI v2.0 initialized. Type 'help' or ask anything."
      }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
           messages: [...messages, userMessage], 
           language 
        }),
      });

      if (!response.ok) throw new Error(response.statusText);
      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      const assistantMessage: ChatMessage = { id: Date.now().toString() + '_ai', role: 'assistant', content: '' };
      
      setMessages(prev => [...prev, assistantMessage]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        
        assistantMessage.content += chunkValue;
        
        // Update the last message with new content
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { ...assistantMessage };
            return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: 'error', role: 'assistant', content: "Error: Could not connect to Gustavo_AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-md shadow-xl border border-neutral-800 hover:border-black transition-colors font-mono text-xs flex items-center gap-2 z-50"
      >
        <Terminal size={14} />
        _open_terminal
      </button>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed right-4 bottom-4 w-[calc(100vw-32px)] md:w-[450px] shadow-2xl border-2 border-black bg-[#0c0c0c] text-green-500 font-mono text-sm z-50 ${isMinimized ? 'h-10 overflow-hidden' : 'h-[500px] rounded-none'}`}
    >
      {/* Terminal Title Bar */}
      <div 
        className="flex items-center justify-between px-3 py-2 bg-[#1a1a1a] border-b border-white/10 cursor-pointer select-none"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2 text-white/70">
          <Terminal size={14} />
          <span>gustavo_ai_cli — -bash</span>
        </div>
        <div className="flex items-center gap-3">
            <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="hover:text-white">
               {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="hover:text-red-500">
               <X size={14} />
            </button>
        </div>
      </div>

      {/* Terminal Output */}
      {!isMinimized && (
        <div className="flex flex-col h-[calc(100%-40px)] p-4 bg-black/95">
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide font-mono text-xs md:text-sm" ref={scrollRef}>
             {messages.map((m) => (
               <div key={m.id} className="break-words">
                 <span className={`${m.role === 'user' ? 'text-blue-400' : 'text-green-500'} font-bold mr-2 select-none`}>
                   {m.role === 'user' ? 'visitor@portfolio:~$' : 'gustavo_ai&gt;'}
                 </span>
                 <span className="text-gray-300">{m.content}</span>
               </div>
             ))}
             {isLoading && (
               <div className="opacity-50">
                 <span className="text-green-500 font-bold mr-2 select-none">gustavo_ai&gt;</span>
                 <span className="animate-pulse">_processing...</span>
               </div>
             )}
          </div>

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2 border-t border-white/10 pt-2">
            <span className="text-blue-400 font-bold select-none text-xs md:text-sm">visitor@portfolio:~$</span>
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/20 text-xs md:text-sm font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
          </form>
        </div>
      )}
    </motion.div>
  );
}
