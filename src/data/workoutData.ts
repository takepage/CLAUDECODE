// 운동 기록 및 출석 데이터

// 최근 운동 기록 (과거 2주)
export const RECENT_WODS = [
  {
    id: "wod-001",
    date: "2025-01-16",
    wodName: "Heavy DT",
    wodType: "FOR TIME",
    classType: "class" as const,
    category: "wod" as const,
    categories: ["wod", "strength"] as const,
    time: "15:23",
    rxd: true,
    feeling: "good" as const,
    duration: 5400,
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
    classType: "class" as const,
    category: "gymnastics" as const,
    categories: ["gymnastics", "wod"] as const,
    rounds: 8,
    rxd: true,
    feeling: "bad" as const,
    duration: 4200,
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
    classType: "opengym" as const,
    category: "strength" as const,
    categories: ["strength"] as const,
    time: "8:45",
    rxd: true,
    feeling: "good" as const,
    duration: 3600,
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
    classType: "class" as const,
    category: "wod" as const,
    categories: ["wod", "cardio"] as const,
    time: "18:32",
    rxd: true,
    feeling: "normal" as const,
    duration: 4800,
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
    classType: "class" as const,
    category: "wod" as const,
    categories: ["wod", "strength", "gymnastics"] as const,
    time: "25:15",
    rxd: false,
    feeling: "bad" as const,
    duration: 5100,
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

// 오늘의 WOD (홈 화면 표시용)
export const TODAY_WOD = {
  name: "Fran",
  type: "FOR TIME",
  movements: [
    "21-15-9",
    "Thrusters (43kg)",
    "Pull-ups"
  ],
  estimatedTime: "4-6분",
  difficulty: "상급",
  lastRecord: {
    time: "4:30",
    date: "2024-12-15"
  }
};
