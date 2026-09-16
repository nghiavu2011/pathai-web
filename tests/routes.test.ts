import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

// Route parser replica test ensuring exact path routing contract
type View = 'home' | 'quiz' | 'results' | 'history' | 'goals' | 'decision-dashboard' | 'trust' | 'login' | 'not-found';
type TrustTab = 'methodology' | 'ai-safety' | 'privacy' | 'terms' | 'data-sources';

const parsePath = (pathname: string): { view: View; trustTab?: TrustTab; quizId?: string } => {
  const cleanPath = pathname.toLowerCase().replace(/\/$/, '') || '/';
  
  if (cleanPath === '/' || cleanPath === '') {
    return { view: 'home' };
  }
  if (cleanPath === '/methodology') {
    return { view: 'trust', trustTab: 'methodology' };
  }
  if (cleanPath === '/ai-safety' || cleanPath === '/safety') {
    return { view: 'trust', trustTab: 'ai-safety' };
  }
  if (cleanPath === '/privacy') {
    return { view: 'trust', trustTab: 'privacy' };
  }
  if (cleanPath === '/terms') {
    return { view: 'trust', trustTab: 'terms' };
  }
  if (cleanPath === '/data-sources' || cleanPath === '/sources') {
    return { view: 'trust', trustTab: 'data-sources' };
  }
  if (cleanPath === '/history') {
    return { view: 'history' };
  }
  if (cleanPath === '/goals') {
    return { view: 'goals' };
  }
  if (cleanPath === '/decision-dashboard' || cleanPath === '/dashboard') {
    return { view: 'decision-dashboard' };
  }
  if (cleanPath === '/login' || cleanPath === '/profile') {
    return { view: 'login' };
  }
  if (cleanPath.startsWith('/quiz')) {
    const parts = cleanPath.split('/');
    const qId = parts[2];
    return { view: 'quiz', quizId: qId || 'holland' };
  }
  
  return { view: 'not-found' };
};

describe('PATHAI URL Routing, Trust Routes & Crawlability Suite', () => {
  describe('1. Direct URL Path Routing Contract', () => {
    it('correctly maps root URL to home view', () => {
      expect(parsePath('/')).toEqual({ view: 'home' });
      expect(parsePath('')).toEqual({ view: 'home' });
    });

    it('correctly maps /methodology to trust view with methodology tab', () => {
      expect(parsePath('/methodology')).toEqual({ view: 'trust', trustTab: 'methodology' });
      expect(parsePath('/methodology/')).toEqual({ view: 'trust', trustTab: 'methodology' });
    });

    it('correctly maps /ai-safety to trust view with ai-safety tab', () => {
      expect(parsePath('/ai-safety')).toEqual({ view: 'trust', trustTab: 'ai-safety' });
      expect(parsePath('/safety')).toEqual({ view: 'trust', trustTab: 'ai-safety' });
    });

    it('correctly maps /privacy to trust view with privacy tab', () => {
      expect(parsePath('/privacy')).toEqual({ view: 'trust', trustTab: 'privacy' });
    });

    it('correctly maps /terms to trust view with terms tab', () => {
      expect(parsePath('/terms')).toEqual({ view: 'trust', trustTab: 'terms' });
    });

    it('correctly maps /data-sources to trust view with data-sources tab', () => {
      expect(parsePath('/data-sources')).toEqual({ view: 'trust', trustTab: 'data-sources' });
      expect(parsePath('/sources')).toEqual({ view: 'trust', trustTab: 'data-sources' });
    });

    it('correctly maps dashboard, history and goals routes', () => {
      expect(parsePath('/decision-dashboard')).toEqual({ view: 'decision-dashboard' });
      expect(parsePath('/dashboard')).toEqual({ view: 'decision-dashboard' });
      expect(parsePath('/history')).toEqual({ view: 'history' });
      expect(parsePath('/goals')).toEqual({ view: 'goals' });
    });

    it('correctly maps quiz routes with quizId parameter', () => {
      expect(parsePath('/quiz/holland')).toEqual({ view: 'quiz', quizId: 'holland' });
      expect(parsePath('/quiz/mi')).toEqual({ view: 'quiz', quizId: 'mi' });
    });

    it('correctly maps unrecognized paths to not-found 404 view', () => {
      expect(parsePath('/non-existent-page-123')).toEqual({ view: 'not-found' });
      expect(parsePath('/admin/secret')).toEqual({ view: 'not-found' });
    });
  });

  describe('2. SEO Assets Integrity (robots.txt & sitemap.xml)', () => {
    it('verifies public/robots.txt exists and contains sitemap directive', () => {
      const robotsPath = path.resolve(__dirname, '../public/robots.txt');
      expect(fs.existsSync(robotsPath)).toBe(true);
      const content = fs.readFileSync(robotsPath, 'utf-8');
      expect(content).toContain('User-agent: *');
      expect(content).toContain('Allow: /');
      expect(content).toContain('sitemap.xml');
    });

    it('verifies public/sitemap.xml contains all production trust routes', () => {
      const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
      expect(fs.existsSync(sitemapPath)).toBe(true);
      const content = fs.readFileSync(sitemapPath, 'utf-8');
      expect(content).toContain('https://pathai-web-intro.vercel.app/');
      expect(content).toContain('/methodology');
      expect(content).toContain('/ai-safety');
      expect(content).toContain('/privacy');
      expect(content).toContain('/terms');
      expect(content).toContain('/data-sources');
    });
  });
});
