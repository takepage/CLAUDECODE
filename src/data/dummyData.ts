// 이딱복 선수의 실제 데이터 기반 더미 데이터

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

// 1RM 기록 (파운드 → kg 변환)
export const ONE_RM_RECORDS = {
  cleanAndJerk: { lb: 275, kg: 125, date: "2024-12-10", level: "중급-상급" },
  snatch: { lb: 205, kg: 93, date: "2024-11-15", level: "중급" },
  backSquat: { lb: 325, kg: 147, date: "2024-12-05", level: "중급" },
  frontSquat: { lb: 325, kg: 147, date: "2024-12-05", level: "중급-상급" },
  deadlift: { lb: 455, kg: 206, date: "2024-12-20", level: "상급" }, // 최강!
  benchPress: { lb: 235, kg: 107, date: "2024-11-20", level: "중급" },
  shoulderPress: { lb: 170, kg: 77, date: "2024-11-10", level: "초급-중급" }
};

// 짐네스틱 기록
export const GYMNASTIC_RECORDS = {
  pullUp: { kipping: 25, strict: null, style: "kipping", level: "상급" },
  chestToBar: { kipping: 12, strict: null, style: "kipping", level: "중급" },
  toesToBar: { max: 25, strict: null, level: "상급" },
  hspu: { kipping: 20, strict: null, style: "kipping", level: "상급" },
  barMuscleUp: { max: 10, level: "상급" },
  ringMuscleUp: { max: 0, level: "비기너", note: "약점!" },
  doubleUnder: { max: 100, level: "상급" }
};

// 머신 & 심폐지구력
export const CARDIO_RECORDS = {
  row500m: { time: "1:32", seconds: 92, level: "상급", pace: "1:32/500m" },
  assaultBike1min: { calories: 20, level: "중급-상급", wodPace: "20cal/min" },
  running1km: { time: "6:00", seconds: 360, level: "중급", pace: "6:00/km" }
};

// 벤치마크 WOD
export const BENCHMARK_WODS = {
  fran: {
    time: "4:30",
    seconds: 270,
    rxd: true,
    date: "2024-12-15",
    level: "상급",
    percentile: 85,
    note: "Thruster + Pull-up 강점 활용"
  },
  grace: {
    time: "1:59",
    seconds: 119,
    rxd: true,
    date: "2024-12-01",
    level: "엘리트",
    percentile: 95,
    note: "🔥 2분 컷! Clean & Jerk 괴물"
  },
  cindy: null,
  murph: null,
  helen: null,
  diane: null,
  annie: null
};

// 강점 분석 (0-10점 스케일)
export const STRENGTH_ANALYSIS = {
  categories: [
    { name: "역도", score: 7.2, maxScore: 10 },
    { name: "스트렝스", score: 8.8, maxScore: 10 },
    { name: "머신", score: 7.8, maxScore: 10 },
    { name: "짐네스틱", score: 7.5, maxScore: 10 },
    { name: "심폐지구력", score: 8.2, maxScore: 10 },
    { name: "근지구력", score: 7.0, maxScore: 10 }
  ],
  athleteType: "바벨 좋아형",
  athleteEmoji: "🏋️",
  topCategory: "스트렝스",
  topScore: 8.8,
  averageScore: 7.75,
  level: "상급",
  description: "바벨만 잡으면 괴물이 되는 타입. 데드리프트 206kg의 중량 덕후!"
};

