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
    clear: () => { store = {}; },
    key: (index: number) => Object.keys(store)[index] || null,
    get length() { return Object.keys(store).length; }
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

  it('deletes specific user profile and quiz history without affecting other users', () => {
    const u1: UserData = {
      uid: 'u-1',
      fullName: 'User 1',
      email: 'u1@test.com',
      birthYear: '2008',
      gender: 'Nam',
      location: 'Hà Nội',
      status: 'Học sinh THPT',
      educationLevel: 'THPT',
      source: 'Website',
      expectations: '',
      bio: '',
      avatarUrl: ''
    };
    const u2: UserData = {
      uid: 'u-2',
      fullName: 'User 2',
      email: 'u2@test.com',
      birthYear: '2008',
      gender: 'Nữ',
      location: 'TP.HCM',
      status: 'Học sinh THPT',
      educationLevel: 'THPT',
      source: 'Website',
      expectations: '',
      bio: '',
      avatarUrl: ''
    };

    StorageService.saveUserProfile(u1);
    StorageService.saveUserProfile(u2);
    StorageService.saveHistory('u-1', [{ id: 'h1', quizId: 'holland', quizTitle: 'Holland RIASEC', timestamp: 1, userData: u1, results: {}, answers: {} }]);
    StorageService.saveHistory('u-2', [{ id: 'h2', quizId: 'mi', quizTitle: 'Multiple Intelligences', timestamp: 2, userData: u2, results: {}, answers: {} }]);

    StorageService.deleteUserData('u-1');

    expect(StorageService.getUserProfile('u-1')).toBeNull();
    expect(StorageService.getHistory('u-1')).toEqual([]);
    expect(StorageService.getUserProfile('u-2')).not.toBeNull();
    expect(StorageService.getHistory('u-2')).toHaveLength(1);
  });

  it('clearAllData wipes all pathai keys, legacy keys, and consent flags from local storage', () => {
    localStorage.setItem('pathai:v2:theme', 'dark');
    localStorage.setItem('pathai:v2:consent', JSON.stringify({ version: '2026-03-v2', accepted: true }));
    localStorage.setItem('pathai:v2:current_uid', 'user-999');
    localStorage.setItem('pathai:v2:user:user-999:profile', JSON.stringify({ fullName: 'Student' }));
    localStorage.setItem('localUserProfile', 'old-data');
    localStorage.setItem('unrelated_key', 'keep_this');

    StorageService.clearAllData();

    expect(localStorage.getItem('pathai:v2:theme')).toBeNull();
    expect(localStorage.getItem('pathai:v2:consent')).toBeNull();
    expect(localStorage.getItem('pathai:v2:current_uid')).toBeNull();
    expect(localStorage.getItem('pathai:v2:user:user-999:profile')).toBeNull();
    expect(localStorage.getItem('localUserProfile')).toBeNull();
    // Unrelated keys should remain untouched
    expect(localStorage.getItem('unrelated_key')).toBe('keep_this');
  });
});

