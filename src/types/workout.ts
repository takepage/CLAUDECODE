// 블록 타입
export type BlockType = 'wod' | 'strength' | 'weightlifting' | 'gymnastics' | 'cardio' | 'core' | 'other';

// 컨디션
export type Feeling = 'good' | 'normal' | 'bad';

// 무게 단위
export type WeightUnit = 'kg' | 'lb';

// 운동 블록
export interface WorkoutBlock {
  id: string;
  type: BlockType;
  name: string;
  duration?: number; // 초
  sets?: string; // "5x5", "3x8" 등
  weight?: number;
  weightUnit?: WeightUnit;
  content?: string; // 메모/상세 내용
  videoUrl?: string; // 나중에 R2 URL
  videoThumbnailUrl?: string;
  orderIndex: number;
  isPR?: boolean;
  timestamp: number;
}

// 운동 세션 (하루 전체)
export interface WorkoutSession {
  id: string;
  date: string; // YYYY-MM-DD
  totalDuration?: number; // 초
  feeling?: Feeling;
  notes?: string;
  blocks: WorkoutBlock[];
  createdAt: number;
}

// 1RM 기록
export interface OneRMRecord {
  id: string;
  exerciseName: string;
  weight: number;
  weightUnit: WeightUnit;
  date: string; // YYYY-MM-DD
  isEstimated: boolean; // 추정 vs 실제 테스트
  sourceBlockId?: string; // 어느 블록에서 기록됐는지
  createdAt: number;
}

// 블록 타입별 라벨과 이모지
export const BLOCK_TYPE_CONFIG: Record<BlockType, { label: string; emoji: string; color: string }> = {
  wod: { label: 'WOD', emoji: '🔥', color: 'bg-red-100 text-red-700 border-red-300' },
  strength: { label: '스트렝스', emoji: '💪', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  weightlifting: { label: '역도', emoji: '🏋️', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  gymnastics: { label: '체조', emoji: '🤸', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  cardio: { label: '유산소', emoji: '🏃', color: 'bg-green-100 text-green-700 border-green-300' },
  core: { label: '코어', emoji: '🔵', color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
  other: { label: '기타', emoji: '📝', color: 'bg-gray-100 text-gray-700 border-gray-300' }
};

// 컨디션 설정
export const FEELING_CONFIG: Record<Feeling, { emoji: string; label: string }> = {
  good: { emoji: '😊', label: '좋음' },
  normal: { emoji: '😐', label: '보통' },
  bad: { emoji: '😞', label: '안좋음' }
};
