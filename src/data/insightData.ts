// 인사이트 및 최근 활동 데이터

// 데일리 인사이트 메시지 (홈 화면 상단 카드)
export const DAILY_INSIGHTS = [
  {
    id: "insight-pr",
    type: "pr" as const,
    message: "🎉 Clean & Jerk PR 달성! 125kg 찍었어요!",
    date: "2025-01-16",
    priority: 1
  },
  {
    id: "insight-fact",
    type: "fact" as const,
    message: "100kg 체중으로 머슬업 10개? 상위 5%예요! 🔥",
    date: "2025-01-16",
    priority: 2
  },
  {
    id: "insight-reminder",
    type: "reminder" as const,
    message: "Snatch 기록이 14일째 업데이트 안 됐어요. 테스트 해볼까요?",
    date: "2025-01-16",
    priority: 3
  },
  {
    id: "insight-goal",
    type: "goal" as const,
    message: "이번 주 6회 달성! 목표 완료! 💪",
    date: "2025-01-16",
    priority: 2
  }
];

// 통합 최근 활동 (홈 화면용 - WOD + 1RM + 스킬 통합)
export const RECENT_ACTIVITIES = [
  {
    id: "act-001",
    type: "wod" as const,
    date: "2025-01-16",
    name: "Heavy DT",
    value: "15:23",
    timeAgo: "오늘",
    isPR: false
  },
  {
    id: "act-002",
    type: "1rm" as const,
    date: "2025-01-16",
    name: "Clean & Jerk",
    value: "125kg",
    timeAgo: "오늘",
    isPR: true
  },
  {
    id: "act-003",
    type: "wod" as const,
    date: "2025-01-15",
    name: "Fran",
    value: "3:50",
    timeAgo: "어제",
    isPR: true
  },
  {
    id: "act-004",
    type: "1rm" as const,
    date: "2025-01-14",
    name: "Back Squat",
    value: "147kg",
    timeAgo: "2일 전",
    isPR: false
  },
  {
    id: "act-005",
    type: "skill" as const,
    date: "2025-01-13",
    name: "Pull-up",
    value: "25개",
    timeAgo: "3일 전",
    isPR: true
  },
  {
    id: "act-006",
    type: "wod" as const,
    date: "2025-01-13",
    name: "Grace",
    value: "1:59",
    timeAgo: "3일 전",
    isPR: false
  }
];

// 최근 1RM 테스트 기록 (홈 화면 표시용)
export const RECENT_1RM_TESTS = [
  {
    id: "1rm-001",
    date: "2025-01-16",
    exercise: "Clean & Jerk",
    weight: 125,
    unit: "kg",
    isPR: true,
    previousRecord: 122,
    timeAgo: "오늘"
  },
  {
    id: "1rm-002",
    date: "2025-01-14",
    exercise: "Back Squat",
    weight: 147,
    unit: "kg",
    isPR: false,
    previousRecord: 147,
    timeAgo: "2일 전"
  },
  {
    id: "1rm-003",
    date: "2025-01-12",
    exercise: "Deadlift",
    weight: 206,
    unit: "kg",
    isPR: true,
    previousRecord: 202,
    timeAgo: "4일 전"
  }
];

// 스킬 기록 (홈 화면 표시용)
export const RECENT_SKILLS = [
  {
    id: "skill-001",
    date: "2025-01-15",
    skill: "Double Under",
    reps: 100,
    type: "unbroken",
    isPR: false,
    timeAgo: "1일 전"
  },
  {
    id: "skill-002",
    date: "2025-01-13",
    skill: "Pull-up",
    reps: 25,
    type: "kipping",
    isPR: true,
    timeAgo: "3일 전"
  }
];
