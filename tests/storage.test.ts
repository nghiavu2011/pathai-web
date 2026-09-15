import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from '../services/storageService';
import { UserData, QuizHistoryEntry, Goal } from '../types';

// Mock localStorage for Node test runner
const createLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
};

describe('PATHAI StorageService & Cross-User Isolation Suite', () => {
  beforeEach(() => {
    // @ts-ignore
    global.localStorage = createLocalStorageMock();
  });

  it('isolates user profiles, history, and goals by UID namespace', () => {
    const student1: UserData = {
      uid: 'student-101',
      fullName: 'Nguyễn Văn A',
      email: 'a@example.com',
      birthYear: '2010',
      gender: 'Nam',
      location: 'Hà Nội',
      status: 'Học sinh Lớp 10',
      educationLevel: 'THPT',
      expectations: 'Khám phá ngành CNTT'
    };

    const student2: UserData = {
      uid: 'student-202',
      fullName: 'Trần Thị B',
      email: 'b@example.com',
      birthYear: '2009',
      gender: 'Nữ',
      location: 'TP. Hồ Chí Minh',
      status: 'Học sinh Lớp 11',
      educationLevel: 'THPT',
      expectations: 'Tìm hiểu ngành Y Dược'
    };

    // Save student 1
    StorageService.saveUserProfile(student1);
    const history1: QuizHistoryEntry[] = [{
      id: 'h1',
      quizId: 'holland',
      quizTitle: 'Trắc nghiệm Holland',
      timestamp: 1000,
      userData: student1,
      results: { R: 25, I: 20 },
      answers: {}
    }];
    StorageService.saveHistory(student1.uid!, history1);

    // Save student 2
    StorageService.saveUserProfile(student2);
    const history2: QuizHistoryEntry[] = [{
      id: 'h2',
      quizId: 'mi',
      quizTitle: 'Trí thông minh Đa diện',
      timestamp: 2000,
      userData: student2,
      results: { L: 20, LQ: 25 },
      answers: {}
    }];
    StorageService.saveHistory(student2.uid!, history2);

    // Assert student 1 history does not bleed into student 2
    const readHistory1 = StorageService.getHistory('student-101');
    const readHistory2 = StorageService.getHistory('student-202');

    expect(readHistory1).toHaveLength(1);
    expect(readHistory1[0].quizId).toBe('holland');

    expect(readHistory2).toHaveLength(1);
    expect(readHistory2[0].quizId).toBe('mi');

    // Purge active session
    StorageService.purgeSession();
    expect(StorageService.getCurrentUid()).toBeNull();
  });

  it('migrates legacy v1 storage to v2 namespaced storage safely', () => {
    const legacyUser = {
      fullName: 'Học sinh Cũ',
      email: 'legacy@example.com',
      birthYear: '2008',
      gender: 'Nam',
      location: 'Đà Nẵng',
      status: 'Học sinh Lớp 12',
      educationLevel: 'THPT',
      expectations: 'Xét tuyển Đại học'
    };

    const legacyHistory = [{ id: 'old-1', quizId: 'holland', timestamp: 500, userData: legacyUser, results: {}, answers: {} }];
    const legacyGoals = [{ id: 'g1', quizId: 'holland', quizTitle: 'Holland', text: 'Học tiếng Anh', status: 'todo', createdAt: 500 }];

    localStorage.setItem('localUserProfile', JSON.stringify(legacyUser));
    localStorage.setItem('quizHistory', JSON.stringify(legacyHistory));
    localStorage.setItem('goals', JSON.stringify(legacyGoals));

    // Run migration
    const migratedUser = StorageService.initMigration();

    expect(migratedUser).not.toBeNull();
    expect(migratedUser?.fullName).toBe('Học sinh Cũ');
    expect(migratedUser?.uid).toBeDefined();

    // Verify legacy keys were cleaned
    expect(localStorage.getItem('localUserProfile')).toBeNull();
    expect(localStorage.getItem('quizHistory')).toBeNull();
    expect(localStorage.getItem('goals')).toBeNull();

    // Verify data accessible via v2 namespaced methods
    const migratedHistory = StorageService.getHistory(migratedUser!.uid!);
    const migratedGoals = StorageService.getGoals(migratedUser!.uid!);

    expect(migratedHistory).toHaveLength(1);
    expect(migratedGoals).toHaveLength(1);
  });
});
