'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.VITE_API_URL ||
  `http://localhost:${process.env.CLIENT_API_PORT ?? 3000}/api`;

export default function AIConsultantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Xin chào! 👋 Tôi là trợ lý AI tư vấn khóa học của EngliMaster. Tôi có thể giúp bạn:\n\n• Tìm khóa học phù hợp với trình độ\n• Tư vấn về học phí và lịch học\n• Hướng dẫn đăng ký khóa học\n• Trả lời câu hỏi về chương trình học\n\nBạn muốn biết gì về khóa học của chúng tôi? 😊',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      // Try streaming first
      const streamUrl = `${API_BASE_URL}/public/v1/ai/consultant/stream?question=${encodeURIComponent(userMessage)}`;
      const eventSource = new EventSource(streamUrl);

      let assistantResponse = '';

      eventSource.onmessage = (event) => {
        if (event.data === '[DONE]') {
          eventSource.close();
          setIsLoading(false);
          return;
        }

        try {
          const chunk = JSON.parse(event.data);

          if (chunk.type === 'error') {
            throw new Error(chunk.content || 'Có lỗi xảy ra');
          }

          if (chunk.output) {
            assistantResponse += chunk.output;

            // Update or create assistant message
            setMessages((prev) => {
              const lastMsg = prev[prev.length - 1];
              if (lastMsg && lastMsg.role === 'assistant') {
                // Update existing assistant message
                return prev.map((msg, idx) =>
                  idx === prev.length - 1
                    ? { ...msg, content: assistantResponse }
                    : msg
                );
              } else {
                // Create new assistant message
                return [
                  ...prev,
                  {
                    role: 'assistant' as const,
                    content: assistantResponse,
                    timestamp: new Date(),
                  },
                ];
              }
            });
          }
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error parsing SSE chunk:', e);
          }
        }
      };

      eventSource.onerror = (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('SSE error:', error);
        }
        eventSource.close();
        setIsLoading(false);
        // Fallback to non-streaming
        handleNonStreamingQuery(userMessage);
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Streaming error, falling back to non-streaming:', error);
      }
      handleNonStreamingQuery(userMessage);
    }
  };

  const handleNonStreamingQuery = async (question: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/v1/ai/consultant/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result.answer || 'Xin lỗi, tôi không thể trả lời câu hỏi này.',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error querying AI:', error);
      }
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Xin lỗi, đã xảy ra lỗi khi kết nối với trợ lý AI. Vui lòng thử lại sau hoặc liên hệ với chúng tôi qua form liên hệ.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    'Khóa học nào phù hợp với người mới bắt đầu?',
    'Học phí của các khóa học là bao nhiêu?',
    'Lịch học như thế nào?',
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Mở AI tư vấn"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Tư Vấn</h3>
                <p className="text-xs text-white/80">Trợ lý thông minh</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Đóng chat"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-white text-gray-900 shadow-md border border-gray-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-3 py-2 shadow-md border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Câu hỏi gợi ý:</p>
              <div className="flex flex-col gap-1">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

