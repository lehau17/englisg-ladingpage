'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIConsultantPage() {
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

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.VITE_API_URL ||
    `http://localhost:${process.env.CLIENT_API_PORT ?? 3000}/api`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    'Cách đăng ký khóa học?',
    'Khóa học IELTS có gì?',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EngliMaster
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/enroll"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Đăng ký khóa học
              </Link>
              <Link
                href="/"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                ← Về trang chủ
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
            <ChatBubbleLeftRightIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Tư Vấn Khóa Học
          </h1>
          <p className="text-lg text-gray-600">
            Hỏi bất cứ điều gì về khóa học, chúng tôi sẽ tư vấn cho bạn!
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-white text-gray-900 shadow-md border border-gray-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-indigo-100' : 'text-gray-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-200">
                  <div className="flex space-x-2">
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
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Câu hỏi gợi ý:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center space-x-2"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                <span>Gửi</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Tip: Bạn có thể hỏi về khóa học, học phí, lịch học, hoặc cách đăng ký
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Đã tìm được khóa học phù hợp? Đăng ký ngay!
          </p>
          <Link
            href="/enroll"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Đăng Ký Khóa Học Ngay →
          </Link>
        </div>
      </div>
    </div>
  );
}

