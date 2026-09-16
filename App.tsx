import React, { useState, useEffect, useMemo, Suspense } from 'react';
import {
  Answers,
  UserData,
  QuizHistoryEntry,
  Goal,
  CategoryKey,
  CDBBarrierKey,
  CDBResults,
  GritGroupKey,
  GritResults,
  MICategoryKey,
  MIResults,
  CRSCategoryKey,
  CRSResults,
  GrowthMindsetCategoryKey,
  GrowthMindsetResults,
  CareerAnchorResults,
  WorkValuesResults,
  Results as HollandResults,
  ContextCategoryKey,
  ContextResults,
  WheelCategoryKey,
  WheelResults,
  BigFiveCategoryKey,
  BigFiveResults,
  EQCategoryKey,
  EQResults
} from './types';
import { StorageService } from './services/storageService';

// Constants
import { QUIZ_DATA as HOLLAND_QUIZ_DATA, STEPS as HOLLAND_STEPS, HOLLAND_INTRODUCTION, RATING_OPTIONS, RATING_LABELS } from './constants';
import { CDB_QUIZ_DATA, CDB_STEPS, CDB_INTRODUCTION, CDB_RATING_OPTIONS, CDB_RATING_LABELS } from './constants/careerDifficulties';
import { GRIT_QUIZ_DATA, GRIT_STEPS, GRIT_INTRODUCTION, GRIT_RATING_OPTIONS, GRIT_RATING_LABELS } from './constants/gritScale';
import { MI_QUIZ_DATA, MI_STEPS, MI_INTRODUCTION, MI_RATING_OPTIONS, MI_RATING_LABELS } from './constants/multipleIntelligences';
import { CRS_QUIZ_DATA, CRS_STEPS, CRS_INTRODUCTION, CRS_RATING_OPTIONS, CRS_RATING_LABELS } from './constants/developmentScale';
import { GMS_QUIZ_DATA, GMS_STEPS, GMS_INTRODUCTION, GMS_RATING_OPTIONS, GMS_RATING_LABELS } from './constants/growthMindset';
import { CAREER_ANCHORS_QUIZ_DATA, CAREER_ANCHORS_STEPS, CAREER_ANCHORS_INTRODUCTION, CAREER_ANCHORS_RATING_OPTIONS, CAREER_ANCHORS_RATING_LABELS } from './constants/careerAnchors';
import { WORK_VALUES_QUIZ_DATA, WORK_VALUES_STEPS, WORK_VALUES_INTRODUCTION, WORK_VALUES_RATING_OPTIONS, WORK_VALUES_RATING_LABELS } from './constants/workValues';
import { CONTEXT_QUIZ_DATA, CONTEXT_STEPS, CONTEXT_INTRODUCTION, CONTEXT_RATING_OPTIONS, CONTEXT_RATING_LABELS } from './constants/developmentalContext';
import { WHEEL_QUIZ_DATA, WHEEL_STEPS, WHEEL_INTRODUCTION, WHEEL_RATING_OPTIONS, WHEEL_RATING_LABELS } from './constants/wheelOfLife';
import { BIG5_QUIZ_DATA, BIG5_STEPS, BIG5_INTRODUCTION, BIG5_RATING_OPTIONS, BIG5_RATING_LABELS } from './constants/bigFive';
import { EQ_QUIZ_DATA, EQ_STEPS, EQ_INTRODUCTION, EQ_RATING_OPTIONS, EQ_RATING_LABELS } from './constants/eq';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoadingSpinner from './components/LoadingSpinner';
import QuizIntroduction from './components/shared/QuizIntroduction';
import QuizStep from './components/shared/QuizStep';
import Login from './components/Login';
import HistoryPage from './components/HistoryPage';
import GoalsPage from './components/goals/GoalsPage';
import DonateModal from './components/DonateModal';
import FeedbackButton from './components/FeedbackButton';
import FeedbackModal from './components/FeedbackModal';
import GuideModal from './components/shared/GuideModal';
import QuizInfoModal from './components/shared/QuizInfoModal';
import FloatingShare from './components/shared/FloatingShare';
import PrivacyConsent from './components/PrivacyConsent';
import Grade9DecisionDashboard from './components/dashboard/Grade9DecisionDashboard';

import TrustPageView, { TrustTab } from './components/TrustPageView';
import NotFoundView from './components/NotFoundView';

