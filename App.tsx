
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
  CareerAnchorKey,
  CareerAnchorResults,
  WorkValueKey,
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
import { auth, db } from './config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, collection, addDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';

// Constants
import { AVAILABLE_QUIZZES, RATING_OPTIONS, RATING_LABELS, QUIZ_DATA as HOLLAND_QUIZ_DATA, STEPS as HOLLAND_STEPS, HOLLAND_INTRODUCTION } from './constants';
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
import Login from './components/Login'; // New Login Component
import HistoryPage from './components/HistoryPage';
import GoalsPage from './components/goals/GoalsPage';
import DonateModal from './components/DonateModal';
import FeedbackButton from './components/FeedbackButton';
import FeedbackModal from './components/FeedbackModal';
import GuideModal from './components/shared/GuideModal';
import QuizInfoModal from './components/shared/QuizInfoModal';

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

type View = 'home' | 'quiz' | 'results' | 'history' | 'goals';

interface QuizState {
  currentStep: number;
  answers: Answers;
}

const App: React.FC = () => {
  // Authentication State
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Sync Auth State
  // Sync Auth State - BYPASS AUTH FOR NOW
  useEffect(() => {
    // Simulate logged in user immediately
    const tempUser: UserData = {
      uid: 'user-guest-' + Date.now(),
      fullName: 'Khách',
      email: 'guest@pathai.com',
      birthYear: '2000',
      gender: 'Khác',
      location: 'Việt Nam',
      status: 'Khách tham quan',
      educationLevel: 'Khác',
      source: 'Trực tiếp',
      expectations: 'Tìm hiểu bản thân',
      avatarUrl: ''
    };

    // Check if we already have a profile in localStorage
    const stored = localStorage.getItem('localUserProfile');
    if (stored) {
      setUserData(JSON.parse(stored));
    } else {
      setUserData(tempUser);
      localStorage.setItem('localUserProfile', JSON.stringify(tempUser));
    }
    setLoadingUser(false);
  }, []);

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({ currentStep: 0, answers: {} });
  const [results, setResults] = useState<any | null>(null);

  const [history, setHistory] = useState<QuizHistoryEntry[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load User Data (History & Goals) from Firestore
  // Load User Data (History & Goals) from localStorage (Offline Mode)
  useEffect(() => {
    try {
      const historyLocal = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      setHistory(historyLocal);

      const goalsLocal = JSON.parse(localStorage.getItem('goals') || '[]');
      setGoals(goalsLocal);
    } catch (e) {
      console.error("Error loading local data", e);
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
        const results: HollandResults = { [CategoryKey.R]: 0, [CategoryKey.I]: 0, [CategoryKey.A]: 0, [CategoryKey.S]: 0, [CategoryKey.E]: 0, [CategoryKey.C]: 0 };
        for (const category of HOLLAND_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.category_code) {
              results[question.category_code] += answers[question.id];
            }
          }
        }
        return results;
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
        const results: MIResults = { [MICategoryKey.L]: 0, [MICategoryKey.LQ]: 0, [MICategoryKey.VS]: 0, [MICategoryKey.BK]: 0, [MICategoryKey.MU]: 0, [MICategoryKey.IN]: 0, [MICategoryKey.IG]: 0, [MICategoryKey.NT]: 0 };
        for (const category of MI_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.mi_code) {
              results[question.mi_code] += answers[question.id];
            }
          }
        }
        return results;
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
        const effort = effortScores.reduce((a, b) => a + b, 0) / effortScores.length;
        const interest = interestScores.reduce((a, b) => a + b, 0) / interestScores.length;
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
        const results: CDBResults = { [CDBBarrierKey.A]: 0, [CDBBarrierKey.B]: 0, [CDBBarrierKey.C]: 0, [CDBBarrierKey.D]: 0, [CDBBarrierKey.E]: 0 };
        for (const category of CDB_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.cdb_code) {
              results[question.cdb_code] += answers[question.id];
            }
          }
        }
        return results;
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
        const results: CareerAnchorResults = { TF: 0, GM: 0, AU: 0, SE: 0, EC: 0, SV: 0, PC: 0, LS: 0 };
        for (const category of CAREER_ANCHORS_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.anchor_code) {
              results[question.anchor_code] += answers[question.id];
            }
          }
        }
        return results;
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
        const results: WorkValuesResults = { ACH: 0, SEC: 0, AUT: 0, INF: 0, ALT: 0, AES: 0 };
        for (const category of WORK_VALUES_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.work_value_code) {
              results[question.work_value_code] += answers[question.id];
            }
          }
        }
        return results;
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
        const results: WheelResults = {
          [WheelCategoryKey.CAREER]: 0, [WheelCategoryKey.FINANCE]: 0, [WheelCategoryKey.HEALTH]: 0, [WheelCategoryKey.FAMILY]: 0,
          [WheelCategoryKey.RELATIONSHIP]: 0, [WheelCategoryKey.GROWTH]: 0, [WheelCategoryKey.FUN]: 0, [WheelCategoryKey.SPIRIT]: 0
        };
        const counts: Record<string, number> = {};

        for (const category of WHEEL_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.wheel_code) {
              results[question.wheel_code] += answers[question.id];
              counts[question.wheel_code] = (counts[question.wheel_code] || 0) + 1;
            }
          }
        }
        Object.keys(results).forEach(key => {
          const count = counts[key] || 1;
          results[key as WheelCategoryKey] = results[key as WheelCategoryKey] / count;
        });
        return results;
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
        const results: BigFiveResults = {
          [BigFiveCategoryKey.O]: 0, [BigFiveCategoryKey.C]: 0, [BigFiveCategoryKey.E]: 0,
          [BigFiveCategoryKey.A]: 0, [BigFiveCategoryKey.N]: 0
        };
        for (const category of BIG5_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.big_five_code) {
              results[question.big_five_code] += answers[question.id];
            }
          }
        }
        return results;
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
        const results: EQResults = {
          [EQCategoryKey.SA]: 0, [EQCategoryKey.SR]: 0, [EQCategoryKey.MO]: 0,
          [EQCategoryKey.EM]: 0, [EQCategoryKey.SS]: 0
        };
        for (const category of EQ_QUIZ_DATA) {
          for (const question of category.questions) {
            if (answers[question.id] && question.eq_code) {
              results[question.eq_code] += answers[question.id];
            }
          }
        }
        return results;
      },
    },
  }), []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('quizHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  // Auth Handling
  // Auth Handling
  const handleLogin = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('localUserProfile', JSON.stringify(data));
  };

  const handleLogout = async () => {
    localStorage.removeItem('localUserProfile');
    window.location.reload(); // Simple reload to reset state
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [quizState.currentStep, currentView]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const resetQuiz = () => {
    setSelectedQuizId(null);
    setQuizState({ currentStep: 0, answers: {} });
    setResults(null);
  };

  const handleGoHome = () => {
    resetQuiz();
    setCurrentView('home');
  };

  const handleSelectQuiz = (id: string) => {
    resetQuiz();
    setSelectedQuizId(id);
    setCurrentView('quiz');
  };

  const handleOpenQuizInfo = (id: string) => {
    setInfoQuizId(id);
    setQuizInfoModalOpen(true);
  };

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

  // Finish Quiz and View Results
  const handleFinishQuiz = () => {
    const config = QUIZ_CONFIGS[selectedQuizId!];
    const calculatedResults = config.calculateResults(quizState.answers);
    setResults(calculatedResults);

    // Save to Firestore and State
    // Save to LocalStorage
    if (userData) {
      const newHistoryEntry: QuizHistoryEntry = {
        id: `${selectedQuizId}-${Date.now()}`,
        quizId: selectedQuizId!,
        quizTitle: config.title,
        timestamp: Date.now(),
        userData: userData,
        results: calculatedResults,
        answers: quizState.answers,
      };

      const updatedHistory = [newHistoryEntry, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
    }
    setCurrentView('results');
  };

  const handleViewHistory = () => setCurrentView('history');
  const handleViewGoals = () => setCurrentView('goals');

  const handleViewResultFromHistory = (entry: QuizHistoryEntry) => {
    resetQuiz();
    setSelectedQuizId(entry.quizId);
    setResults(entry.results);
    setUserData(entry.userData); // Ensure legacy data works
    setQuizState({ currentStep: 0, answers: entry.answers });
    setCurrentView('results');
  };

  const handleDeleteResult = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kết quả này?')) {
      const updated = history.filter(entry => entry.id !== id);
      setHistory(updated);
      localStorage.setItem('quizHistory', JSON.stringify(updated));
    }
  };

  const handleAddGoal = async (goal: Omit<Goal, 'id' | 'createdAt' | 'status'>) => {
    const newGoalBase = {
      ...goal,
      id: `goal-${Date.now()}`,
      createdAt: Date.now(),
      status: 'todo' as const,
    };

    const updatedGoals = [newGoalBase, ...goals];
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const handleUpdateGoal = async (updatedGoal: Goal) => {
    const updatedGoals = goals.map(g => g.id === updatedGoal.id ? updatedGoal : g);
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const handleDeleteGoal = async (id: string) => {
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const currentQuizConfig = selectedQuizId ? QUIZ_CONFIGS[selectedQuizId] : null;

  // Render Logic
  if (loadingUser) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  }

  if (!userData) {
    // Should generally not happen due to auto-guest login, but keeps type safety
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'quiz':
        if (!currentQuizConfig) return <HomePage onSelectQuiz={handleSelectQuiz} onOpenGuide={() => setGuideModalOpen(true)} onOpenQuizInfo={handleOpenQuizInfo} />;
        const { steps, introduction, quizData, ratingOptions, ratingLabels } = currentQuizConfig;
        const isResultsStep = quizState.currentStep === steps.length - 1; // Last Step is now pure loading/calculation transition

        if (quizState.currentStep === 0) {
          return <QuizIntroduction {...introduction} onNext={handleNextStep} />;
        }

        // Removed intermediate RegistrationForm step since user is already logged in

        if (isResultsStep) {
          return <div className="text-center py-40"><LoadingSpinner /></div>
        }

        const categoryIndex = quizState.currentStep - 1;
        const category = quizData[categoryIndex];
        const allAnswered = category && category.questions.every((q: { id: string | number; }) => quizState.answers[q.id] !== undefined);
        const isLastQuizStep = quizState.currentStep === quizData.length;

        // Skip registration step logic (previously at steps.length - 2)
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

      case 'results':
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
              userData={userData}
              onBackToHistory={history.length > 0 ? handleViewHistory : undefined}
              quizId={selectedQuizId!}
              quizTitle={currentQuizConfig.title}
              onAddGoal={handleAddGoal}
            />
          </Suspense>
        );

      case 'history':
        return <HistoryPage history={history} onViewResult={handleViewResultFromHistory} onDeleteResult={handleDeleteResult} onGoHome={handleGoHome} />;

      case 'goals':
        return <GoalsPage goals={goals} onUpdateGoal={handleUpdateGoal} onDeleteGoal={handleDeleteGoal} onGoHome={handleGoHome} />;

      case 'home':
      default:
        return <HomePage onSelectQuiz={handleSelectQuiz} onOpenGuide={() => setGuideModalOpen(true)} onOpenQuizInfo={handleOpenQuizInfo} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-700`}>
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
        onLogout={handleLogout}
      />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-12 md:pt-44">
        {renderContent()}
      </main>
      <Footer onOpenDonationModal={() => setDonateModalOpen(true)} />
      <FeedbackButton onClick={() => setFeedbackModalOpen(true)} />
      <DonateModal isOpen={isDonateModalOpen} onClose={() => setDonateModalOpen(false)} />
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
      {isGuideModalOpen && <GuideModal onClose={() => setGuideModalOpen(false)} />}
      {isQuizInfoModalOpen && infoQuizId && (
        <QuizInfoModal
          isOpen={isQuizInfoModalOpen}
          onClose={() => setQuizInfoModalOpen(false)}
          introduction={QUIZ_CONFIGS[infoQuizId]?.introduction}
        />
      )}
    </div>
  );
};

export default App;
