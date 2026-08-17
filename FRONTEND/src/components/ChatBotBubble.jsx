import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "http://localhost:8000/api/v1"
    : "https://app.daffadev.my.id/api/v1");

const ROUTE_MAP = {
  "beranda": "/",
  "home": "/",
  "tentang-kami": "/tentang-kami",
  "tentang kami": "/tentang-kami",
  "tentang": "/tentang-kami",
  "guru-dan-staf": "/tentang-kami/guru-dan-staf",
  "guru": "/tentang-kami/guru-dan-staf",
  "prestasi": "/tentang-kami/prestasi",
  "sejarah": "/tentang-kami/sejarah",
  "profil-sekolah": "/tentang-kami/profil-sekolah",
  "profil": "/tentang-kami/profil-sekolah",
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

// --- Markdown Message Formatter ---

const renderInlineMarkdown = (text) => {
  if (typeof text !== "string") return text;

  // Split by bold (**...**), inline code (`...`), and italic (*...*)
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-xs font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={index} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};

const FormattedMessage = ({ text }) => {
  if (!text) return null;

  const lines = text.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, lineIndex) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={lineIndex} className="h-1.5" />;
        }

        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={lineIndex} className="font-extrabold text-base mt-1 mb-0.5">
              {renderInlineMarkdown(trimmed.slice(2))}
            </h1>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={lineIndex} className="font-bold text-sm mt-1 mb-0.5">
              {renderInlineMarkdown(trimmed.slice(3))}
            </h2>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={lineIndex} className="font-semibold text-xs mt-0.5 mb-0.5">
              {renderInlineMarkdown(trimmed.slice(4))}
            </h3>
          );
        }

        const numMatch = trimmed.match(/^(\d+[\.\)])\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={lineIndex} className="flex items-start gap-1.5 ml-1">
              <span className="font-semibold text-xs leading-5 shrink-0 select-none">
                {numMatch[1]}
              </span>
              <span className="flex-1">
                {renderInlineMarkdown(numMatch[2])}
              </span>
            </div>
          );
        }

        const bulletMatch = trimmed.match(/^([\-\*•])\s+(.*)$/);
        if (bulletMatch) {
          return (
            <div key={lineIndex} className="flex items-start gap-1.5 ml-1">
              <span className="text-xs leading-5 shrink-0 select-none">•</span>
              <span className="flex-1">
                {renderInlineMarkdown(bulletMatch[2])}
              </span>
            </div>
          );
        }

        return (
          <p key={lineIndex} className="leading-relaxed">
            {renderInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
};

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
      <FormattedMessage text={message} />
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

// Smooth Animated Scroll Helper (human-like slow scrolling)
const smoothSlowScroll = (targetY, duration = 2400) => {
  return new Promise((resolve) => {
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetY - startY;
    if (Math.abs(distance) < 8) {
      resolve();
      return;
    }
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeInOutCubic for ultra smooth acceleration and braking
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentY = startY + distance * ease;
      window.scrollTo(0, currentY);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
};

// --- Main Component ---

const ChatBotBubble = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // High-Visibility Virtual Cursor State for Computer Use
  const [cursorState, setCursorState] = useState({
    visible: false,
    x: 0,
    y: 0,
    clicking: false,
  });

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const spotlightTimerRef = useRef(null);

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

  // Inject styles for editorial spotlight and cursor click ripple
  useEffect(() => {
    if (document.getElementById("technobot-spotlight-styles")) return;
    const style = document.createElement("style");
    style.id = "technobot-spotlight-styles";
    style.textContent = `
      @keyframes technobotCalloutPulse {
        0%, 100% {
          background-color: rgba(0, 122, 255, 0.07);
          border-left-color: #007aff;
        }
        50% {
          background-color: rgba(0, 122, 255, 0.13);
          border-left-color: #ff5733;
        }
      }
      @keyframes technobotClickRipple {
        0% {
          transform: scale(0.4);
          opacity: 0.9;
        }
        100% {
          transform: scale(2.2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // --- Dynamic Live DOM Scanner ---
  const extractPageContext = useCallback(() => {
    try {
      const mainContent = document.querySelector("main") || document.body;
      const sections = [];
      const seenTitles = new Set();

      const domSections = mainContent.querySelectorAll("section");
      domSections.forEach((sec, idx) => {
        const headerEl = sec.querySelector("h1, h2, h3, h4, [class*='font-bold'], [class*='font-semibold'], strong, p.font-bold");
        let title = headerEl ? (headerEl.innerText || headerEl.textContent || "").trim().split("\n")[0] : `Bagian ${idx + 1}`;
        title = title.replace(/[•\t\r]/g, "").trim();

        if (title && title.length > 2 && !seenTitles.has(title.toLowerCase())) {
          seenTitles.add(title.toLowerCase());
          const snippet = (sec.innerText || sec.textContent || "").replace(/\s+/g, " ").trim().slice(0, 150);
          sections.push({
            title,
            snippet: snippet || undefined,
          });
        }
      });

      const headings = mainContent.querySelectorAll("h1, h2, h3, h4, [data-section]");
      headings.forEach((h) => {
        if (h.closest("#technobot-root") || h.closest(".technobot-ignore")) return;
        const title = (h.innerText || h.textContent || "").replace(/[•\t\r]/g, "").trim().split("\n")[0];
        if (title && title.length > 2 && title.length < 80 && !seenTitles.has(title.toLowerCase())) {
          seenTitles.add(title.toLowerCase());
          sections.push({ title });
        }
      });

      return {
        path: window.location.pathname,
        title: document.title || "SMKN 26 Jakarta",
        sections: sections.slice(0, 12),
      };
    } catch (err) {
      console.warn("DOM scan error:", err);
      return {
        path: window.location.pathname,
        title: document.title,
        sections: [],
      };
    }
  }, []);

  // --- Editorial Spotlight Engine ---
  const applySpotlightStyle = (el) => {
    el.dataset.technobotOrigBg = el.style.backgroundColor || el.style.background || "";
    el.dataset.technobotOrigBorderLeft = el.style.borderLeft || "";
    el.dataset.technobotOrigPad = el.style.padding || "";
    el.dataset.technobotOrigRadius = el.style.borderRadius || "";
    el.dataset.technobotOrigTransition = el.style.transition || "";
    el.dataset.technobotOrigAnim = el.style.animation || "";

    el.style.transition = "background-color 0.4s ease, border-left 0.4s ease, padding 0.3s ease";
    el.style.borderLeft = "4px solid #007aff";
    el.style.backgroundColor = "rgba(0, 122, 255, 0.08)";
    el.style.borderRadius = "0 10px 10px 0";
    el.style.padding = "12px 18px";
    el.style.animation = "technobotCalloutPulse 2.5s ease-in-out infinite";
  };

  const removeSpotlightStyle = (el) => {
    el.style.backgroundColor = el.dataset.technobotOrigBg || "";
    el.style.background = el.dataset.technobotOrigBg || "";
    el.style.borderLeft = el.dataset.technobotOrigBorderLeft || "";
    el.style.padding = el.dataset.technobotOrigPad || "";
    el.style.borderRadius = el.dataset.technobotOrigRadius || "";
    el.style.transition = el.dataset.technobotOrigTransition || "";
    el.style.animation = el.dataset.technobotOrigAnim || "";

    delete el.dataset.technobotOrigBg;
    delete el.dataset.technobotOrigBorderLeft;
    delete el.dataset.technobotOrigPad;
    delete el.dataset.technobotOrigRadius;
    delete el.dataset.technobotOrigTransition;
    delete el.dataset.technobotOrigAnim;
  };

  // --- High-Visibility Virtual Cursor Animation for Computer Use ---
  const animateVirtualCursor = useCallback(async (targetEl) => {
    if (!targetEl) return;

    try {
      const rect = targetEl.getBoundingClientRect();
      const targetX = rect.left + Math.max(14, rect.width / 2);
      const targetY = rect.top + Math.max(12, rect.height / 2);

      // Start cursor from near chatbot bubble
      const startX = window.innerWidth - 65;
      const startY = window.innerHeight - 65;

      setCursorState({
        visible: true,
        x: startX,
        y: startY,
        clicking: false,
      });

      // Smooth glide to target over 0.75s
      await new Promise((r) => setTimeout(r, 60));
      setCursorState({
        visible: true,
        x: targetX,
        y: targetY,
        clicking: false,
      });

      await new Promise((r) => setTimeout(r, 800));

      // Click visual pulse
      setCursorState((prev) => ({ ...prev, clicking: true }));
      await new Promise((r) => setTimeout(r, 180));

      try {
        const mouseEvents = ["mousedown", "mouseup", "click"];
        mouseEvents.forEach((type) => {
          targetEl.dispatchEvent(
            new MouseEvent(type, {
              bubbles: true,
              cancelable: true,
              view: window,
              clientX: targetX,
              clientY: targetY,
            })
          );
        });

        if (typeof targetEl.click === "function") {
          targetEl.click();
        }
        if (typeof targetEl.focus === "function") {
          targetEl.focus();
        }
      } catch (err) {
        console.warn("Click dispatch warning:", err);
      }

      await new Promise((r) => setTimeout(r, 300));
      setCursorState((prev) => ({ ...prev, clicking: false }));

      // Stay visible for 1.2 seconds so the user can easily see it
      await new Promise((r) => setTimeout(r, 1200));
      setCursorState((prev) => ({ ...prev, visible: false }));
    } catch (err) {
      console.error("Cursor error:", err);
      setCursorState((prev) => ({ ...prev, visible: false }));
    }
  }, []);

  // --- Computer Use Action Executor (Click & Smooth Slow Scroll) ---
  const executeComputerAction = useCallback(
    async (actionType, targetQuery = "") => {
      console.log(`[TechnoBot Computer Use] Action: ${actionType}, Target: ${targetQuery}`);

      // 1. Scroll Down (Slow & Smooth over 2.2s)
      if (actionType === "scroll_down") {
        const currentY = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = currentY + Math.round(window.innerHeight * 0.75);

        // Show cursor in viewport center gliding while scrolling
        setCursorState({
          visible: true,
          x: window.innerWidth / 2 + 100,
          y: window.innerHeight / 2,
          clicking: false,
        });

        await smoothSlowScroll(targetY, 2200);

        await new Promise((r) => setTimeout(r, 800));
        setCursorState((prev) => ({ ...prev, visible: false }));
        return;
      }

      // 2. Scroll Bottom / Sampe Bawah (Slow & Smooth over 3.2s)
      if (actionType === "scroll_bottom" || actionType === "scroll_end") {
        const totalHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        );
        const targetY = Math.max(0, totalHeight - window.innerHeight);

        setCursorState({
          visible: true,
          x: window.innerWidth / 2 + 120,
          y: window.innerHeight / 2,
          clicking: false,
        });

        await smoothSlowScroll(targetY, 3200);

        await new Promise((r) => setTimeout(r, 800));
        setCursorState((prev) => ({ ...prev, visible: false }));
        return;
      }

      // 3. Scroll Up (Slow & Smooth over 2.2s)
      if (actionType === "scroll_up") {
        const currentY = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = Math.max(0, currentY - Math.round(window.innerHeight * 0.75));

        setCursorState({
          visible: true,
          x: window.innerWidth / 2 + 100,
          y: window.innerHeight / 2,
          clicking: false,
        });

        await smoothSlowScroll(targetY, 2200);

        await new Promise((r) => setTimeout(r, 800));
        setCursorState((prev) => ({ ...prev, visible: false }));
        return;
      }

      // 4. Scroll Top (Slow & Smooth over 2.5s)
      if (actionType === "scroll_top") {
        setCursorState({
          visible: true,
          x: window.innerWidth / 2 + 100,
          y: window.innerHeight / 2,
          clicking: false,
        });

        await smoothSlowScroll(0, 2500);

        await new Promise((r) => setTimeout(r, 800));
        setCursorState((prev) => ({ ...prev, visible: false }));
        return;
      }

      const cleanQuery = String(targetQuery).toLowerCase().replace(/[•"'\-]/g, "").trim();
      if (!cleanQuery) return;

      // Find candidates for clicking
      const candidates = Array.from(
        document.body.querySelectorAll("button, a, input, select, [role='button'], [tabindex], h1, h2, h3, h4, p, div, section")
      ).filter((el) => {
        if (["SCRIPT", "STYLE", "LINK", "META"].includes(el.tagName)) return false;
        const panel = document.querySelector(".fixed.bottom-24.right-10");
        if (panel && panel.contains(el)) return false;
        const bubble = document.querySelector(".fixed.bottom-7.right-7");
        if (bubble && bubble.contains(el)) return false;
        return true;
      });

      let bestElement = null;
      let bestScore = 0;

      candidates.forEach((el) => {
        const text = (el.innerText || el.textContent || el.getAttribute("aria-label") || el.getAttribute("placeholder") || "").toLowerCase().trim();
        const isClickable = el.tagName === "BUTTON" || el.tagName === "A" || el.getAttribute("role") === "button" || el.onclick != null || el.classList.contains("cursor-pointer");

        if (text && text.includes(cleanQuery)) {
          let score = 500 - text.length;
          if (isClickable) score += 400;
          if (text === cleanQuery) score += 300;

          if (score > bestScore) {
            bestScore = score;
            bestElement = el;
          }
        }
      });

      if (bestElement) {
        if (actionType === "scroll_to") {
          const rect = bestElement.getBoundingClientRect();
          const targetY = (window.pageYOffset || document.documentElement.scrollTop) + rect.top - window.innerHeight / 3;
          await smoothSlowScroll(Math.max(0, targetY), 2200);
        } else {
          await animateVirtualCursor(bestElement);
        }
      }

      // If mapped route and action is click/navigate, transition route smoothly
      if (actionType === "click" || actionType === "navigate") {
        const mappedRoute = ROUTE_MAP[cleanQuery];
        if (mappedRoute) {
          setTimeout(() => {
            navigate(mappedRoute);
          }, 450);
        }
      }
    },
    [animateVirtualCursor, navigate]
  );

  // --- AI Spotlight Engine ---
  const handleAgenticSpotlight = useCallback((toolCalls) => {
    if (!Array.isArray(toolCalls)) return;

    document.querySelectorAll("[data-technobot-spotlight]").forEach((el) => {
      removeSpotlightStyle(el);
      el.removeAttribute("data-technobot-spotlight");
    });
    if (spotlightTimerRef.current) {
      clearTimeout(spotlightTimerRef.current);
    }

    const highlightedElements = [];

    for (const tool of toolCalls) {
      const fn = tool.function || {};
      if (fn.name !== "spotlight_sections") continue;

      try {
        const args = typeof fn.arguments === "string" ? JSON.parse(fn.arguments) : fn.arguments;
        const targets = Array.isArray(args.targets) ? args.targets : (args.target ? [args.target] : []);

        targets.forEach((targetTitle) => {
          const cleanTarget = String(targetTitle).toLowerCase().replace(/[•"'\-]/g, "").trim();
          if (!cleanTarget) return;

          const allElements = document.body.querySelectorAll("*");
          let bestMatch = null;
          let bestScore = 0;

          allElements.forEach((el) => {
            if (["SCRIPT", "STYLE", "LINK", "META", "NAV", "FOOTER"].includes(el.tagName)) return;
            if (el.closest("[data-technobot-ignore]")) return;

            const chatPanel = document.querySelector(".fixed.bottom-24.right-10");
            if (chatPanel && chatPanel.contains(el)) return;
            const chatBubble = document.querySelector(".fixed.bottom-7.right-7");
            if (chatBubble && chatBubble.contains(el)) return;

            const ownText = Array.from(el.childNodes)
              .filter((n) => n.nodeType === Node.TEXT_NODE)
              .map((n) => n.textContent)
              .join(" ")
              .toLowerCase()
              .replace(/[•"'\-\s]+/g, " ")
              .trim();

            const fullText = (el.innerText || el.textContent || "").toLowerCase().replace(/[•"'\-]/g, "").trim();

            if (ownText && ownText.includes(cleanTarget)) {
              const score = 1000 - ownText.length;
              if (score > bestScore) {
                bestScore = score;
                bestMatch = el;
              }
            } else if (/^H[1-6]$/.test(el.tagName) && fullText.includes(cleanTarget)) {
              const score = 800 - fullText.length;
              if (score > bestScore) {
                bestScore = score;
                bestMatch = el;
              }
            } else if (fullText.includes(cleanTarget) && fullText.length < 400) {
              const score = 500 - fullText.length;
              if (score > bestScore) {
                bestScore = score;
                bestMatch = el;
              }
            }
          });

          if (bestMatch) {
            let targetContainer = bestMatch;

            const inlineTags = ["SPAN", "STRONG", "B", "EM", "A", "I"];
            if (inlineTags.includes(bestMatch.tagName)) {
              targetContainer = bestMatch.parentElement || bestMatch;
            }

            const parentCard = bestMatch.closest(".rounded-3xl, .rounded-2xl, [class*='rounded'], [class*='border-l']");
            if (parentCard && parentCard.offsetHeight < 450 && parentCard !== document.querySelector("main")) {
              targetContainer = parentCard;
            }

            if (!highlightedElements.includes(targetContainer)) {
              highlightedElements.push(targetContainer);
              targetContainer.setAttribute("data-technobot-spotlight", "true");
              applySpotlightStyle(targetContainer);
            }
          }
        });
      } catch (err) {
        console.error("[TechnoBot Spotlight] parse error:", err);
      }
    }

    if (highlightedElements.length > 0) {
      const firstTarget = highlightedElements[0];
      setTimeout(() => {
        const rect = firstTarget.getBoundingClientRect();
        const targetY = (window.pageYOffset || document.documentElement.scrollTop) + rect.top - window.innerHeight / 3;
        smoothSlowScroll(Math.max(0, targetY), 2000);
      }, 250);

      spotlightTimerRef.current = setTimeout(() => {
        highlightedElements.forEach((el) => {
          removeSpotlightStyle(el);
          el.removeAttribute("data-technobot-spotlight");
        });
      }, 8000);
    }
  }, []);

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

  // Connect to Live RAG Backend API with Computer Use & Spotlight
  const handleSend = useCallback(async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { id: Date.now(), text: trimmed, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    // Advanced Natural Language Computer Use Intent Parser
    const lowerQuery = trimmed.toLowerCase();
    const pendingActions = [];

    // 1. Compound / Multi-step intent: "klik ... lalu scroll ..."
    const compoundMatch = lowerQuery.match(/(klik|pencet|pilih|buka)\s+(.+?)\s+(lalu|kemudian|terus|setelah itu)\s+(scrol+|gulir)\s*(.*)/i);
    if (compoundMatch) {
      const clickTarget = compoundMatch[2].replace(/^(bagian|menu|halaman)\s+/i, "").trim();
      const scrollDirection = compoundMatch[5].trim();

      pendingActions.push({ type: "click", target: clickTarget });

      if (scrollDirection.includes("bawah") || scrollDirection.includes("kebawah")) {
        pendingActions.push({ type: "scroll_bottom", target: "", delay: 1100 });
      } else if (scrollDirection.includes("atas") || scrollDirection.includes("keatas")) {
        pendingActions.push({ type: "scroll_top", target: "", delay: 1100 });
      } else {
        pendingActions.push({ type: "scroll_down", target: "", delay: 1100 });
      }
    } else {
      // 2. Click / Navigation intent
      if (/^(klik|pencet|pilih|buka)\s+/i.test(lowerQuery)) {
        const target = trimmed.replace(/^(klik|pencet|pilih|buka)\s+(bagian\s+|menu\s+|halaman\s+)?/i, "").trim();
        pendingActions.push({ type: "click", target });
      }
      // 3. Scroll intent
      else if (/(scrol+|gulir)/i.test(lowerQuery)) {
        if (/sampe\s*bawah|sampai\s*bawah|paling\s*bawah/i.test(lowerQuery)) {
          pendingActions.push({ type: "scroll_bottom", target: "" });
        } else if (/paling\s*atas|ke\s*paling\s*atas/i.test(lowerQuery)) {
          pendingActions.push({ type: "scroll_top", target: "" });
        } else if (/ke\s*bawah|kebawah|down/i.test(lowerQuery)) {
          pendingActions.push({ type: "scroll_down", target: "" });
        } else if (/ke\s*atas|keatas|up/i.test(lowerQuery)) {
          pendingActions.push({ type: "scroll_up", target: "" });
        } else {
          const matchTarget = lowerQuery.match(/(?:scrol+|gulir)\s*(?:ke\s*bagian|ke)\s*(.+)/i);
          if (matchTarget && matchTarget[1]) {
            pendingActions.push({ type: "scroll_to", target: matchTarget[1].trim() });
          } else {
            pendingActions.push({ type: "scroll_down", target: "" });
          }
        }
      }
    }

    const updatedHistory = [
      ...history,
      { role: "user", content: trimmed }
    ];
    setHistory(updatedHistory);

    try {
      const pageContext = extractPageContext();

      const response = await fetch(`${API_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          messages: updatedHistory,
          page_context: pageContext,
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
        handleAgenticSpotlight(toolCalls);

        for (const tool of toolCalls) {
          const fnName = tool?.function?.name;
          if (fnName === "computer_action") {
            const rawArgs = tool.function.arguments;
            const args = typeof rawArgs === "string" ? JSON.parse(rawArgs) : rawArgs;
            const act = args.action || "click";
            const target = args.target || "";
            executeComputerAction(act, target);
          } else if (fnName === "click_element") {
            const rawArgs = tool.function.arguments;
            const args = typeof rawArgs === "string" ? JSON.parse(rawArgs) : rawArgs;
            if (args.target) {
              executeComputerAction("click", args.target);
            }
          }
        }
      }

      // Execute client-side parsed actions
      if (pendingActions.length > 0) {
        pendingActions.forEach((act) => {
          setTimeout(() => {
            executeComputerAction(act.type, act.target);
          }, act.delay || 300);
        });
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
  }, [inputValue, isLoading, history, extractPageContext, handleAgenticNavigation, handleAgenticSpotlight, executeComputerAction]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        setIsActive(true);
        handleSend();
      }
    },
    [handleSend],
  );

  const STYLE_CONTAINER = "fixed bottom-24 right-10 flex flex-col rounded-lg bg-secondary/30 shadow-lg backdrop-blur-xs w-78 h-90 overflow-hidden transition-all duration-300 ease-in-out";

  return (
    <div onMouseLeave={isActive ? handleMouseLeave : undefined}>
      {/* High-Visibility Standard Virtual OS Pointer Cursor */}
      {cursorState.visible && (
        <div
          style={{
            position: "fixed",
            left: `${cursorState.x}px`,
            top: `${cursorState.y}px`,
            pointerEvents: "none",
            zIndex: 999999,
            transition: "left 0.75s cubic-bezier(0.22, 1, 0.36, 1), top 0.75s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: `translate(-3px, -3px) scale(${cursorState.clicking ? 0.88 : 1})`,
          }}
        >
          {/* Crisp High-Contrast OS Cursor SVG */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              filter: "drop-shadow(0 4px 10px rgba(0, 122, 255, 0.45)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))",
            }}
          >
            <path
              d="M3 3L10.5 21L14 14L21 10.5L3 3Z"
              fill="#0f172a"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>

          {/* Click Ripple Wave */}
          {cursorState.clicking && (
            <span
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(0, 122, 255, 0.4)",
                border: "2px solid #007aff",
                animation: "technobotClickRipple 0.5s ease-out forwards",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      )}

      {/* Chat container */}
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

      {/* Floating button + hover panel */}
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
            onClick={setIsHovered.bind(null, false)}
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
