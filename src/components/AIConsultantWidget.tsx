/**
 * @file AIConsultantWidget.tsx
 * @description Widget chat AI tư vấn khóa học nổi ở góc màn hình.
 * Cho phép user hỏi đáp với AI về khóa học, học phí, lịch học.
 *
 * Features:
 * - Floating button với animation pulse
 * - Chat window với streaming response
 * - Lưu session vào localStorage để tiếp tục conversation
 * - Suggested questions cho user mới
 * - Markdown rendering cho AI responses
 */

'use client';

// ==================== IMPORTS ====================
// Icons từ Heroicons
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';
// React hooks
import { useEffect, useRef, useState } from 'react';
// Library render markdown content từ AI
import ReactMarkdown from 'react-markdown';

/**
 * @interface Message
 * @description Định nghĩa cấu trúc một tin nhắn trong chat
 * @property {'user' | 'assistant'} role - Vai trò: 'user' (người dùng) hoặc 'assistant' (AI)
 * @property {string} content - Nội dung tin nhắn (có thể là markdown)
 * @property {Date} timestamp - Thời gian gửi
 */
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ==================== CONSTANTS ====================
// URL của API backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.haudev.io.vn/api';

// Keys để lưu vào localStorage, giúp tiếp tục chat khi reload trang
const GUEST_SESSION_KEY = 'guestChatSessionId';    // ID của guest session
const CONVERSATION_ID_KEY = 'guestConversationId'; // ID của conversation hiện tại

/**
 * @component AIConsultantWidget
 * @description Widget chat AI nổi ở góc phải dưới màn hình
 */
