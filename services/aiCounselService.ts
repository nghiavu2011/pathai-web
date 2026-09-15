/**
 * PathAI AI Counseling Client Service
 * Communicates with the secure server-side proxy at /api/counsel without exposing API keys.
 * Includes graceful offline fallback generation for goals, counseling, and news topics.
 */

export interface GoalSuggestionRequest {
  quizId: string;
  quizTitle: string;
  results: any;
  gradeLevel?: string;
}

export interface ChatCounselRequest {
  messages: Array<{ role: 'user' | 'model'; content: string }>;
  systemInstruction?: string;
}

export interface NewsSummaryRequest {
  query: string;
}

export class AICounselService {
  private static async postProxy<T>(action: string, payload: any): Promise<T | null> {
    try {
      const response = await fetch('/api/counsel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload })
      });

      if (!response.ok) {
        console.warn(`AI Proxy responded with status ${response.status}`);
        return null;
      }

      const json = await response.json();
      return json.data as T;
    } catch (err) {
      console.warn('AI Proxy request failed (network or offline mode):', err);
      return null;
    }
  }

  /**
   * Fetch suggested SMART action goals with fallback
   */
  public static async getGoalSuggestions(req: GoalSuggestionRequest): Promise<string[]> {
    const proxyResult = await this.postProxy<string[]>('goals', {
      quizTitle: req.quizTitle,
      results: req.results,
      grade: req.gradeLevel
    });

    if (Array.isArray(proxyResult) && proxyResult.length > 0) {
      return proxyResult;
    }

    // High-quality fallback goals curated for Grade 9-12 Vietnamese students
    return [
      `Tìm hiểu 3 ngành học đại học liên quan đến kết quả ${req.quizTitle} và điểm chuẩn năm gần nhất.`,
      `Tham vấn ý kiến của giáo viên bộ môn hoặc chuyên gia đang làm việc trong lĩnh vực liên quan.`,
      `Lập kế hoạch chọn tổ hợp môn học lớp 10 hoặc cải thiện 1 kỹ năng cốt lõi trong tháng này.`
    ];
  }

  /**
   * Send a message to the AI Counselor
   */
  public static async sendChatMessage(req: ChatCounselRequest): Promise<string> {
    const proxyResult = await this.postProxy<{ role: string; content: string }>('chat', {
      messages: req.messages,
      systemInstruction: req.systemInstruction
    });

    if (proxyResult?.content) {
      return proxyResult.content;
    }

    // Empathetic offline fallback message
    return `Cảm ơn bạn đã chia sẻ. Mỗi bước đi trong quá trình thấu hiểu bản thân đều mang lại giá trị lớn. Hãy tiếp tục khám phá các thế mạnh tự nhiên và thảo luận cùng thầy cô hoặc chuyên viên hướng nghiệp nhé!`;
  }

  /**
   * Fetch topic overview / educational trends
   */
  public static async getTopicOverview(req: NewsSummaryRequest): Promise<{ content: string; sources: any[] }> {
    const proxyResult = await this.postProxy<{ content: string; sources: any[] }>('news', {
      query: req.query
    });

    if (proxyResult?.content) {
      return proxyResult;
    }

    return {
      content: `Chủ đề **"${req.query}"** đang là một trong những hướng đi được nhiều học sinh và chuyên gia quan tâm trong bối cảnh thị trường lao động hiện đại.\n\nViệc chủ động trau dồi các kỹ năng tư duy phản biện, khả năng tự học và ngoại ngữ sẽ giúp bạn tạo dựng nền tảng vững chắc cho bất kỳ ngành nghề nào trong tương lai.`,
      sources: []
    };
  }
}