// 최근 운동 기록 (과거 2주)
export const RECENT_WODS = [
  {
    id: "wod-001",
    date: "2025-01-16",
    wodName: "Heavy DT",
    wodType: "FOR TIME",
    time: "15:23",
    rxd: true,
    feeling: "good",
    movements: [
      { name: "Deadlift", weight: 80, reps: 12, unit: "kg" },
      { name: "Hang Power Clean", weight: 80, reps: 9, unit: "kg" },
      { name: "Push Jerk", weight: 80, reps: 6, unit: "kg" }
    ],
    rounds: 5,
    notes: "데드리프트는 편했는데 Jerk에서 어깨 힘들었음"
  },
  {
    id: "wod-002",
    date: "2025-01-15",
    wodName: "Shoulder Burner",
    wodType: "AMRAP",
    rounds: 8,
    rxd: true,
    feeling: "bad",
    movements: [
      { name: "HSPU", reps: 10 },
      { name: "KB Swing", weight: 24, reps: 15, unit: "kg" },
      { name: "Box Jump", height: 60, reps: 20, unit: "cm" }
    ],
    timeLimit: 20,
    notes: "HSPU 10개씩 unbroken 성공. 하지만 후반 어깨 터짐"
  },
  {
    id: "wod-003",
    date: "2025-01-14",
    wodName: "Deadlift Party",
    wodType: "FOR TIME",
    time: "8:45",
    rxd: true,
    feeling: "good",
    movements: [
      { name: "Deadlift", weight: 100, reps: 21, unit: "kg" },
      { name: "Pull-up", reps: 21 },
      { name: "Deadlift", weight: 100, reps: 15, unit: "kg" },
      { name: "Pull-up", reps: 15 },
      { name: "Deadlift", weight: 100, reps: 9, unit: "kg" },
      { name: "Pull-up", reps: 9 }
    ],
    notes: "데드리프트 강점 활용! 전부 unbroken"
  },
  {
    id: "wod-004",
    date: "2025-01-13",
    wodName: "Row & Thruster Hell",
    wodType: "FOR TIME",
    time: "18:32",
    rxd: true,
    feeling: "normal",
    movements: [
      { name: "Row", distance: 1000, unit: "m" },
      { name: "Thruster", weight: 43, reps: 50, unit: "kg" },
      { name: "Row", distance: 750, unit: "m" },
      { name: "Thruster", weight: 43, reps: 35, unit: "kg" },
      { name: "Row", distance: 500, unit: "m" },
      { name: "Thruster", weight: 43, reps: 20, unit: "kg" }
    ],
    notes: "Row는 빨랐는데 Thruster에서 쪼개짐"
  },
  {
    id: "wod-005",
    date: "2025-01-11",
    wodName: "The Seven",
    wodType: "FOR TIME",
    time: "25:15",
    rxd: false,
    feeling: "bad",
    movements: [
      { name: "HSPU", reps: 7 },
      { name: "Thruster", weight: 43, reps: 7, unit: "kg" },
      { name: "Knees to Elbow", reps: 7 },
      { name: "Deadlift", weight: 111, reps: 7, unit: "kg" },
      { name: "Pull-up", reps: 7 },
      { name: "KB Swing", weight: 32, reps: 7, unit: "kg" },
      { name: "Row", distance: 700, unit: "m" }
    ],
    rounds: 7,
    notes: "7라운드 지옥... 후반에 완전 터짐"
  }
];

// 출석 기록 (최근 30일)
export const ATTENDANCE_DAYS = [
  "2025-01-16",
  "2025-01-15",
  "2025-01-14",
  "2025-01-13",
  "2025-01-11",
  "2025-01-10",
  "2025-01-09",
  "2025-01-08",
  "2025-01-07",
  "2025-01-06",
  "2025-01-04",
  "2025-01-03",
  "2025-01-02",
  "2024-12-30",
  "2024-12-29",
  "2024-12-28",
  "2024-12-27",
  "2024-12-26",
  "2024-12-23",
  "2024-12-22",
  "2024-12-21",
  "2024-12-20",
  "2024-12-19",
  "2024-12-18"
];

// 체중 추이 (최근 3개월)
export const WEIGHT_TREND = [
  { date: "2024-10-17", weight: 105 },
  { date: "2024-10-24", weight: 104.5 },
  { date: "2024-10-31", weight: 104 },
  { date: "2024-11-07", weight: 103.5 },
  { date: "2024-11-14", weight: 103 },
  { date: "2024-11-21", weight: 102.5 },
  { date: "2024-11-28", weight: 102 },
  { date: "2024-12-05", weight: 101.5 },
  { date: "2024-12-12", weight: 101 },
  { date: "2024-12-19", weight: 100.5 },
  { date: "2024-12-26", weight: 100 },
  { date: "2025-01-02", weight: 100.2 },
  { date: "2025-01-09", weight: 100.1 },
  { date: "2025-01-16", weight: 100.0 }
];

// 1RM 추이 (Deadlift - 최근 6개월)
export const DEADLIFT_1RM_TREND = [
  { date: "2024-07-17", weight: 185 },
  { date: "2024-08-17", weight: 190 },
  { date: "2024-09-17", weight: 195 },
  { date: "2024-10-17", weight: 198 },
  { date: "2024-11-17", weight: 202 },
  { date: "2024-12-20", weight: 206 }
];