export default function AIConsultantWidget() {
  // ==================== STATE MANAGEMENT ====================
  // Trạng thái đóng/mở widget
  const [isOpen, setIsOpen] = useState(false);

  // Mảng các tin nhắn, khởi tạo với lời chào từ AI
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Xin chào! 👋 Tôi là trợ lý AI tư vấn khóa học của EngliMaster. Tôi có thể giúp bạn:\n\n• Tìm khóa học phù hợp với trình độ\n• Tư vấn về học phí và lịch học\n• Hướng dẫn đăng ký khóa học\n• Trả lời câu hỏi về chương trình học\n\nBạn muốn biết gì về khóa học của chúng tôi? 😊',
      timestamp: new Date(),
    },
  ]);

  // Input text từ user
  const [input, setInput] = useState('');
  // Trạng thái đang gửi/nhận tin nhắn
  const [isLoading, setIsLoading] = useState(false);
  // ID của guest session (lưu localStorage)
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  // ID của conversation hiện tại
  const [conversationId, setConversationId] = useState<string | null>(null);

  // ==================== REFS ====================
  // Ref để auto-scroll xuống tin nhắn mới nhất
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Ref để focus input khi mở widget
  const inputRef = useRef<HTMLInputElement>(null);

  // ==================== EFFECTS ====================
  /**
   * Effect 1: Load guest session và lịch sử chat từ localStorage khi mount
   */
  useEffect(() => {
    /**
     * Hàm async load guest session và conversation history
     */
    const loadGuestSession = async () => {
      // Đọc sessionId từ localStorage
      const sessionId = localStorage.getItem(GUEST_SESSION_KEY);

      if (sessionId) {
        setGuestSessionId(sessionId);

        // Thử load lịch sử chat từ API
        try {
          const response = await fetch(`${API_BASE_URL}/public/v1/ai/guest-chat/history`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guestSessionId: sessionId }),
          });

          if (response.ok) {
            const result = await response.json();
            // Xử lý wrapper response (API có thể trả về { data: ... })
            const data = result.data || result;

            // Lấy conversation mới nhất
            if (data.conversations && data.conversations.length > 0) {
              const latestConv = data.conversations[0];
              setConversationId(latestConv.id);
              localStorage.setItem(CONVERSATION_ID_KEY, latestConv.id);

              // Load các tin nhắn
              if (latestConv.messages && latestConv.messages.length > 0) {
                // Map messages từ API sang format của component
                const loadedMessages = latestConv.messages.map((msg: { role: 'user' | 'assistant'; content: string; createdAt: string }) => ({
                  role: msg.role,
                  content: msg.content,
                  timestamp: new Date(msg.createdAt),
                }));

                // Giữ lại welcome message + thêm loaded messages
                setMessages([
                  messages[0], // Lời chào
                  ...loadedMessages,
                ]);
              }
            }
          }
        } catch (error) {
          console.error('Failed to load chat history:', error);
        }
      }
    };

    loadGuestSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Effect 2: Auto-scroll xuống cuối khi có tin nhắn mới
   */
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  /**
   * Effect 3: Focus vào input khi mở widget
   */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // ==================== EVENT HANDLERS ====================
  /**
   * Xử lý gửi tin nhắn
   * - Nếu chưa có conversation: gọi API create
   * - Nếu đã có conversation: gọi API stream
   */
  const handleSend = async () => {
    // Validate input
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Thêm tin nhắn của user vào UI ngay lập tức
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      if (!conversationId) {
        // ==================== FIRST MESSAGE: CREATE CONVERSATION ====================
        // Build request body
        const body: Record<string, string> = { question: userMessage };
        // Chỉ thêm guestSessionId nếu là UUID hợp lệ
        if (guestSessionId && guestSessionId !== 'undefined' && guestSessionId !== 'null') {
          body.guestSessionId = guestSessionId;
        }

        // Gọi API tạo conversation mới
        const response = await fetch(`${API_BASE_URL}/public/v1/ai/guest-chat/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error('Failed to create chat');

        const result = await response.json();
        const data = result.data || result;

        // Lưu IDs vào state và localStorage
        setGuestSessionId(data.guestSessionId);
        setConversationId(data.conversationId);
        localStorage.setItem(GUEST_SESSION_KEY, data.guestSessionId);
        localStorage.setItem(CONVERSATION_ID_KEY, data.conversationId);

        // Thêm response từ AI
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.answer,
            timestamp: new Date(),
          },
        ]);

        setIsLoading(false);
      } else {
        // ==================== CONTINUE CONVERSATION: STREAMING ====================
        // Gọi API streaming để nhận response từng phần
        const streamUrl = `${API_BASE_URL}/public/v1/ai/guest-chat/${conversationId}/stream`;
        const response = await fetch(streamUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversationId,
            question: userMessage,
          }),
        });

        if (!response.ok) throw new Error('Failed to stream chat');

        // Đọc response body như stream
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let assistantResponse = '';

        // Đọc stream từng chunk
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Decode chunk thành text
          const chunk = decoder.decode(value);
          // SSE format: mỗi line bắt đầu bằng "data: "
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              // Lấy phần data sau "data: "
              const data = line.slice(6);

              // Kết thúc stream
              if (data === '[DONE]') {
                setIsLoading(false);
                break;
              }

              try {
                const parsed = JSON.parse(data);

                // Xử lý error từ server
                if (parsed.type === 'error') {
                  throw new Error(parsed.content || 'Có lỗi xảy ra');
                }

                // Append output vào response
                if (parsed.output) {
                  assistantResponse += parsed.output;

                  // Cập nhật UI real-time (streaming effect)
                  setMessages((prev) => {
                    const lastMsg = prev[prev.length - 1];
                    // Nếu tin nhắn cuối là của assistant, update nó
                    if (lastMsg && lastMsg.role === 'assistant') {
                      return prev.map((msg, idx) =>
                        idx === prev.length - 1
                          ? { ...msg, content: assistantResponse }
                          : msg
                      );
                    } else {
                      // Nếu không, thêm tin nhắn mới
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
              } catch {
                // Ignore parse errors (incomplete JSON from stream)
              }
            }
          }
        }
      }
    } catch (error) {
      // Xử lý lỗi: hiển thị error message
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Xin lỗi, đã xảy ra lỗi khi kết nối với trợ lý AI. Vui lòng thử lại sau.',
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }
  };

  /**
   * Xử lý khi nhấn phím trong input
   * Enter (không Shift) = gửi tin nhắn
   * @param {React.KeyboardEvent} e - Keyboard event
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ==================== DATA ====================
  // Các câu hỏi gợi ý cho user mới
  const suggestedQuestions = [
    'Khóa học nào phù hợp với người mới bắt đầu?',
    'Học phí của các khóa học là bao nhiêu?',
    'Lịch học như thế nào?',
  ];

  // ==================== RENDER ====================
  return (
    <>
      {/* ==================== FLOATING BUTTON ==================== */}
      {/* Hiển thị khi widget đóng */}
      {!isOpen && (
        // fixed: vị trí cố định
        // bottom-6 right-6: cách góc dưới phải 24px
        // z-50: z-index 50 (nằm trên mọi element)
        // bg-gradient-to-r: gradient từ trái sang phải
        // from-indigo-600 to-purple-600: gradient indigo -> purple
        // text-white: chữ trắng
        // p-4: padding 16px
        // rounded-full: hình tròn
        // shadow-2xl: bóng đổ rất lớn
        // hover:shadow-3xl: bóng lớn hơn khi hover
        // hover:scale-110: phóng to 110% khi hover
        // transition-all duration-300: animation mượt
        // flex items-center justify-center: căn giữa icon
        // group: đánh dấu parent cho group animations
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Mở AI tư vấn"
        >
          {/* Chat icon */}
          {/* w-6 h-6: 24px */}
          <ChatBubbleLeftRightIcon className="w-6 h-6" />

          {/* Pulse indicator - chấm xanh nhấp nháy góc trên phải */}
          {/* absolute: vị trí tuyệt đối */}
          {/* -top-1 -right-1: nhô ra ngoài button */}
          {/* w-3 h-3: 12px */}
          {/* bg-green-400: màu xanh lá */}
          {/* rounded-full: hình tròn */}
          {/* animate-pulse: animation nhấp nháy */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* ==================== CHAT WIDGET ==================== */}
      {/* Hiển thị khi widget mở */}
      {isOpen && (
        // fixed: vị trí cố định
        // bottom-6 right-6: cách góc dưới phải 24px
        // z-50: z-index 50
        // w-96: chiều rộng 384px
        // h-[600px]: chiều cao 600px
        // bg-white: nền trắng
        // rounded-2xl: border-radius 16px
        // shadow-2xl: bóng đổ rất lớn
        // flex flex-col: flexbox dọc
        // overflow-hidden: ẩn phần tràn
        // border border-gray-200: viền xám
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">

          {/* ==================== HEADER ==================== */}
          {/* bg-gradient-to-r: gradient ngang */}
          {/* from-indigo-600 to-purple-600: gradient indigo -> purple */}
          {/* text-white: chữ trắng */}
          {/* p-4: padding 16px */}
          {/* flex items-center justify-between: phân bố 2 đầu */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between">

            {/* Left: Avatar + Info */}
            {/* flex items-center space-x-3: ngang hàng với khoảng cách 12px */}
            <div className="flex items-center space-x-3">

              {/* Avatar circle */}
              {/* w-10 h-10: 40px */}
              {/* bg-white/20: nền trắng 20% opacity */}
              {/* rounded-full: hình tròn */}
              {/* flex items-center justify-center: căn giữa icon */}
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
              </div>

              <div>
                {/* font-bold text-sm: tiêu đề đậm nhỏ */}
                <h3 className="font-bold text-sm">AI Tư Vấn</h3>
                {/* text-xs text-white/80: subtitle nhỏ, mờ */}
                <p className="text-xs text-white/80">Trợ lý thông minh</p>
              </div>
            </div>

            {/* Right: Close button */}
            {/* hover:bg-white/20: nền mờ khi hover */}
            {/* rounded-full: hình tròn */}
            {/* p-1: padding 4px */}
            {/* transition-colors: animation màu mượt */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Đóng chat"
            >
              {/* X icon */}
              {/* w-5 h-5: 20px */}
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* ==================== MESSAGES AREA ==================== */}
          {/* flex-1: chiếm hết không gian còn lại */}
          {/* overflow-y-auto: scroll dọc nếu cần */}
          {/* p-4: padding 16px */}
          {/* space-y-4: khoảng cách dọc 16px giữa tin nhắn */}
          {/* bg-gray-50: nền xám nhạt */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">

            {/* Map qua các tin nhắn */}
            {messages.map((message, index) => (
              // flex: container flex
              // justify-end: căn phải (user message)
              // justify-start: căn trái (assistant message)
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Message bubble */}
                {/* max-w-[80%]: chiều rộng tối đa 80% */}
                {/* rounded-2xl: border-radius 16px */}
                {/* px-3 py-2: padding 12px ngang, 8px dọc */}
                {/* text-sm: font-size 14px */}
                {/* User: gradient background, chữ trắng */}
                {/* Assistant: nền trắng, chữ đen, bóng đổ */}
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-white !text-gray-900 shadow-md border border-gray-200'
                    }`}
                >
                  {/* Render content: Markdown cho assistant, plain text cho user */}
                  {message.role === 'assistant' ? (
                    // ReactMarkdown: render markdown content từ AI
                    // prose prose-sm: typography styles
                    // max-w-none: không giới hạn width
                    // !text-gray-900: force text color to dark gray (override prose default)
                    <ReactMarkdown
                      className="prose prose-sm max-w-none !text-gray-900"
                      components={{
                        // Custom components cho các element markdown

                        // Link: màu indigo, underline, mở tab mới nếu external
                        a: ({ ...props }) => (
                          <a
                            {...props}
                            className="text-indigo-600 hover:text-indigo-800 underline font-medium"
                            target={props.href?.startsWith('http') ? '_blank' : undefined}
                            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          />
                        ),
                        // Paragraph: margin-bottom, không margin cho paragraph cuối, force text color
                        p: ({ ...props }) => <p {...props} className="mb-2 last:mb-0 !text-gray-900" />,
                        // Unordered list: bullet points, force text color
                        ul: ({ ...props }) => <ul {...props} className="list-disc ml-4 mb-2 !text-gray-900" />,
                        // Ordered list: numbered, force text color
                        ol: ({ ...props }) => <ol {...props} className="list-decimal ml-4 mb-2 !text-gray-900" />,
                        // List item: margin-bottom nhỏ, force text color
                        li: ({ ...props }) => <li {...props} className="mb-1 !text-gray-900" />,
                        // Strong: semi-bold, force text color
                        strong: ({ ...props }) => <strong {...props} className="font-semibold !text-gray-900" />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    // User message: plain text với whitespace preserve
                    // whitespace-pre-wrap: giữ xuống dòng
                    // break-words: tự động xuống dòng khi word quá dài
                    <div className="whitespace-pre-wrap break-words">{message.content}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator: 3 chấm nhảy */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-3 py-2 shadow-md border border-gray-200">
                  {/* 3 dots bouncing animation */}
                  {/* flex space-x-1: 3 dots với khoảng cách 4px */}
                  <div className="flex space-x-1">
                    {/* w-2 h-2: 8px */}
                    {/* bg-gray-400: màu xám */}
                    {/* rounded-full: hình tròn */}
                    {/* animate-bounce: animation nhảy */}
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    {/* animationDelay: delay để tạo hiệu ứng sóng */}
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Ref element để scroll xuống */}
            <div ref={messagesEndRef} />
          </div>

          {/* ==================== SUGGESTED QUESTIONS ==================== */}
          {/* Chỉ hiển thị khi mới chỉ có 1 tin nhắn (lời chào) */}
          {messages.length === 1 && (
            // px-4 py-2: padding
            // bg-gray-50: nền xám nhạt
            // border-t border-gray-200: viền trên xám
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              {/* text-xs text-gray-600: label nhỏ màu xám */}
              {/* mb-2: margin-bottom 8px */}
              <p className="text-xs text-gray-600 mb-2">Câu hỏi gợi ý:</p>

              {/* flex flex-col gap-1: danh sách dọc với khoảng cách 4px */}
              <div className="flex flex-col gap-1">
                {suggestedQuestions.map((question, index) => (
                  // Button cho mỗi câu hỏi gợi ý
                  // px-3 py-1.5: padding
                  // bg-white: nền trắng
                  // border border-gray-300: viền xám
                  // rounded-lg: border-radius 8px
                  // text-xs text-gray-700: chữ nhỏ xám
                  // hover:border-indigo-500: viền indigo khi hover
                  // hover:text-indigo-600: chữ indigo khi hover
                  // transition-colors: animation màu mượt
                  // text-left: căn trái text
                  <button
                    key={index}
                    onClick={() => {
                      setInput(question);
                      // Delay nhỏ để state update trước khi gọi handleSend
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

          {/* ==================== INPUT AREA ==================== */}
          {/* p-3: padding 12px */}
          {/* bg-white: nền trắng */}
          {/* border-t border-gray-200: viền trên xám */}
          <div className="p-3 bg-white border-t border-gray-200">

            {/* flex space-x-2: input + button ngang hàng với khoảng cách 8px */}
            <div className="flex space-x-2">

              {/* Input field */}
              {/* flex-1: chiếm hết không gian còn lại */}
              {/* px-3 py-2: padding */}
              {/* text-sm: font-size 14px */}
              {/* rounded-lg: border-radius 8px */}
              {/* border border-gray-300: viền xám */}
              {/* focus:ring-2 focus:ring-indigo-500: ring màu indigo khi focus */}
              {/* focus:border-transparent: ẩn border khi focus */}
              {/* disabled:bg-gray-100: nền xám khi disabled */}
              {/* disabled:cursor-not-allowed: con trỏ không cho phép khi disabled */}
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

              {/* Send button */}
              {/* px-4 py-2: padding */}
              {/* bg-gradient-to-r: gradient ngang */}
              {/* from-indigo-600 to-purple-600: gradient indigo -> purple */}
              {/* text-white: chữ trắng */}
              {/* rounded-lg: border-radius 8px */}
              {/* font-semibold: chữ semi-bold */}
              {/* hover:shadow-lg: bóng đổ khi hover */}
              {/* transition-all duration-300: animation mượt */}
              {/* disabled:opacity-50: mờ 50% khi disabled */}
              {/* disabled:cursor-not-allowed: con trỏ không cho phép */}
              {/* flex items-center justify-center: căn giữa icon */}
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {/* Paper airplane icon - gửi */}
                {/* w-4 h-4: 16px */}
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
