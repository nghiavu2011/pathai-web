import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import LoadingSpinner from '../LoadingSpinner';
import { renderMarkdown } from '../../utils/renderMarkdown';

interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

interface NewsAndArticlesProps {
  searchQuery: string;
  title: string;
}

const NewsAndArticles: React.FC<NewsAndArticlesProps> = ({ searchQuery, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      if (!searchQuery) return;
      setIsLoading(true);
      setError(null);
      setContent(null);
      setSources([]);

      try {
        if (!process.env.API_KEY) {
          throw new Error("API key not configured.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const prompt = `Sử dụng Google Search, hãy tóm tắt ngắn gọn (khoảng 3-4 đoạn văn) các tin tức, bài viết và xu hướng mới nhất liên quan đến chủ đề sau: "${searchQuery}". Tập trung vào lời khuyên nghề nghiệp, cơ hội học hỏi và các kỹ năng đang nổi bật. Trả lời bằng tiếng Việt.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          },
        });

        setContent(response.text);

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks && Array.isArray(groundingChunks)) {
          const webSources = groundingChunks.filter(chunk => chunk.web && chunk.web.uri && chunk.web.title);
          setSources(webSources);
        }

      } catch (err) {
        console.error("Error fetching news and articles:", err);
        setError("Không thể tải tin tức và bài viết. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="mt-12">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">{title}</h3>
          <div className="text-center py-8">
            <LoadingSpinner />
            <p className="mt-2 text-sm text-slate-500">Đang tìm kiếm tin tức mới nhất...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <div className="mt-12">
            <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border border-red-200 dark:border-red-700/50">
                <h3 className="text-2xl font-bold mb-4 text-red-800 dark:text-red-200">{title}</h3>
                <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
        </div>
    );
  }

  if (!content && sources.length === 0) {
    return null; // Don't render anything if there's no content
  }

  return (
    <div className="mt-12 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6M7 8h6" />
            </svg>
            {title}
        </h3>
        {content && (
            <div className="prose prose-slate dark:prose-invert max-w-none mb-6 text-sm">
                {renderMarkdown(content)}
            </div>
        )}
        {sources.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-600 dark:text-slate-300 mb-3">Nguồn tham khảo:</h4>
            <ul className="space-y-2">
              {sources.map((source, index) => source.web && (
                <li key={index}>
                  <a
                    href={source.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0 text-slate-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span>{source.web.title || source.web.uri}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsAndArticles;
