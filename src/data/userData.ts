// 사용자 프로필 데이터

export const USER_PROFILE = {
  name: "이딱복",
  nickname: "딱복",
  age: 26,
  birthDate: "1999-02-25",
  gender: "male",
  height: 178,
  weight: 100,
  bodyTrend: "cutting", // 체중 감량 중
  experience: "intermediate",
  experienceMonths: 18,
  box: "얼티밋 트레이닝 이수점",
  currentFrequency: 6, // 주 6회
  targetFrequency: 6,
  membershipStart: "2025-06-01",
  membershipEnd: "2025-12-01",
  goals: ["체중 감량", "체력 향상", "기록 향상", "건강 유지"],
  weaknesses: ["역도", "스트렝스", "짐네스틱"]
};

// 체중 추이 (최근 2개월 - 2024.11.17 계정 시작)
export const WEIGHT_TREND = [
  { date: "2024-11-17", weight: 105 },
  { date: "2024-11-24", weight: 104 },
  { date: "2024-12-01", weight: 103 },
  { date: "2024-12-08", weight: 102 },
  { date: "2024-12-15", weight: 101.5 },
  { date: "2024-12-22", weight: 101 },
  { date: "2024-12-29", weight: 100.5 },
  { date: "2025-01-05", weight: 100.2 },
  { date: "2025-01-12", weight: 100.1 },
  { date: "2025-01-16", weight: 100.0 }
];
