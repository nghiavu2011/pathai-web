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

// Centralized active Gemini models
export const AI_MODEL_COUNSELOR = 'gemini-2.5-flash';
export const AI_MODEL_SUMMARY = 'gemini-2.5-flash';

export type AllowedAction = 'goals' | 'chat' | 'news';

interface CounselRequestBody {
  action: AllowedAction;
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

export const CRISIS_PATTERNS = [
  /tự tử/i, /tự sát/i, /muốn chết/i, /chết đi/i, /tự hại/i, /rạch tay/i,
  /không muốn sống/i, /bị bạo hành/i, /bị đánh đập/i, /xâm hại/i,
  /suicide/i, /kill myself/i, /self harm/i, /end my life/i
];

export const CRISIS_RESPONSE = `Mình cảm nhận bạn đang phải trải qua những cảm xúc rất khó khăn hoặc áp lực nặng nề. Sự an toàn và sức khỏe tinh thần của bạn là điều quan trọng nhất ngay lúc này.

PathAI là công cụ tham vấn học tập và hướng nghiệp, không có chức năng y tế hay can thiệp tâm lý lâm sàng. Xin bạn hãy tạm gác lại các câu hỏi hướng nghiệp và chia sẻ ngay với người lớn mà bạn tin tưởng (cha mẹ, thầy cô, chuyên viên tư vấn học đường) hoặc liên hệ các kênh hỗ trợ khẩn cấp miễn phí:

- 🛡️ **Tổng đài Quốc gia Bảo vệ Trẻ em**: **111** (Hỗ trợ 24/7, miễn phí cước gọi)
- 💚 **Đường dây nóng Hỗ trợ Tâm lý & Khủng hoảng Ngày Mai**: **096 306 1414** (13:00 - 20:30 hàng ngày)
- 🚑 **Cấp cứu Y tế**: **115**

Bạn không phải đối mặt với khó khăn này một mình. Hãy tìm kiếm sự trợ giúp từ những người xung quanh nhé!`;

export function isCrisisMessage(text: string): boolean {
  if (!text) return false;
  return CRISIS_PATTERNS.some(p => p.test(text));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers for secure consumption
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
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

    if (!['goals', 'chat', 'news'].includes(action)) {
      return res.status(400).json({ error: `Invalid action: ${action}. Allowed: goals, chat, news.` });
    }

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Payload must be a valid JSON object.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    switch (action) {
      case 'goals': {
        const { quizTitle, results } = payload;
        const prompt = `Bạn là Trợ lý AI Tham vấn Học tập & Hướng nghiệp PathAI dành cho học sinh THCS và THPT Việt Nam (Lớp 9–12).
Dựa trên kết quả trắc nghiệm "${quizTitle || 'Định hướng'}" này: ${JSON.stringify(results || {}, null, 2)}, hãy đề xuất 3 mục tiêu hành động cụ thể, ngắn gọn (mỗi mục tiêu dưới 150 ký tự) để học sinh tự khám phá và kiểm chứng sở thích.
Nguyên tắc:
- Không áp đặt nghề nghiệp mang tính số mệnh hay khẳng định chắc chắn 100%.
- Khuyến khích hành động thực nghiệm, học hỏi kỹ năng và trao đổi cùng gia đình/thầy cô.
- Trả về một mảng JSON các chuỗi tiếng Việt hợp lệ. Ví dụ: ["Tìm hiểu 3 ngành học liên quan đến kết quả.", "Trao đổi cùng giáo viên bộ môn về môn học yêu thích.", "Thực hiện một dự án nhỏ để trải nghiệm kỹ năng X."]. Chỉ trả về mảng JSON.`;

        const response = await ai.models.generateContent({
          model: AI_MODEL_COUNSELOR,
          contents: prompt,
        });

        const text = response.text ? response.text.trim() : '';
        const jsonString = text.startsWith('```json') ? text.substring(7, text.length - 3).trim() : text.replace(/^```|```$/g, '').trim();
        const parsed = JSON.parse(jsonString);
        return res.status(200).json({ success: true, data: parsed });
      }

      case 'chat': {
        const { messages = [], systemInstruction = '' } = payload;
        if (messages.length > 20) {
          return res.status(400).json({ error: 'Conversation history exceeds limit (20 turns).' });
        }

        const lastUserMessage = messages[messages.length - 1]?.content || 'Xin chào';
        if (lastUserMessage.length > 2000) {
          return res.status(400).json({ error: 'Message exceeds maximum length (2000 chars).' });
        }

        // Child Safety & Crisis Interceptor
        if (isCrisisMessage(lastUserMessage)) {
          return res.status(200).json({
            success: true,
            data: {
              role: 'model',
              content: CRISIS_RESPONSE,
              isCrisisSafeguard: true
            }
          });
        }

        const baseSafetyInstruction = `Bạn là Trợ lý AI Tham vấn Học tập & Hướng nghiệp PathAI dành cho học sinh THCS và THPT Việt Nam (Lớp 9–12).
Quy tắc bắt buộc:
1. Đóng vai trò người đồng hành gợi mở (Facilitator), tôn trọng quyền tự chủ của học sinh và góc nhìn của phụ huynh.
2. Tuyệt đối không đóng vai bác sĩ tâm lý, bác sĩ tâm thần hoặc đưa ra chẩn đoán y khoa.
3. Không đưa ra phán quyết nghề nghiệp định mệnh, không dùng ngôn từ 'chắc chắn 100%', 'sinh ra để làm nghề X'.
4. Trình bày các hướng đi dưới dạng giả thuyết cần kiểm chứng qua thực tế học tập và trải nghiệm.
5. Giọng văn: Tôn trọng, ấm áp, thấu cảm, giàu tính sư phạm và chuẩn mực tiếng Việt.`;

        const finalPrompt = `${baseSafetyInstruction}\n\n${systemInstruction}\n\nTin nhắn của học sinh: ${lastUserMessage}`;

        const response = await ai.models.generateContent({
          model: AI_MODEL_COUNSELOR,
          contents: finalPrompt,
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
        const cleanQuery = query.slice(0, 300);
        const prompt = `Hãy tóm tắt ngắn gọn (khoảng 3 đoạn văn súc tích) các kiến thức, xu hướng học tập và kỹ năng nổi bật liên quan đến chủ đề sau: "${cleanQuery}". Tập trung vào góc nhìn định hướng phát triển bản thân cho học sinh THPT Việt Nam. Trả lời bằng tiếng Việt chuẩn mực, tích cực và truyền cảm hứng.`;

        const response = await ai.models.generateContent({
          model: AI_MODEL_SUMMARY,
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