// WOD 전략 분석 예시 (실제 이딱복님에게 맞춤)
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
      percentOf1RM: 49, // 206kg 대비
      strategy: "전 라운드 unbroken 추천",
      reasoning: "1RM 206kg 대비 49%로 매우 가벼움. 당신의 최강 강점! 빠르게 처리하고 다음 동작으로",
      sets: "12 reps 한방에",
      difficulty: "쉬움",
      color: "text-green-600"
    },
    {
      name: "Hang Power Clean",
      reps: 9,
      weight: 100,
      unit: "kg",
      percentOf1RM: 80, // 125kg 대비
      strategy: "1-3라운드 unbroken, 4-5라운드 5-4 split",
      reasoning: "1RM 125kg 대비 80%로 무거운 편. 초반은 한방 가능하나 후반 피로 시 쪼개기 추천",
      sets: "R1-3: 9개 | R4-5: 5-4",
      difficulty: "보통",
      color: "text-yellow-600"
    },
    {
      name: "Push Jerk",
      reps: 6,
      weight: 100,
      unit: "kg",
      percentOf1RM: 130, // 77kg 대비 (Shoulder Press 기준)
      strategy: "전 라운드 3-3 또는 2-2-2 split 필수",
      reasoning: "Shoulder Press 1RM 77kg 대비 130%로 매우 무거움! 어깨 힘이 약점이므로 무리하지 말고 확실히 쪼개기",
      sets: "3-3 추천",
      difficulty: "어려움",
      color: "text-red-600"
    }
  ],

  pacing: [
    {
      round: 1,
      estimatedTime: "2:15",
      splitTime: "2:15",
      advice: "페이스 찾기. Deadlift 빠르게, Jerk는 안전하게",
      heartRate: "75-80%"
    },
    {
      round: 2,
      estimatedTime: "2:30",
      splitTime: "4:45",
      advice: "리듬 유지. Clean unbroken 가능하면 계속",
      heartRate: "80-85%"
    },
    {
      round: 3,
      estimatedTime: "2:40",
      splitTime: "7:25",
      advice: "중간 지점. 어깨 피로 느껴지면 Jerk 쪼개기",
      heartRate: "85-90%"
    },
    {
      round: 4,
      estimatedTime: "2:50",
      splitTime: "10:15",
      advice: "피로 증가. Clean 5-4로 쪼개기 시작",
      heartRate: "90-95%"
    },
    {
      round: 5,
      estimatedTime: "2:30",
      splitTime: "12:45",
      advice: "마지막! 남은 힘 모두 사용해서 끝내기",
      heartRate: "95-100%"
    }
  ],

  strengths: [
    "🔥 Deadlift 206kg - 이 WOD에서 압도적 강점!",
    "💪 Clean & Jerk 경험 풍부 (Grace 1:59 기록자)",
    "⚡ 바벨 사이클링 능력 우수",
    "🏋️ 전반적인 바벨 컨트롤 능력 뛰어남"
  ],

  weaknesses: [
    "⚠️ Shoulder Press 77kg으로 Push Jerk 100kg는 부담",
    "⚠️ 어제 'Shoulder Burner' WOD로 어깨 피로도 높음",
    "⚠️ 최근 6일 연속 운동으로 전반적 피로 누적"
  ],

  warnings: [
    "🚨 어깨 부상 위험: Push Jerk 무게가 Shoulder Press 1RM의 130%입니다. 절대 무리하지 마세요!",
    "🚨 피로도 경고: 이번 주 6일 연속 운동 중. 오버트레이닝 주의 필요",
    "💡 전날 HSPU 80개 (어제 WOD)로 어깨 회복 불충분할 수 있음"
  ],

  tips: [
    "💡 Deadlift에서 시간 벌기: 당신의 최강 강점이므로 여기서 리드를 확보하세요",
    "💡 바벨 놓지 않기: Deadlift → Clean 전환 시 바벨 내려놓지 말고 바로 연결하면 5-7초 절약",
    "💡 Jerk 호흡법: 실패 시 바로 재시도하지 말고 3-5초 깊게 호흡 후 다시",
    "💡 그립 관리: 5라운드까지 그립 유지를 위해 마그네슘 여유롭게 사용",
    "💡 3라운드 후 전략적 휴식: 30-45초 정도 여유있게 쉬면 후반 페이스 유지에 도움"
  ],

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

  similarWODs: [
    {
      name: "Heavy DT",
      date: "2025-01-16",
      time: "15:23",
      weight: 80,
      result: "이번엔 20kg 더 무거움. 시간 더 걸릴 것 예상"
    },
    {
      name: "Grace",
      date: "2024-12-01",
      time: "1:59",
      note: "Clean & Jerk 강점 증명! 오늘도 클린 파트 빠르게 처리 가능"
    }
  ],

  aiInsight: `
🎯 종합 전략 요약:

이딱복님은 "바벨 좋아형" 선수로, 이 WOD는 당신에게 매우 유리합니다!

**공략법:**
1️⃣ Deadlift에서 시간 벌기 (강점 활용)
2️⃣ Clean은 초반 unbroken, 후반 한번만 쪼개기
3️⃣ Jerk는 처음부터 안전하게 쪼개기 (어깨 약점)

**예상 시나리오:**
- 1-2R: 빠른 페이스, Jerk만 조심
- 3R: 중간 휴식 포인트 (30초)
- 4-5R: Clean 쪼개기, 끝까지 밀어붙이기

**주의사항:**
어깨가 약점이고 전날 HSPU 80개를 했으므로, Push Jerk에서 절대 무리하지 마세요.
폼이 무너지면 바로 쉬고, 안전하게 완료하는 게 목표입니다!

**목표 시간:** 12-14분 (RXD 무게 기준은 10분대)
  `
};
