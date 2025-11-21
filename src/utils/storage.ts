import type { WorkoutSession, OneRMRecord } from '../types/workout';

const STORAGE_KEYS = {
  SESSIONS: 'workout-sessions',
  ONE_RM: 'one-rm-records',
} as const;

// 운동 세션 관련
export const getWorkoutSessions = (): WorkoutSession[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load workout sessions:', error);
    return [];
  }
};

export const saveWorkoutSession = (session: WorkoutSession): void => {
  try {
    const sessions = getWorkoutSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);

    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }

    // 날짜 기준 내림차순 정렬
    sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (error) {
    console.error('Failed to save workout session:', error);
  }
};

export const deleteWorkoutSession = (sessionId: string): void => {
  try {
    const sessions = getWorkoutSessions();
    const filtered = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete workout session:', error);
  }
};

export const getSessionByDate = (date: string): WorkoutSession | undefined => {
  const sessions = getWorkoutSessions();
  return sessions.find(s => s.date === date);
};

// 1RM 기록 관련
export const getOneRMRecords = (): OneRMRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ONE_RM);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load 1RM records:', error);
    return [];
  }
};

export const saveOneRMRecord = (record: OneRMRecord): void => {
  try {
    const records = getOneRMRecords();
    const existingIndex = records.findIndex(r => r.id === record.id);

    if (existingIndex >= 0) {
      records[existingIndex] = record;
    } else {
      records.push(record);
    }

    // 날짜 기준 내림차순 정렬
    records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    localStorage.setItem(STORAGE_KEYS.ONE_RM, JSON.stringify(records));
  } catch (error) {
    console.error('Failed to save 1RM record:', error);
  }
};

export const getLatestOneRM = (exerciseName: string): OneRMRecord | undefined => {
  const records = getOneRMRecords();
  return records.find(r => r.exerciseName.toLowerCase() === exerciseName.toLowerCase());
};

// 1RM 자동 추정 (Epley 공식)
export const estimateOneRM = (weight: number, reps: number): number => {
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
};

// 세트 파싱 (예: "5x5" -> { sets: 5, reps: 5 })
export const parseSets = (setsString: string): { sets: number; reps: number } | null => {
  const match = setsString.match(/^(\d+)\s*x\s*(\d+)$/i);
  if (match) {
    return { sets: parseInt(match[1]), reps: parseInt(match[2]) };
  }
  return null;
};
