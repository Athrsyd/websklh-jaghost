import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://app.daffadev.my.id/api/v1";

const ROUTE_MAP = {
  "beranda": "/",
  "home": "/",
  "tentang-kami": "/tentang-kami",
  "tentang": "/tentang-kami",
  "guru-dan-staf": "/tentang-kami/guru-dan-staf",
  "guru": "/tentang-kami/guru-dan-staf",
  "prestasi": "/tentang-kami/prestasi",
  "sejarah": "/tentang-kami/sejarah",
  "profil-sekolah": "/tentang-kami/profil-sekolah",
  "hubungan-industri": "/tentang-kami/hubungan-industri",
  "program": "/program",
  "bkk": "/program/bkk",
  "jurusan": "/program/jurusan",
  "ekskul": "/program/ekskul",
  "lsp": "/program/lsp",
  "informasi": "/informasi",
  "berita": "/informasi/berita",
  "kalender-akademik": "/informasi/kalender-akademik",
  "pengumuman": "/informasi/pengumuman",
  "dokumentasi": "/dokumentasi",
  "galeri-photo": "/dokumentasi/galeri-photo",
  "galeri-foto": "/dokumentasi/galeri-photo",
  "galeri-video": "/dokumentasi/galeri-video",
  "kegiatan-sekolah": "/dokumentasi/kegiatan-sekolah",
  "virtual-tour": "/dokumentasi/virtual-tour",
  "portal": "/portal",
  "spmb": "/portal/spmb",
  "ppdb": "/portal/spmb",
  "kjp": "/portal/kjp",
  "pip": "/portal/pip",
};

// --- Icons ---

const BotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    viewBox="0 0 80 69"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M10.9091 47.2105C7.87879 47.2105 5.30303 46.1513 3.18182 44.0329C1.06061 41.9145 0 39.3421 0 36.3158C0 33.2895 1.06061 30.7171 3.18182 28.5987C5.30303 26.4803 7.87879 25.4211 10.9091 25.4211V18.1579C10.9091 16.1605 11.6212 14.4507 13.0455 13.0283C14.4697 11.6059 16.1818 10.8947 18.1818 10.8947H29.0909C29.0909 7.86842 30.1515 5.29605 32.2727 3.17763C34.3939 1.05921 36.9697 0 40 0C43.0303 0 45.6061 1.05921 47.7273 3.17763C49.8485 5.29605 50.9091 7.86842 50.9091 10.8947H61.8182C63.8182 10.8947 65.5303 11.6059 66.9545 13.0283C68.3788 14.4507 69.0909 16.1605 69.0909 18.1579V25.4211C72.1212 25.4211 74.697 26.4803 76.8182 28.5987C78.9394 30.7171 80 33.2895 80 36.3158C80 39.3421 78.9394 41.9145 76.8182 44.0329C74.697 46.1513 72.1212 47.2105 69.0909 47.2105V61.7368C69.0909 63.7342 68.3788 65.4441 66.9545 66.8664C65.5303 68.2888 63.8182 69 61.8182 69H18.1818C16.1818 69 14.4697 68.2888 13.0455 66.8664C11.6212 65.4441 10.9091 63.7342 10.9091 61.7368V47.2105ZM29.0909 39.9474C30.6061 39.9474 31.8939 39.4178 32.9545 38.3586C34.0152 37.2993 34.5455 36.0132 34.5455 34.5C34.5455 32.9868 34.0152 31.7007 32.9545 30.6414C31.8939 29.5822 30.6061 29.0526 29.0909 29.0526C27.5758 29.0526 26.2879 29.5822 25.2273 30.6414C24.1667 31.7007 23.6364 32.9868 23.6364 34.5C23.6364 36.0132 24.1667 37.2993 25.2273 38.3586C26.2879 39.4178 27.5758 39.9474 29.0909 39.9474ZM50.9091 39.9474C52.4242 39.9474 53.7121 39.4178 54.7727 38.3586C55.8333 37.2993 56.3636 36.0132 56.3636 34.5C56.3636 32.9868 55.8333 31.7007 54.7727 30.6414C53.7121 29.5822 52.4242 29.0526 50.9091 29.0526C49.3939 29.0526 48.1061 29.5822 47.0455 30.6414C45.9848 31.7007 45.4545 32.9868 45.4545 34.5C45.4545 36.0132 45.9848 37.2993 47.0455 38.3586C48.1061 39.4178 49.3939 39.9474 50.9091 39.9474ZM25.4545 54.4737H54.5455V47.2105H25.4545V54.4737Z"
      fill="white"
    />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 50 50"
    fill="none"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M49.5602 10.2151C51.6578 4.17854 45.8953 -1.68832 39.8353 0.448675L5.10497 12.6916C-1.56205 15.0402 -1.74343 24.4486 4.82359 27.06L4.8608 27.0739L16.3787 31.3526C17.453 31.7874 18.3018 32.6548 18.7157 33.7547L23.1898 45.0559C25.7153 51.7436 35.1705 51.6157 37.5191 44.8605L49.5602 10.2151ZM40.9957 3.73905C44.2396 2.59497 47.4232 5.73652 46.2651 9.07107L34.224 43.7165C32.945 47.3952 27.8198 47.4603 26.4501 43.8141L21.976 32.5129C21.7976 32.0417 21.5733 31.5892 21.3062 31.1619L29.7197 22.7465C29.891 22.5868 30.0284 22.3943 30.1238 22.1803C30.2191 21.9664 30.2703 21.7355 30.2745 21.5013C30.2786 21.2671 30.2355 21.0345 30.1478 20.8174C30.0601 20.6002 29.9295 20.4029 29.7639 20.2373C29.5983 20.0717 29.401 19.9412 29.1839 19.8534C28.9667 19.7657 28.7341 19.7226 28.4999 19.7268C28.2657 19.7309 28.0348 19.7822 27.8208 19.8775C27.6069 19.9728 27.4144 20.1102 27.2547 20.2816L18.8343 28.6994C18.4607 28.4699 18.0654 28.2723 17.6483 28.1064L17.6135 28.0924L6.0956 23.8138C2.53769 22.3814 2.64699 17.2563 6.26303 15.9797L40.9957 3.73905Z"
      fill="#F8FAFC"
    />
  </svg>
);

