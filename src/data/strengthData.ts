// 1RM 및 강점 분석 데이터

// 1RM 기록 (파운드 → kg 변환)
export const ONE_RM_RECORDS = {
  cleanAndJerk: { lb: 275, kg: 125, date: "2024-12-10", level: "중급-상급" },
  snatch: { lb: 205, kg: 93, date: "2024-11-15", level: "중급" },
  backSquat: { lb: 325, kg: 147, date: "2024-12-05", level: "중급" },
  frontSquat: { lb: 325, kg: 147, date: "2024-12-05", level: "중급-상급" },
  deadlift: { lb: 455, kg: 206, date: "2024-12-20", level: "상급" },
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
    {
      name: "역도",
      score: 7.2,
      maxScore: 10,
      factors: [
        "Clean & Jerk: 125kg (중급-상급)",
        "Snatch: 93kg (중급)",
        "Grace 1:59 (엘리트)"
      ]
    },
    {
      name: "스트렝스",
      score: 8.8,
      maxScore: 10,
      factors: [
        "Deadlift: 206kg (상급) 💪",
        "Back Squat: 147kg (중급)",
        "Front Squat: 147kg (중급-상급)",
        "Bench Press: 107kg (중급)"
      ]
    },
    {
      name: "머신",
      score: 7.8,
      maxScore: 10,
      factors: [
        "Row 500m: 1:32 (상급)",
        "Assault Bike: 20cal/min (중급-상급)"
      ]
    },
    {
      name: "짐네스틱",
      score: 7.5,
      maxScore: 10,
      factors: [
        "Pull-up: 25개 (상급)",
        "HSPU: 20개 (상급)",
        "Bar Muscle-up: 10개 (상급)",
        "Ring Muscle-up: 0개 ⚠️ (약점)"
      ]
    },
    {
      name: "심폐지구력",
      score: 8.2,
      maxScore: 10,
      factors: [
        "Fran: 4:30 (상급)",
        "Row 500m: 1:32 (상급)",
        "Running 1km: 6:00 (중급)"
      ]
    },
    {
      name: "근지구력",
      score: 7.0,
      maxScore: 10,
      factors: [
        "Toes to Bar: 25개 (상급)",
        "Double Under: 100개 (상급)",
        "Chest to Bar: 12개 (중급)"
      ]
    }
  ],
  athleteType: "바벨 좋아형",
  athleteEmoji: "🏋️",
  topCategory: "스트렝스",
  topScore: 8.8,
  averageScore: 7.75,
  level: "상급",
  description: "바벨만 잡으면 괴물이 되는 타입. 데드리프트 206kg의 중량 덕후!",
  typeExplanation: "스트렝스(8.8/10)가 압도적으로 높고, 역도와 머신 능력도 우수합니다. 바벨을 이용한 중량 운동에서 최고의 퍼포먼스를 발휘하는 타입입니다."
};

// 1RM 추이 (최근 2개월)
export const DEADLIFT_1RM_TREND = [
  { date: "2024-11-17", weight: 195 },
  { date: "2024-11-24", weight: 198 },
  { date: "2024-12-01", weight: 200 },
  { date: "2024-12-08", weight: 202 },
  { date: "2024-12-15", weight: 204 },
  { date: "2024-12-22", weight: 205 },
  { date: "2024-12-29", weight: 206 }
];

export const CLEAN_AND_JERK_1RM_TREND = [
  { date: "2024-11-17", weight: 117 },
  { date: "2024-11-24", weight: 119 },
  { date: "2024-12-01", weight: 120 },
  { date: "2024-12-08", weight: 122 },
  { date: "2024-12-15", weight: 123 },
  { date: "2024-12-22", weight: 124 },
  { date: "2024-12-29", weight: 125 }
];

export const SNATCH_1RM_TREND = [
  { date: "2024-11-17", weight: 87 },
  { date: "2024-11-24", weight: 89 },
  { date: "2024-12-01", weight: 90 },
  { date: "2024-12-08", weight: 91 },
  { date: "2024-12-15", weight: 92 },
  { date: "2024-12-22", weight: 92 },
  { date: "2024-12-29", weight: 93 }
];

export const BACK_SQUAT_1RM_TREND = [
  { date: "2024-11-17", weight: 141 },
  { date: "2024-11-24", weight: 143 },
  { date: "2024-12-01", weight: 144 },
  { date: "2024-12-08", weight: 145 },
  { date: "2024-12-15", weight: 146 },
  { date: "2024-12-22", weight: 146 },
  { date: "2024-12-29", weight: 147 }
];

export const SHOULDER_PRESS_1RM_TREND = [
  { date: "2024-11-17", weight: 72 },
  { date: "2024-11-24", weight: 73 },
  { date: "2024-12-01", weight: 74 },
  { date: "2024-12-08", weight: 75 },
  { date: "2024-12-15", weight: 76 },
  { date: "2024-12-22", weight: 76 },
  { date: "2024-12-29", weight: 77 }
];