const HollandResultsDisplay = React.lazy(() => import('./components/holland/HollandResultsDisplay'));
const MIResultsDisplay = React.lazy(() => import('./components/multiple-intelligences/MIResultsDisplay'));
const GritResultsDisplay = React.lazy(() => import('./components/grit-scale/GritResultsDisplay'));
const CDIResultsDisplay = React.lazy(() => import('./components/career-difficulties/CDIResultsDisplay'));
const CareerAnchorsResultsDisplay = React.lazy(() => import('./components/career-anchors/CareerAnchorsResultsDisplay'));
const WorkValuesResultsDisplay = React.lazy(() => import('./components/work-values/WorkValuesResultsDisplay'));
const CRSResultsDisplay = React.lazy(() => import('./components/development-scale/CDEDResultsDisplay'));
const GMSResultsDisplay = React.lazy(() => import('./components/growth-mindset/GMSResultsDisplay'));
const ContextResultsDisplay = React.lazy(() => import('./components/developmental-context/ContextResultsDisplay'));
const WheelOfLifeResultsDisplay = React.lazy(() => import('./components/wheel-of-life/WheelOfLifeResultsDisplay'));
const BigFiveResultsDisplay = React.lazy(() => import('./components/big-five/BigFiveResultsDisplay'));
const EQResultsDisplay = React.lazy(() => import('./components/eq/EQResultsDisplay'));

type View = 'home' | 'quiz' | 'results' | 'history' | 'goals' | 'decision-dashboard' | 'trust' | 'login' | 'not-found';