// --- Chat Bubble ---

const ChatBubble = ({ message, isUser }) => (
  <div
    className={`flex w-full mb-2 ${isUser ? "justify-end" : "justify-start"}`}
  >
    <div
      className="max-w-[75%] px-3 py-2 text-sm leading-snug shadow-sm wrap-break-words"
      style={{
        backgroundColor: isUser ? "#E8472A" : "#ffffff",
        color: isUser ? "#ffffff" : "#1a2540",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
      }}
    >
      {message}
    </div>
  </div>
);

// --- Constants ---

const BUBBLE_BASE =
  "z-50 rounded-full bg-secondary border-4 border-white shadow-lg cursor-pointer select-none transition-all duration-300 ease-in-out";

const BUBBLE_HOVERED = "p-3 rotate-0";
const BUBBLE_DEFAULT = "p-2 rotate-360";

const PANEL_BASE =
  "container pr-8 overflow-hidden pl-4 py-3 flex gap-4 flex-row bg-secondary/30 backdrop-blur-xs rounded-l-full -mr-5 shadow-lg transition-all duration-300 ease-in-out items-center";

const INITIAL_MESSAGES = [
  { id: 1, text: "Halo! Ada yang bisa saya bantu?", isUser: false },
];

// --- Main Component ---

const ChatBotBubble = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    if (isActive) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isActive]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleToggleActive = useCallback(
    () => setIsActive((prev) => !prev),
    [],
  );

  // Agentic Auto Navigation
  const handleAgenticNavigation = useCallback((toolCalls) => {
    if (!Array.isArray(toolCalls)) return;

    for (const tool of toolCalls) {
      const fn = tool.function || {};
      if (fn.name === "navigate_to_page") {
        try {
          const args = typeof fn.arguments === "string" ? JSON.parse(fn.arguments) : fn.arguments;
          const directPath = args.path || args.page;
          const mappedPath = ROUTE_MAP[args.page] || ROUTE_MAP[directPath] || directPath;

          if (mappedPath) {
            const targetUrl = mappedPath.startsWith("/") ? mappedPath : `/${mappedPath}`;
            setTimeout(() => {
              navigate(targetUrl);
            }, 300);
          }
        } catch (err) {
          console.error("Navigation error:", err);
        }
      }
    }
  }, [navigate]);

  // Connect to Live RAG Backend API
  const handleSend = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { id: Date.now(), text: trimmed, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    const updatedHistory = [
      ...history,
      { role: "user", content: trimmed }
    ];
    setHistory(updatedHistory);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          messages: updatedHistory,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server status: ${response.status}`);
      }

      const data = await response.json();
      const choice = data.choices?.[0] || {};
      const assistantMessage = choice.message || {};
      const content = assistantMessage.content || "Informasi telah diproses.";
      const toolCalls = assistantMessage.tool_calls || [];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: content,
          isUser: false,
        },
      ]);

      setHistory((prev) => [
        ...prev,
        { role: "assistant", content }
      ]);

      if (toolCalls.length > 0) {
        handleAgenticNavigation(toolCalls);
      }
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Maaf, terjadi kendala saat menghubungkan ke AI Server.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, history, handleAgenticNavigation]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        setIsActive(true); // Pastikan chat terbuka saat mengirim pesan
        handleSend();
      }
    },
    [handleSend],
  );

  const STYLE_CONTAINER = "fixed bottom-24 right-10 flex flex-col rounded-lg bg-secondary/30 shadow-lg backdrop-blur-xs w-78 h-90 overflow-hidden transition-all duration-300 ease-in-out";

  return (
    <div onMouseLeave={isActive ? handleMouseLeave : undefined}>
      {/* Chat container — hanya bagian ini yang ditambahkan: scroll area + bubbles */}

      <div
        className={`${STYLE_CONTAINER} ${isHovered && isActive ? "opacity-100 z-50" : "opacity-0 -z-10"} `}
      >
        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3"
          onWheel={(e) => e.stopPropagation()}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.2) transparent",
          }}
        >
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.text}
              isUser={msg.isUser}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>


      {/* Floating button + hover panel — tidak diubah dari aslinya */}
      <div className="fixed bottom-7 right-7 z-50 flex flex-row-reverse items-center">
        <button
          type="button"
          aria-label={isActive ? "Tutup chat" : "Buka chat"}
          onMouseEnter={handleMouseEnter}
          onClick={handleToggleActive}
          className={`${BUBBLE_BASE} ${isHovered ? BUBBLE_HOVERED : BUBBLE_DEFAULT}`}
        >
          {isHovered ? <SendIcon /> : <BotIcon />}
        </button>

        <div
          className={`${PANEL_BASE} ${isHovered ? "opacity-100 w-70" : "opacity-0 w-0"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M17.1404 0.507774C17.4541 0.204797 17.8742 0.0371502 18.3103 0.0409398C18.7464 0.0447294 19.1636 0.219653 19.472 0.528035C19.7803 0.836417 19.9553 1.25358 19.9591 1.68968C19.9628 2.12579 19.7952 2.54593 19.4922 2.85962L12.3518 10L19.4922 17.1404C19.6511 17.2938 19.7778 17.4773 19.865 17.6803C19.9521 17.8832 19.998 18.1014 19.9999 18.3223C20.0019 18.5431 19.9598 18.7621 19.8761 18.9666C19.7925 19.171 19.669 19.3567 19.5128 19.5128C19.3567 19.669 19.171 19.7925 18.9666 19.8761C18.7621 19.9598 18.5431 20.0019 18.3223 19.9999C18.1014 19.998 17.8832 19.9521 17.6803 19.865C17.4773 19.7778 17.2938 19.6511 17.1404 19.4922L10 12.3518L2.85962 19.4922C2.70619 19.6511 2.52266 19.7778 2.31974 19.865C2.11681 19.9521 1.89856 19.998 1.67771 19.9999C1.45687 20.0019 1.23785 19.9598 1.03344 19.8761C0.829032 19.7925 0.643326 19.669 0.487158 19.5128C0.33099 19.3567 0.207487 19.171 0.123857 18.9666C0.0402271 18.7621 -0.0018563 18.5431 6.27992e-05 18.3223C0.0019819 18.1014 0.0478651 17.8832 0.135035 17.6803C0.222205 17.4773 0.348915 17.2938 0.507774 17.1404L7.64815 10L0.507774 2.85962C0.348915 2.70619 0.222205 2.52266 0.135035 2.31974C0.0478651 2.11681 0.0019819 1.89856 6.27992e-05 1.67771C-0.0018563 1.45687 0.0402271 1.23785 0.123857 1.03344C0.207487 0.829032 0.33099 0.643326 0.487158 0.487158C0.643326 0.33099 0.829032 0.207487 1.03344 0.123857C1.23785 0.0402271 1.45687 -0.0018563 1.67771 6.27992e-05C1.89856 0.0019819 2.11681 0.0478651 2.31974 0.135035C2.52266 0.222205 2.70619 0.348915 2.85962 0.507774L10 7.64815L17.1404 0.507774Z"
              fill="#F8FAFC"
            />
          </svg>
          <input
            className="bg-white rounded-full p-1 text-black placeholder:text-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ketik pesan..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBotBubble;
