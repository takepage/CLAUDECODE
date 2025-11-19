// 통합 더미 데이터 파일 (re-export)
// 데이터가 여러 파일로 분리되어 관리되며, 이 파일은 하위 호환성을 위해 모든 데이터를 re-export합니다.

// 사용자 프로필 데이터
export { USER_PROFILE, WEIGHT_TREND } from './userData';

// 1RM 및 강점 분석 데이터
export {
  ONE_RM_RECORDS,
  GYMNASTIC_RECORDS,
  CARDIO_RECORDS,
  BENCHMARK_WODS,
  STRENGTH_ANALYSIS,
  DEADLIFT_1RM_TREND,
  CLEAN_AND_JERK_1RM_TREND,
  SNATCH_1RM_TREND,
  BACK_SQUAT_1RM_TREND,
  SHOULDER_PRESS_1RM_TREND
} from './strengthData';

// 운동 기록 및 출석 데이터
export {
  RECENT_WODS,
  ATTENDANCE_DAYS,
  TODAY_WOD
} from './workoutData';

// 인사이트 및 최근 활동 데이터
export {
  DAILY_INSIGHTS,
  RECENT_ACTIVITIES,
  RECENT_1RM_TESTS,
  RECENT_SKILLS
} from './insightData';

// WOD 전략 분석 예시
export const SAMPLE_WOD_ANALYSIS = {
  wodInput: `5 Rounds For Time:
12 Deadlift (100kg)
9 Hang Power Clean (100kg)
6 Push Jerk (100kg)`,
  wodName: "DT",
  wodType: "FOR TIME",
  difficulty: "중급",
  estimatedTime: "12:45",
  overview: "바벨 좋아형인 당신에게 완벽한 WOD! 데드리프트 강점을 최대한 활용하세요.",
  movements: [
    {
      name: "Deadlift",
      reps: 12,
      weight: 100,
      unit: "kg",
      percentOf1RM: 49,
      strategy: "전 라운드 unbroken 추천",
      reasoning: "1RM 206kg 대비 49%로 매우 가벼움",
      sets: "12 reps 한방에",
      difficulty: "쉬움",
      color: "text-green-600"
    }
  ],
  pacing: [],
  strengths: ["🔥 Deadlift 206kg - 이 WOD에서 압도적 강점!"],
  weaknesses: ["⚠️ Shoulder Press 77kg으로 Push Jerk 100kg는 부담"],
  warnings: [],
  tips: [],
  benchmarkComparison: {
    yourLevel: "중급",
    estimatedTime: "12:45",
    beginnerAvg: "18:00+",
    intermediateAvg: "14:00",
    advancedAvg: "11:00",
    eliteAvg: "8:30",
    yourPercentile: 65,
    note: "RXD 무게가 아닌 100kg 기준"
  },
  similarWODs: [],
  aiInsight: "종합 전략 요약..."
};
