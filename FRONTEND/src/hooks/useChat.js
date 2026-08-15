import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL =
  import.meta.env.VITE_API_URL || "https://app.daffadev.my.id/api/v1";

export const ROUTE_MAP = {
  'beranda': '/',
  'home': '/',
  'tentang-kami': '/tentang-kami',
  'tentang': '/tentang-kami',
  'guru-dan-staf': '/tentang-kami/guru-dan-staf',
  'guru': '/tentang-kami/guru-dan-staf',
  'prestasi': '/tentang-kami/prestasi',
  'sejarah': '/tentang-kami/sejarah',
  'profil-sekolah': '/tentang-kami/profil-sekolah',
  'hubungan-industri': '/tentang-kami/hubungan-industri',
  'program': '/program',
  'bkk': '/program/bkk',
  'jurusan': '/program/jurusan',
  'ekskul': '/program/ekskul',
  'lsp': '/program/lsp',
  'informasi': '/informasi',
  'berita': '/informasi/berita',
  'kalender-akademik': '/informasi/kalender-akademik',
  'pengumuman': '/informasi/pengumuman',
  'dokumentasi': '/dokumentasi',
  'galeri-photo': '/dokumentasi/galeri-photo',
  'galeri-video': '/dokumentasi/galeri-video',
  'kegiatan-sekolah': '/dokumentasi/kegiatan-sekolah',
  'virtual-tour': '/dokumentasi/virtual-tour',
  'portal': '/portal',
  'spmb': '/portal/spmb',
  'ppdb': '/portal/spmb',
  'kjp': '/portal/kjp',
  'pip': '/portal/pip',
};

/**
 * Sends messages to Laravel RAG Backend API
 * @param {Array<{role: string, content: string}>} messages 
 * @returns {Promise<{message: object, finishReason: string, toolCalls: Array}>}
 */
export async function sendChatMessage(messages) {
  const response = await fetch(`${API_URL}/chat/completions`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ messages, stream: false }),
  });

  if (!response.ok) {
    throw new Error(`AI API error (${response.status})`);
  }

  const data = await response.json();
  const choice = data.choices?.[0] || {};
  return {
    message: choice.message || { role: 'assistant', content: '' },
    finishReason: choice.finish_reason || 'stop',
    toolCalls: choice.message?.tool_calls || [],
  };
}

/**
 * Custom React Hook for AI Chatbot integration
 */
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleToolCalls = useCallback((toolCalls) => {
    if (!Array.isArray(toolCalls)) return;
    for (const tool of toolCalls) {
      if (tool.function?.name === 'navigate_to_page') {
        try {
          const args = typeof tool.function.arguments === 'string'
            ? JSON.parse(tool.function.arguments)
            : tool.function.arguments;
          
          const target = args.path || ROUTE_MAP[args.page] || args.page;
          if (target) {
            const formattedPath = target.startsWith('/') ? target : `/${target}`;
            setTimeout(() => {
              navigate(formattedPath);
            }, 300);
          }
        } catch (e) {
          console.error('Error executing navigation tool:', e);
        }
      }
    }
  }, [navigate]);

  const sendMessage = useCallback(async (userText) => {
    if (!userText?.trim() || loading) return;

    const userMessage = { role: 'user', content: userText.trim() };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setLoading(true);
    setError(null);

    try {
      const res = await sendChatMessage(updatedMessages);
      const assistantMessage = res.message;

      setMessages((prev) => [...prev, assistantMessage]);

      if (res.toolCalls && res.toolCalls.length > 0) {
        handleToolCalls(res.toolCalls);
      }

      return assistantMessage;
    } catch (err) {
      setError(err.message);
      const errorMessage = { role: 'assistant', content: 'Maaf, terjadi kesalahan saat menghubungi AI server.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading, handleToolCalls]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearChat,
  };
}
