
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../../types';
import { renderMarkdown } from '../../utils/renderMarkdown';

interface ChatbotProps {
  systemInstruction: string;
  initialMessage: string;
  suggestedPrompts?: string[];
  isPdfMode?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ systemInstruction, initialMessage, suggestedPrompts = [], isPdfMode = false }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showPrompts, setShowPrompts] = useState(true);

  useEffect(() => {
    try {
      if (!process.env.API_KEY) return;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
      });
      setChat(chatSession);
      setChatHistory([{ role: 'model', content: initialMessage }]);
      setShowPrompts(true); // Reset prompts visibility on new session
      // FIX: Add curly braces to the catch block to fix syntax error and subsequent parsing issues.
    } catch (error) {
      console.error("Error initializing chat:", error);
      setChatError("Không thể khởi tạo chatbot. Vui lòng thử lại sau.");
    }
  }, [systemInstruction, initialMessage]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !chat || isChatLoading) return;

    const userInput: ChatMessage = { role: 'user', content: message.trim() };
    setChatHistory(prev => [...prev, userInput]);
    setChatInput('');
    setIsChatLoading(true);
    setChatError(null);
    setShowPrompts(false);

    try {
      const stream = await chat.sendMessageStream({ message: userInput.content });
      let modelResponse = '';
      setChatHistory(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setChatHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].content = modelResponse;
          return newHistory;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = "Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại.";
      setChatError(errorMessage);
      setChatHistory(prev => {
        const newHistory = [...prev];
        if (newHistory.length > 0 && newHistory[newHistory.length - 1].role === 'model') {
          newHistory[newHistory.length - 1].content = errorMessage;
          return newHistory;
        }
        return [...newHistory, { role: 'model', content: errorMessage }];
      });
    } finally {
      setIsChatLoading(false);
      setShowPrompts(true);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(chatInput);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="mt-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Trò chuyện sâu hơn với Chuyên gia AI
        </h3>
        
        <div ref={chatContainerRef} className="h-96 overflow-y-auto pr-2 space-y-4 mb-4 rounded-md bg-white dark:bg-slate-800/50 p-4 border dark:border-slate-700/50">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">AI</div>
               )}
              <div className={`prose prose-slate dark:prose-invert max-w-prose p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                {msg.role === 'model' ? renderMarkdown(msg.content) : <p>{msg.content}</p>}
              </div>
            </div>
          ))}
          {isChatLoading && chatHistory[chatHistory.length - 1]?.role === 'user' && (
            <div className="flex items-end gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">AI</div>
                <div className="max-w-prose p-3 rounded-lg bg-slate-200 dark:bg-slate-700 rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
          )}
        </div>
        
        {!isChatLoading && showPrompts && suggestedPrompts.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2 justify-start animate-fade-in">
              {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="px-3 py-1.5 bg-white/80 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-full text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                      {prompt}
                  </button>
              ))}
          </div>
        )}

        {chatError && !isChatLoading && (
            <p className="text-center text-sm text-red-500 mb-2">{chatError}</p>
        )}

        <form onSubmit={handleChatSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={isPdfMode ? "Trò chuyện bị vô hiệu hóa khi tạo PDF" : (isChatLoading ? "Chuyên gia AI đang trả lời..." : "Đặt câu hỏi của bạn ở đây...")}
            className="flex-1 px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            disabled={isChatLoading || !chat || isPdfMode}
            aria-label="Chat input"
          />
          <button type="submit" disabled={isChatLoading || !chatInput.trim() || !chat || isPdfMode} className="w-12 h-12 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:scale-100 disabled:cursor-not-allowed" aria-label="Send message">
            {isChatLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </form>
        {isPdfMode && <p className="text-xs text-center mt-2 text-slate-500">Lưu ý: Thanh trò chuyện được mô phỏng trong PDF và không thể tương tác.</p>}
      </div>
    </div>
  );
};

export default Chatbot;
