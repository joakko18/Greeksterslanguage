'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/app/i18n/client';
import Image from 'next/image';

interface ChatbotModalProps {
  lng: string;
}

interface Message {
  from: 'bot' | 'user';
  text: string;
}

export default function ChatbotModal({ lng }: ChatbotModalProps) {
  const { t } = useTranslation(lng, 'translation');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: 'bot', text: t('chatbot_welcome_message') }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;
    const userMessage: Message = { from: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, lng }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponse: Message = { from: 'bot', text: data.text };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = { from: 'bot', text: t('chatbot_error_message') };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button with Pop-up Message */}
      {!open && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center">
          {/* Speech Bubble Pop-up, now visible on all screens */}
          {showPopup && (
            <div className="relative mb-2 animate-pulse-fast bg-white rounded-xl py-2 px-4 shadow-lg">
              <p className="text-sm font-semibold text-blue-900">{t('can_i_help_you')}</p>
              {/* Adjusted triangle for the speech bubble */}
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-t-8 border-r-8 border-transparent border-t-white transform -translate-x-1/2"></div>
            </div>
          )}

          {/* Chatbot Figurine and Pastel Background */}
          <button
            onClick={() => setOpen(true)}
            className="relative w-24 h-24 rounded-full p-4 bg-green-300 transition-all transform hover:scale-110 shadow-lg"
            aria-label={t('open_chat_aria_label')}
          >
            <Image
              src="https://res.cloudinary.com/desem7vhd/image/upload/v1754828339/Untitled_2_wm1vkb.png"
              alt="Chatbot icon"
              fill
              className="object-contain"
            />
          </button>
        </div>
      )}

      {/* Chat Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
          <div className="w-full h-full absolute" onClick={() => setOpen(false)} />
          <div className="relative m-8 pointer-events-auto max-w-sm w-full">
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col h-[450px]">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-2xl">
                <span className="text-white font-semibold text-lg">{t('chatbot_title')}</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white text-2xl hover:text-blue-200"
                  aria-label={t('close_chat_aria_label')}
                >
                  &times;
                </button>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-blue-50">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                        msg.from === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none border'
                      }`}
                    >
                      {msg.text}
                  </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-2xl max-w-[80%] text-sm bg-white text-gray-800 rounded-bl-none border">
                      <span className="animate-pulse">...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              {/* Input */}
              <form
                className="flex items-center border-t px-3 py-2 bg-white rounded-b-2xl"
                onSubmit={e => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <input
                  type="text"
                  className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  placeholder={t('chatbot_input_placeholder')}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  autoFocus
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`ml-2 rounded-full px-4 py-2 font-semibold transition ${
                    isLoading || input.trim() === '' ? 'bg-gray-400 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  disabled={isLoading || input.trim() === ''}
                >
                  {t('chatbot_send_button')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}