import { describe, it, expect, beforeEach } from 'vitest';
import { TelemetryService, AnonymousDemographics, MicroFeedbackEntry } from '../services/telemetryService';

const createStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    key: (index: number) => Object.keys(store)[index] || null,
    get length() { return Object.keys(store).length; }
  };
};

describe('PATHAI TelemetryService & Zero PII Analytics Suite', () => {
  beforeEach(() => {
    // @ts-ignore
    global.localStorage = createStorageMock();
    // @ts-ignore
    global.sessionStorage = createStorageMock();
  });

  it('generates an anonymous session ID without PII', () => {
    const sessionId = TelemetryService.getSessionId();
    expect(sessionId).toBeDefined();
    expect(sessionId.startsWith('ses-')).toBe(true);
    // Should persist across calls
    expect(TelemetryService.getSessionId()).toBe(sessionId);
  });

  it('tracks anonymous events and limits log size', () => {
    TelemetryService.trackEvent('page_view', { path: '/home' });
    TelemetryService.trackEvent('quiz_start', { quizId: 'holland' });
    TelemetryService.trackEvent('quiz_complete', { quizId: 'holland' });

    const rawLogs = localStorage.getItem('pathai:v2:telemetry:events');
    expect(rawLogs).toBeDefined();
    const events = JSON.parse(rawLogs!);
    expect(events.length).toBe(3);
    expect(events[0].name).toBe('page_view');
    expect(events[1].name).toBe('quiz_start');
    expect(events[2].name).toBe('quiz_complete');
    expect(events[0].properties.sessionId).toBeDefined();
  });

  it('saves and retrieves voluntary anonymous demographics', () => {
    expect(TelemetryService.hasDemographics()).toBe(false);
    expect(TelemetryService.isPrompted()).toBe(false);

    const demo: Omit<AnonymousDemographics, 'updatedAt'> = {
      gradeGroup: 'grade_9',
      province: 'Hà Nội',
      gender: 'female'
    };

    TelemetryService.saveDemographics(demo);

    expect(TelemetryService.hasDemographics()).toBe(true);
    expect(TelemetryService.isPrompted()).toBe(true);
    const retrieved = TelemetryService.getDemographics();
    expect(retrieved?.gradeGroup).toBe('grade_9');
    expect(retrieved?.province).toBe('Hà Nội');
    expect(retrieved?.gender).toBe('female');
  });

  it('handles user skipping demographic survey', () => {
    expect(TelemetryService.isPrompted()).toBe(false);
    TelemetryService.setPrompted();
    expect(TelemetryService.isPrompted()).toBe(true);
    expect(TelemetryService.hasDemographics()).toBe(false);
  });

  it('collects micro-feedback and calculates satisfaction correctly', () => {
    const fb1: Omit<MicroFeedbackEntry, 'timestamp'> = {
      rating: 'very_helpful',
      comment: 'Rất bổ ích và dễ hiểu',
      context: 'decision_dashboard'
    };
    const fb2: Omit<MicroFeedbackEntry, 'timestamp'> = {
      rating: 'somewhat_helpful',
      comment: 'Hay',
      context: 'quiz_result'
    };
    const fb3: Omit<MicroFeedbackEntry, 'timestamp'> = {
      rating: 'needs_work',
      comment: 'Hơi dài',
      context: 'general'
    };

    TelemetryService.saveMicroFeedback(fb1);
    TelemetryService.saveMicroFeedback(fb2);
    TelemetryService.saveMicroFeedback(fb3);

    const feedbackList = TelemetryService.getFeedbackList();
    expect(feedbackList.length).toBe(3);

    const insights = TelemetryService.getAggregatedInsights();
    expect(insights.satisfaction.total).toBe(3);
    expect(insights.satisfaction.veryHelpful).toBe(1);
    expect(insights.satisfaction.somewhatHelpful).toBe(1);
    expect(insights.satisfaction.needsWork).toBe(1);
    expect(insights.satisfaction.scorePercent).toBeGreaterThan(0);
  });

  it('computes aggregated insights and quiz completion rate accurately', () => {
    TelemetryService.trackEvent('quiz_start', { quizId: 'holland' });
    TelemetryService.trackEvent('quiz_start', { quizId: 'grit' });
    TelemetryService.trackEvent('quiz_complete', { quizId: 'holland' });
    TelemetryService.trackEvent('export_pdf', { quizId: 'holland' });
    TelemetryService.trackEvent('dashboard_step_view', { step: '1' });

    TelemetryService.saveDemographics({
      gradeGroup: 'grade_10',
      province: 'Đà Nẵng',
      gender: 'male'
    });

    const insights = TelemetryService.getAggregatedInsights();
    expect(insights.quizStarts).toBe(2);
    expect(insights.quizCompletions).toBe(1);
    expect(insights.completionRate).toBe(50);
    expect(insights.pdfExports).toBe(1);
    expect(insights.featureUsage['dashboard_1']).toBe(1);

    expect(insights.demographics.gradeBreakdown['grade_10']).toBe(1);
    expect(insights.demographics.topProvinces['Đà Nẵng']).toBe(1);
    expect(insights.demographics.genderBreakdown['male']).toBe(1);
  });

  it('strictly contains Zero PII in all stored records', () => {
    TelemetryService.trackEvent('page_view', { path: '/trust' });
    TelemetryService.saveDemographics({
      gradeGroup: 'grade_12',
      province: 'TP. Hồ Chí Minh',
      gender: 'male'
    });
    TelemetryService.saveMicroFeedback({
      rating: 'very_helpful',
      comment: 'Tuyệt vời',
      context: 'general'
    });

    // Check all storage values
    const rawEvents = localStorage.getItem('pathai:v2:telemetry:events') || '';
    const rawDemo = localStorage.getItem('pathai:v2:telemetry:demographics') || '';
    const rawFeedback = localStorage.getItem('pathai:v2:telemetry:feedback') || '';

    const forbiddenTerms = ['fullName', 'email', 'phoneNumber', 'ipAddress', 'gps', 'latitude', 'longitude'];
    for (const term of forbiddenTerms) {
      expect(rawEvents.toLowerCase().includes(term.toLowerCase())).toBe(false);
      expect(rawDemo.toLowerCase().includes(term.toLowerCase())).toBe(false);
      expect(rawFeedback.toLowerCase().includes(term.toLowerCase())).toBe(false);
    }
  });
});
