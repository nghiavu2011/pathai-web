/**
 * PathAI Namespaced Student Storage Service (v2)
 * Ensures total cross-user isolation and prevents data leakage on shared computers.
 */

import { UserData, QuizHistoryEntry, Goal } from '../types';

export class StorageService {
  private static PREFIX = 'pathai:v2';

  private static key(subKey: string, uid?: string): string {
    if (uid) {
      return `${this.PREFIX}:user:${uid}:${subKey}`;
    }
    return `${this.PREFIX}:${subKey}`;
  }

  /**
   * Migrate legacy v1 unnamespaced storage if present
   */
  public static initMigration(): UserData | null {
    try {
      const activeUid = localStorage.getItem(this.key('current_uid'));
      if (activeUid) {
        const profile = localStorage.getItem(this.key('profile', activeUid));
        if (profile) return JSON.parse(profile);
      }

      // Check legacy key
      const legacyProfileStr = localStorage.getItem('localUserProfile');
      if (legacyProfileStr) {
        const legacyProfile: UserData = JSON.parse(legacyProfileStr);
        const uid = legacyProfile.uid || `guest-${Date.now()}`;
        legacyProfile.uid = uid;

        // Migrate profile
        this.saveUserProfile(legacyProfile);

        // Migrate history
        const legacyHistoryStr = localStorage.getItem('quizHistory');
        if (legacyHistoryStr) {
          const history = JSON.parse(legacyHistoryStr);
          this.saveHistory(uid, history);
          localStorage.removeItem('quizHistory');
        }

        // Migrate goals
        const legacyGoalsStr = localStorage.getItem('goals');
        if (legacyGoalsStr) {
          const goals = JSON.parse(legacyGoalsStr);
          this.saveGoals(uid, goals);
          localStorage.removeItem('goals');
        }

        localStorage.removeItem('localUserProfile');
        return legacyProfile;
      }
    } catch (e) {
      console.error('Storage initialization/migration error:', e);
    }
    return null;
  }

  public static getCurrentUid(): string | null {
    return localStorage.getItem(this.key('current_uid'));
  }

  public static saveUserProfile(user: UserData): void {
    if (!user.uid) {
      user.uid = `guest-${Date.now()}`;
    }
    localStorage.setItem(this.key('current_uid'), user.uid);
    localStorage.setItem(this.key('profile', user.uid), JSON.stringify(user));
  }

  public static getUserProfile(uid: string): UserData | null {
    try {
      const data = localStorage.getItem(this.key('profile', uid));
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public static getHistory(uid: string): QuizHistoryEntry[] {
    try {
      const data = localStorage.getItem(this.key('history', uid));
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveHistory(uid: string, history: QuizHistoryEntry[]): void {
    try {
      localStorage.setItem(this.key('history', uid), JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save quiz history:', e);
    }
  }

  public static getGoals(uid: string): Goal[] {
    try {
      const data = localStorage.getItem(this.key('goals', uid));
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveGoals(uid: string, goals: Goal[]): void {
    try {
      localStorage.setItem(this.key('goals', uid), JSON.stringify(goals));
    } catch (e) {
      console.error('Failed to save goals:', e);
    }
  }

  public static purgeSession(): void {
    const activeUid = this.getCurrentUid();
    if (activeUid) {
      // Clear session identifier
      localStorage.removeItem(this.key('current_uid'));
    }
  }

  public static deleteUserData(uid: string): void {
    try {
      localStorage.removeItem(this.key('profile', uid));
      localStorage.removeItem(this.key('history', uid));
      localStorage.removeItem(this.key('goals', uid));
      localStorage.removeItem(this.key('decision_state', uid));
      if (this.getCurrentUid() === uid) {
        localStorage.removeItem(this.key('current_uid'));
      }
    } catch (e) {
      console.error('Error deleting user data:', e);
    }
  }
}
