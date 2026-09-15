import { GoogleGenAI } from '@google/genai';

export interface VercelRequest {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
}

export interface VercelResponse {
  setHeader(name: string, value: string): this;
  status(statusCode: number): this;
  json(body: any): void;
  end(): void;
}

interface CounselRequestBody {
  action: 'goals' | 'chat' | 'news' | 'synthesis';
  payload: {
    quizId?: string;
    quizTitle?: string;
    results?: any;
    grade?: string;
    messages?: Array<{ role: 'user' | 'model'; content: string }>;
    systemInstruction?: string;
    query?: string;
    topic?: string;
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers for secure consumption
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'AI service currently unavailable. Server API key not configured.',
      fallbackAvailable: true
    });
  }

  try {
    const { action, payload } = (req.body || {}) as CounselRequestBody;
    const ai = new GoogleGenAI({ apiKey });

    switch (action) {
      case 'goals': {
        const { quizTitle, results } = payload;
        const prompt = `Dựa trên kết quả trắc nghiệm "${quizTitle || 'Định hướng'}" này: ${JSON.stringify(results, null, 2)}, hãy đề xuất 3 mục tiêu hành động cụ thể, ngắn gọn (mỗi mục tiêu dưới 150 ký tự) cho học sinh THPT (lớp 9-12) để khám phá sự nghiệp. Trả về một mảng JSON các chuỗi tiếng Việt. Ví dụ: ["Nghiên cứu 3 ngành học liên quan đến kết quả.", "Trò chuyện với 1 người đang làm trong lĩnh vực nổi bật.", "Tham gia một workshop online về kỹ năng X."]. Chỉ trả về mảng JSON.`;

        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: prompt,
        });

        const text = response.text ? response.text.trim() : '';
        const jsonString = text.startsWith('```json') ? text.substring(7, text.length - 3).trim() : text.replace(/^```|```$/g, '').trim();
        const parsed = JSON.parse(jsonString);
        return res.status(200).json({ success: true, data: parsed });
      }

      case 'chat': {
        const { messages = [], systemInstruction = '' } = payload;
        const lastUserMessage = messages[messages.length - 1]?.content || 'Xin chào';
        
        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: `${systemInstruction}\n\nTin nhắn học sinh: ${lastUserMessage}`,
        });

        return res.status(200).json({
          success: true,
          data: {
            role: 'model',
            content: response.text || 'PathAI luôn sẵn sàng lắng nghe và đồng hành cùng bạn trên chặng đường này.'
          }
        });
      }

      case 'news': {
        const { query = '' } = payload;
        const prompt = `Hãy tóm tắt ngắn gọn (khoảng 3 đoạn văn súc tích) các kiến thức, xu hướng học tập và kỹ năng nổi bật liên quan đến chủ đề sau: "${query}". Tập trung vào góc nhìn định hướng phát triển bản thân cho học sinh THPT Việt Nam. Trả lời bằng tiếng Việt chuẩn mực, tích cực và truyền cảm hứng.`;

        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: prompt,
        });

        return res.status(200).json({
          success: true,
          data: {
            content: response.text || '',
            sources: []
          }
        });
      }

      default:
        return res.status(400).json({ error: `Unsupported action: ${action}` });
    }
  } catch (error: any) {
    console.error('AI Proxy Error:', error);
    return res.status(500).json({
      error: 'AI request processing failed.',
      message: error?.message || 'Internal Server Error'
    });
  }
}
