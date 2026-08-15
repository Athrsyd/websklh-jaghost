import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import aiLogo from '../assets/ai-logo.png';

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const { messages, loading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Logo Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-md p-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)] border-2 border-white/90 flex items-center justify-center transform hover:scale-110 transition-all duration-300 group cursor-pointer"
          aria-label="Buka AI Chatbot"
        >
          <img 
            src={aiLogo} 
            alt="AI Chatbot Logo" 
            className="w-full h-full object-contain rounded-full"
          />
        </button>
      )}

      {/* Futuristic Liquid Glass Chat Window */}
      {isOpen && (
        <div className="w-[330px] xs:w-[360px] sm:w-[390px] h-[500px] bg-slate-900/40 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col overflow-hidden animate-fadeIn relative">
          
          {/* Liquid Glass Header */}
          <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 border-b border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/90 rounded-full p-0.5 shadow-md border border-white/60 flex items-center justify-center overflow-hidden shrink-0">
                <img src={aiLogo} alt="AI Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white tracking-wide leading-tight">TechnoBot AI</h3>
                <p className="text-[10px] text-blue-200/90 font-medium">Asisten Pintar SMKN 26 Jakarta</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={clearChat}
                title="Bersihkan Percakapan"
                className="p-1.5 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Liquid Glass Message Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs scrollbar-thin scrollbar-thumb-white/30">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-white/70 space-y-2 my-auto py-8">
                <div className="w-12 h-12 rounded-full bg-white/90 p-1 shadow-lg border border-white/60 flex items-center justify-center overflow-hidden">
                  <img src={aiLogo} alt="AI Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <p className="font-bold text-white text-xs tracking-wide">Halo! Ada yang bisa TechnoBot bantu?</p>
                <p className="text-[11px] text-slate-200 max-w-[240px] leading-relaxed">
                  Tanyakan apapun tentang SMKN 26 Jakarta: <br />
                  <span className="text-orange-300 font-semibold">"Info prestasi dimana ya?"</span>
                </p>
              </div>
            )}

            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div className="relative max-w-[85%]">
                    <div
                      className={`px-4 py-2.5 text-xs sm:text-sm font-medium leading-relaxed shadow-md ${
                        isUser
                          ? 'bg-gradient-to-r from-[#FF5733] to-[#FF4E2B] text-white rounded-2xl rounded-br-xs'
                          : 'bg-white/95 text-slate-900 rounded-2xl rounded-bl-xs border border-white/60 shadow-lg backdrop-blur-md'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>

                      {/* Agentic Tool Call Indicator */}
                      {msg.tool_calls && msg.tool_calls.length > 0 && (
                        <div className="mt-2 pt-1.5 border-t border-slate-200/80 text-[10px] text-blue-600 font-bold flex items-center gap-1">
                          <svg className="w-3 h-3 text-blue-600 fill-current animate-pulse" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span>AI mengarahkan ke halaman tujuan...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/90 backdrop-blur-md border border-white/60 px-4 py-2.5 rounded-2xl rounded-bl-xs shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Liquid Glass Input Bar */}
          <form 
            onSubmit={handleSubmit} 
            className="p-3 bg-white/10 backdrop-blur-xl border-t border-white/15 flex items-center gap-2"
          >
            {/* Close X Button inside bottom bar */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
              aria-label="Tutup Chat"
            >
              <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Pill White Glass Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 bg-white/90 text-slate-800 text-xs px-4 py-2.5 rounded-full border border-white/80 focus:bg-white focus:outline-none placeholder:text-slate-400 shadow-inner font-medium transition-all"
            />

            {/* Blue Circular Send Button matching user mockup */}
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="w-10 h-10 rounded-full bg-white p-0.5 shadow-xl border border-white/80 hover:scale-105 transition-all shrink-0 cursor-pointer disabled:opacity-50 flex items-center justify-center"
              aria-label="Kirim Pesan"
            >
              <img src={aiLogo} alt="Kirim" className="w-full h-full object-contain rounded-full" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