interface QuizState {
  currentStep: number;
  answers: Answers;
}

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

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('pathai:v2:theme') || 'light');
  const [currentView, setCurrentView] = useState<View>('home');
  const [trustTab, setTrustTab] = useState<TrustTab>('methodology');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({ currentStep: 0, answers: {} });
  const [results, setResults] = useState<any | null>(null);
  const [historySnapshotUser, setHistorySnapshotUser] = useState<UserData | null>(null);

  const [history, setHistory] = useState<QuizHistoryEntry[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  // HTML5 History & URL routing synchronization
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    const route = parsePath(path);
    setCurrentView(route.view);
    if (route.trustTab) {
      setTrustTab(route.trustTab);
    }
    if (route.quizId) {
      setSelectedQuizId(route.quizId);
      setQuizState({ currentStep: 0, answers: {} });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const route = parsePath(window.location.pathname);
      setCurrentView(route.view);
      if (route.trustTab) {
        setTrustTab(route.trustTab);
      }
      if (route.quizId) {
        setSelectedQuizId(route.quizId);
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO metadata for non-trust views
  useEffect(() => {
    if (currentView === 'home') {
      document.title = 'PathAI | Hướng nghiệp cho học sinh lớp 9–12';
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (canonicalLink) canonicalLink.setAttribute('href', 'https://pathai-web-intro.vercel.app/');
      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDesc) metaDesc.setAttribute('content', 'PathAI giúp học sinh lớp 9–12 hiểu sở thích nghề nghiệp, khám phá các hướng học tập và nghề nghiệp, kiểm chứng lựa chọn và trao đổi cùng gia đình trước khi quyết định tương lai.');
    } else if (currentView === 'decision-dashboard') {
      document.title = 'Bản đồ Định hướng Lớp 9–12 | PathAI';
    } else if (currentView === 'history') {
      document.title = 'Lịch sử Trắc nghiệm | PathAI';
    } else if (currentView === 'goals') {
      document.title = 'Mục tiêu Nghề nghiệp | PathAI';
    } else if (currentView === 'not-found') {
      document.title = '404 - Không Tìm Thấy Trang | PathAI';
    }
  }, [currentView]);

  // Load User Data with total namespace isolation
  useEffect(() => {
    try {
      const user = StorageService.initMigration();
      if (user) {
        setUserData(user);
        const userHistory = StorageService.getHistory(user.uid || '');
        const userGoals = StorageService.getGoals(user.uid || '');
        setHistory(userHistory);
        setGoals(userGoals);
      }
    } catch (e) {
      console.error("Error loading user storage", e);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  const [isDonateModalOpen, setDonateModalOpen] = useState(false);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [isGuideModalOpen, setGuideModalOpen] = useState(false);
  const [isQuizInfoModalOpen, setQuizInfoModalOpen] = useState(false);
  const [infoQuizId, setInfoQuizId] = useState<string | null>(null);

  const QUIZ_CONFIGS = useMemo(() => ({
    holland: {
      title: 'Trắc nghiệm Sở thích Holland (RIASEC)',
      steps: HOLLAND_STEPS,
      introduction: HOLLAND_INTRODUCTION,
      quizData: HOLLAND_QUIZ_DATA,
      ratingOptions: RATING_OPTIONS,
      ratingLabels: RATING_LABELS,
      ResultsDisplay: HollandResultsDisplay,
      calculateResults: (answers: Answers): HollandResults => {
        const res: HollandResults = { [CategoryKey.R]: 0, [CategoryKey.I]: 0, [CategoryKey.A]: 0, [CategoryKey.S]: 0, [CategoryKey.E]: 0, [CategoryKey.C]: 0 };
        for (const category of HOLLAND_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.category_code) {
              res[question.category_code] += answers[question.id];
            }
          }
        }
        return res;
      },
    },
    mi: {
      title: 'Trí thông minh Đa diện (MI)',
      steps: MI_STEPS,
      introduction: MI_INTRODUCTION,
      quizData: MI_QUIZ_DATA,
      ratingOptions: MI_RATING_OPTIONS,
      ratingLabels: MI_RATING_LABELS,
      ResultsDisplay: MIResultsDisplay,
      calculateResults: (answers: Answers): MIResults => {
        const res: MIResults = { [MICategoryKey.L]: 0, [MICategoryKey.LQ]: 0, [MICategoryKey.VS]: 0, [MICategoryKey.BK]: 0, [MICategoryKey.MU]: 0, [MICategoryKey.IN]: 0, [MICategoryKey.IG]: 0, [MICategoryKey.NT]: 0 };
        for (const category of MI_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.mi_code) {
              res[question.mi_code] += answers[question.id];
            }
          }
        }
        return res;
      },
    },
    grit: {
      title: 'Thang đo Bền chí (Grit Scale)',
      steps: GRIT_STEPS,
      introduction: GRIT_INTRODUCTION,
      quizData: GRIT_QUIZ_DATA,
      ratingOptions: GRIT_RATING_OPTIONS,
      ratingLabels: GRIT_RATING_LABELS,
      ResultsDisplay: GritResultsDisplay,
      calculateResults: (answers: Answers): GritResults => {
        const effortScores = GRIT_QUIZ_DATA.find(c => c.key === GritGroupKey.Effort)!.questions.map(q => answers[q.id] || 0);
        const interestScores = GRIT_QUIZ_DATA.find(c => c.key === GritGroupKey.Interest)!.questions.map(q => answers[q.id] || 0);
        const effort = effortScores.length > 0 ? effortScores.reduce((a, b) => a + b, 0) / effortScores.length : 0;
        const interest = interestScores.length > 0 ? interestScores.reduce((a, b) => a + b, 0) / interestScores.length : 0;
        const grit = (effort + interest) / 2;
        return { grit, effort, interest };
      },
    },
    cdb: {
      title: 'Các Rào cản Nghề nghiệp (CDB)',
      steps: CDB_STEPS,
      introduction: CDB_INTRODUCTION,
      quizData: CDB_QUIZ_DATA,
      ratingOptions: CDB_RATING_OPTIONS,
      ratingLabels: CDB_RATING_LABELS,
      ResultsDisplay: CDIResultsDisplay,
      calculateResults: (answers: Answers): CDBResults => {
        const res: CDBResults = { [CDBBarrierKey.A]: 0, [CDBBarrierKey.B]: 0, [CDBBarrierKey.C]: 0, [CDBBarrierKey.D]: 0, [CDBBarrierKey.E]: 0 };
        for (const category of CDB_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.cdb_code) {
              res[question.cdb_code] += answers[question.id];
            }
          }
        }
        return res;
      },
    },
    schein: {
      title: 'Mỏ neo Nghề nghiệp (Schein)',
      steps: CAREER_ANCHORS_STEPS,
      introduction: CAREER_ANCHORS_INTRODUCTION,
      quizData: CAREER_ANCHORS_QUIZ_DATA,
      ratingOptions: CAREER_ANCHORS_RATING_OPTIONS,
      ratingLabels: CAREER_ANCHORS_RATING_LABELS,
      ResultsDisplay: CareerAnchorsResultsDisplay,
      calculateResults: (answers: Answers): CareerAnchorResults => {
        const res: CareerAnchorResults = { TF: 0, GM: 0, AU: 0, SE: 0, EC: 0, SV: 0, PC: 0, LS: 0 };
        for (const category of CAREER_ANCHORS_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.anchor_code) {
              res[question.anchor_code] += answers[question.id];
            }
          }
        }
        return res;
      },
    },
    'work-values': {
      title: 'Giá trị Nghề nghiệp (Work Values)',
      steps: WORK_VALUES_STEPS,
      introduction: WORK_VALUES_INTRODUCTION,
      quizData: WORK_VALUES_QUIZ_DATA,
      ratingOptions: WORK_VALUES_RATING_OPTIONS,
      ratingLabels: WORK_VALUES_RATING_LABELS,
      ResultsDisplay: WorkValuesResultsDisplay,
      calculateResults: (answers: Answers): WorkValuesResults => {
        const res: WorkValuesResults = { ACH: 0, SEC: 0, AUT: 0, INF: 0, ALT: 0, AES: 0 };
        for (const category of WORK_VALUES_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.work_value_code) {
              res[question.work_value_code] += answers[question.id];
            }
          }
        }
        return res;
      },
    },
    crs: {
      title: 'Mức độ Sẵn sàng Nghề nghiệp (CRS)',
      steps: CRS_STEPS,
      introduction: CRS_INTRODUCTION,
      quizData: CRS_QUIZ_DATA,
      ratingOptions: CRS_RATING_OPTIONS,
      ratingLabels: CRS_RATING_LABELS,
      ResultsDisplay: CRSResultsDisplay,
      calculateResults: (answers: Answers): CRSResults => {
        const scores: Record<CRSCategoryKey, number> = { SU: 0, DM: 0, SS: 0, CP: 0, AD: 0 };
        for (const category of CRS_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.crs_code) {
              scores[question.crs_code] += answers[question.id];
            }
          }
        }
        const average = Object.values(scores).reduce((sum, score) => sum + (score / 5), 0) / Object.keys(scores).length;
        return { scores, average };
      },
    },
    gms: {
      title: 'Tư duy Phát triển (Growth Mindset)',
      steps: GMS_STEPS,
      introduction: GMS_INTRODUCTION,
      quizData: GMS_QUIZ_DATA,
      ratingOptions: GMS_RATING_OPTIONS,
      ratingLabels: GMS_RATING_LABELS,
      ResultsDisplay: GMSResultsDisplay,
      calculateResults: (answers: Answers): GrowthMindsetResults => {
        const scores: Record<GrowthMindsetCategoryKey, number> = { CH: 0, FB: 0, PL: 0, AD: 0 };
        for (const category of GMS_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.gms_code) {
              scores[question.gms_code] += answers[question.id];
            }
          }
        }
        const growth_mindset = Object.values(scores).reduce((sum, score) => sum + (score / 5), 0) / Object.keys(scores).length;
        return { scores, growth_mindset };
      },
    },
    context: {
      title: 'Hồ sơ Nền tảng (Context Profile)',
      steps: CONTEXT_STEPS,
      introduction: CONTEXT_INTRODUCTION,
      quizData: CONTEXT_QUIZ_DATA,
      ratingOptions: CONTEXT_RATING_OPTIONS,
      ratingLabels: CONTEXT_RATING_LABELS,
      ResultsDisplay: ContextResultsDisplay,
      calculateResults: (answers: Answers): ContextResults => {
        const scores: Record<ContextCategoryKey, number> = { [ContextCategoryKey.ATT]: 0, [ContextCategoryKey.AUT]: 0, [ContextCategoryKey.ENV]: 0, [ContextCategoryKey.HLT]: 0 };

        for (const category of CONTEXT_QUIZ_DATA) {
          let sum = 0;
          const questions = category.questions;
          for (const question of questions) {
            if (answers[question.id] && question.context_code) {
              sum += answers[question.id];
            }
          }
          if (questions.length > 0) {
            scores[category.key] = sum / questions.length;
          }
        }

        const attScore = scores[ContextCategoryKey.ATT];
        let attachmentStyle = 'Secure';
        if (attScore < 3) {
          attachmentStyle = 'Avoidant';
        } else if (attScore < 4) {
          attachmentStyle = 'Anxious';
        } else {
          attachmentStyle = 'Secure';
        }

        return { scores, attachmentStyle };
      },
    },
    wheel: {
      title: 'Bánh xe Cuộc đời (Wheel of Life)',
      steps: WHEEL_STEPS,
      introduction: WHEEL_INTRODUCTION,
      quizData: WHEEL_QUIZ_DATA,
      ratingOptions: WHEEL_RATING_OPTIONS,
      ratingLabels: WHEEL_RATING_LABELS,
      ResultsDisplay: WheelOfLifeResultsDisplay,
      calculateResults: (answers: Answers): WheelResults => {
        const res: WheelResults = {
          [WheelCategoryKey.CAREER]: 0, [WheelCategoryKey.FINANCE]: 0, [WheelCategoryKey.HEALTH]: 0, [WheelCategoryKey.FAMILY]: 0,
          [WheelCategoryKey.RELATIONSHIP]: 0, [WheelCategoryKey.GROWTH]: 0, [WheelCategoryKey.FUN]: 0, [WheelCategoryKey.SPIRIT]: 0
        };
        const counts: Record<string, number> = {};

        for (const category of WHEEL_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.wheel_code) {
              res[question.wheel_code] += answers[question.id];
              counts[question.wheel_code] = (counts[question.wheel_code] || 0) + 1;
            }
          }
        }
        Object.keys(res).forEach(key => {
          const count = counts[key] || 1;
          res[key as WheelCategoryKey] = res[key as WheelCategoryKey] / count;
        });
        return res;
      },
    },
    'big-five': {
      title: 'Trắc nghiệm Tính cách Big Five (OCEAN)',
      steps: BIG5_STEPS,
      introduction: BIG5_INTRODUCTION,
      quizData: BIG5_QUIZ_DATA,
      ratingOptions: BIG5_RATING_OPTIONS,
      ratingLabels: BIG5_RATING_LABELS,
      ResultsDisplay: BigFiveResultsDisplay,
      calculateResults: (answers: Answers): BigFiveResults => {
        const res: BigFiveResults = {
          [BigFiveCategoryKey.O]: 0, [BigFiveCategoryKey.C]: 0, [BigFiveCategoryKey.E]: 0,
          [BigFiveCategoryKey.A]: 0, [BigFiveCategoryKey.N]: 0
        };
        for (const category of BIG5_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.big_five_code) {
              res[question.big_five_code] += answers[question.id];
            }
          }
        }
        return res;
      },
    },
    eq: {
      title: 'Trí tuệ Cảm xúc (EQ)',
      steps: EQ_STEPS,
      introduction: EQ_INTRODUCTION,
      quizData: EQ_QUIZ_DATA,
      ratingOptions: EQ_RATING_OPTIONS,
      ratingLabels: EQ_RATING_LABELS,
      ResultsDisplay: EQResultsDisplay,
      calculateResults: (answers: Answers): EQResults => {
        const res: EQResults = {
          [EQCategoryKey.SA]: 0, [EQCategoryKey.SR]: 0, [EQCategoryKey.MO]: 0,
          [EQCategoryKey.EM]: 0, [EQCategoryKey.SS]: 0
        };
        for (const category of EQ_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.eq_code) {
              res[question.eq_code] += answers[question.id];
            }
          }
        }
        return res;
      },
    },
  }), []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('pathai:v2:theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Step Navigation

  const handleNextStep = () => {
    setQuizState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const handleBackStep = () => {
    if (quizState.currentStep > 0) {
      setQuizState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleAnswerChange = (questionId: string, value: number) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));
  };

  const handleGoHome = () => navigateTo('/');
  const handleViewHistory = () => navigateTo('/history');
  const handleViewGoals = () => navigateTo('/goals');
  const handleViewDecisionDashboard = () => navigateTo('/decision-dashboard');

  const handleSelectQuiz = (quizId: string) => {
    resetQuiz();
    setSelectedQuizId(quizId);
    navigateTo(`/quiz/${quizId}`);
  };

  const handleOpenQuizInfo = (quizId: string) => {
    setInfoQuizId(quizId);
    setQuizInfoModalOpen(true);
  };

  const handleLogout = () => {
    setUserData(null);
    setHistory([]);
    setGoals([]);
    StorageService.purgeSession();
    navigateTo('/');
  };

  const handleLogin = (data: UserData) => {
    setUserData(data);
    StorageService.saveUserProfile(data);
    const userHistory = StorageService.getHistory(data.uid || '');
    const userGoals = StorageService.getGoals(data.uid || '');
    setHistory(userHistory);
    setGoals(userGoals);
    setLoginModalOpen(false);
    if (currentView === 'login') {
      navigateTo('/');
    }
  };

  const resetQuiz = () => {
    setQuizState({ currentStep: 0, answers: {} });
    setResults(null);
    setHistorySnapshotUser(null);
  };

  // Finish Quiz and View Results
  const handleFinishQuiz = () => {
    if (!selectedQuizId) return;
    const config = QUIZ_CONFIGS[selectedQuizId as keyof typeof QUIZ_CONFIGS];
    if (!config) return;

    const calculatedResults = config.calculateResults(quizState.answers);
    setResults(calculatedResults);
    setHistorySnapshotUser(null);

    const activeUser = userData || {
      fullName: 'Học sinh Khám phá',
      email: '',
      birthYear: '2008',
      gender: 'Khác',
      location: 'Việt Nam',
      status: 'Học sinh THPT',
      educationLevel: 'THPT',
      source: 'Website',
      expectations: '',
      bio: '',
      avatarUrl: '',
      uid: `guest-${Date.now()}`
    };

    if (activeUser.uid) {
      const newHistoryEntry: QuizHistoryEntry = {
        id: `${selectedQuizId}-${Date.now()}`,
        quizId: selectedQuizId,
        quizTitle: config.title,
        timestamp: Date.now(),
        userData: { ...activeUser },
        results: calculatedResults,
        answers: quizState.answers,
      };

      const updatedHistory = [newHistoryEntry, ...history];
      setHistory(updatedHistory);
      StorageService.saveHistory(activeUser.uid, updatedHistory);
    }
    setCurrentView('results');
  };

  // Read-only history viewing: Never mutate active userData state
  const handleViewResultFromHistory = (entry: QuizHistoryEntry) => {
    resetQuiz();
    setSelectedQuizId(entry.quizId);
    setResults(entry.results);
    setHistorySnapshotUser(entry.userData || userData);
    setQuizState({ currentStep: 0, answers: entry.answers });
    setCurrentView('results');
  };

  const handleDeleteResult = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kết quả này?')) {
      const updated = history.filter(entry => entry.id !== id);
      setHistory(updated);
      if (userData?.uid) {
        StorageService.saveHistory(userData.uid, updated);
      }
    }
  };

  const handleAddGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'status'>) => {
    const newGoalBase: Goal = {
      ...goal,
      id: `goal-${Date.now()}`,
      createdAt: Date.now(),
      status: 'todo',
    };

    const updatedGoals = [newGoalBase, ...goals];
    setGoals(updatedGoals);
    if (userData?.uid) {
      StorageService.saveGoals(userData.uid, updatedGoals);
    }
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    const updatedGoals = goals.map(g => g.id === updatedGoal.id ? updatedGoal : g);
    setGoals(updatedGoals);
    if (userData?.uid) {
      StorageService.saveGoals(userData.uid, updatedGoals);
    }
  };

  const handleDeleteGoal = (id: string) => {
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
    if (userData?.uid) {
      StorageService.saveGoals(userData.uid, updatedGoals);
    }
  };

  const currentQuizConfig = selectedQuizId ? QUIZ_CONFIGS[selectedQuizId as keyof typeof QUIZ_CONFIGS] : null;

  // Render Logic
  if (loadingUser) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'trust':
        return (
          <TrustPageView
            activeTab={trustTab}
            onSelectTab={(tab) => navigateTo(`/${tab}`)}
            onGoHome={handleGoHome}
          />
        );

      case 'login':
        return <Login onLogin={handleLogin} />;

      case 'not-found':
        return <NotFoundView onGoHome={handleGoHome} />;

      case 'quiz': {
        if (!currentQuizConfig) {
          return <HomePage onSelectQuiz={handleSelectQuiz} onOpenGuide={() => setGuideModalOpen(true)} onOpenQuizInfo={handleOpenQuizInfo} onOpenDecisionDashboard={handleViewDecisionDashboard} history={history} userData={userData} />;
        }
        const { steps, introduction, quizData, ratingOptions, ratingLabels } = currentQuizConfig;
        const isResultsStep = quizState.currentStep === steps.length - 1;

        if (quizState.currentStep === 0) {
          return <QuizIntroduction {...introduction} onNext={handleNextStep} />;
        }

        if (isResultsStep) {
          return <div className="text-center py-40"><LoadingSpinner /></div>;
        }

        const categoryIndex = quizState.currentStep - 1;
        const category = quizData[categoryIndex];
        const allAnswered = category && category.questions.every((q: { id: string | number }) => quizState.answers[q.id] !== undefined);
        const isLastQuizStep = quizState.currentStep === quizData.length;

        const onStepComplete = isLastQuizStep ? handleFinishQuiz : handleNextStep;

        return (
          <QuizStep
            category={category}
            answers={quizState.answers}
            onAnswerChange={handleAnswerChange}
            onNext={onStepComplete}
            onBack={handleBackStep}
            isLastStep={isLastQuizStep}
            allAnswered={allAnswered}
            ratingOptions={ratingOptions}
            ratingLabels={ratingLabels}
          />
        );
      }

      case 'results': {
        if (!currentQuizConfig || !results) {
          handleGoHome();
          return null;
        }
        const ResultsDisplay = currentQuizConfig.ResultsDisplay;
        return (
          <Suspense fallback={<div className="text-center py-40"><LoadingSpinner /></div>}>
            <ResultsDisplay
              results={results}
              answers={quizState.answers}
              onGoHome={handleGoHome}
              theme={theme}
              userData={historySnapshotUser || userData}
              onBackToHistory={history.length > 0 ? handleViewHistory : undefined}
              quizId={selectedQuizId!}
              quizTitle={currentQuizConfig.title}
              onAddGoal={handleAddGoal}
            />
          </Suspense>
        );
      }

      case 'history':
        return <HistoryPage history={history} onViewResult={handleViewResultFromHistory} onDeleteResult={handleDeleteResult} onGoHome={handleGoHome} />;

      case 'goals':
        return <GoalsPage goals={goals} onUpdateGoal={handleUpdateGoal} onDeleteGoal={handleDeleteGoal} onGoHome={handleGoHome} />;

      case 'decision-dashboard':
        return (
          <Grade9DecisionDashboard
            history={history}
            onGoHome={handleGoHome}
            onSelectQuiz={handleSelectQuiz}
          />
        );

      case 'home':
      default:
        return (
          <HomePage
            onSelectQuiz={handleSelectQuiz}
            onOpenGuide={() => setGuideModalOpen(true)}
            onOpenQuizInfo={handleOpenQuizInfo}
            onOpenDecisionDashboard={handleViewDecisionDashboard}
            history={history}
            userData={userData}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-700">
      <Header
        currentStep={currentQuizConfig ? quizState.currentStep : 0}
        steps={currentQuizConfig?.steps || []}
        theme={theme}
        toggleTheme={toggleTheme}
        showProgress={currentView === 'quiz'}
        onGoHome={handleGoHome}
        userData={userData}
        onViewHistory={handleViewHistory}
        onViewGoals={handleViewGoals}
        onOpenDecisionDashboard={handleViewDecisionDashboard}
        onLogout={handleLogout}
        onLoginClick={() => setLoginModalOpen(true)}
      />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-12 md:pt-44">
        {renderContent()}
      </main>
      <Footer onOpenDonationModal={() => setDonateModalOpen(true)} onNavigate={navigateTo} />
      <FeedbackButton onClick={() => setFeedbackModalOpen(true)} />
      <DonateModal isOpen={isDonateModalOpen} onClose={() => setDonateModalOpen(false)} />
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
      {isGuideModalOpen && <GuideModal onClose={() => setGuideModalOpen(false)} />}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 relative shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
            >
              ✕
            </button>
            <Login onLogin={handleLogin} />
          </div>
        </div>
      )}
      {isQuizInfoModalOpen && infoQuizId && (
        <QuizInfoModal
          isOpen={isQuizInfoModalOpen}
          onClose={() => setQuizInfoModalOpen(false)}
          introduction={QUIZ_CONFIGS[infoQuizId as keyof typeof QUIZ_CONFIGS]?.introduction}
        />
      )}
      <FloatingShare />
      <PrivacyConsent />
    </div>
  );
};

export default App;
