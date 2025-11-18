import { X, Dumbbell, Clock, Flame } from 'lucide-react';

interface WorkoutSummaryModalProps {
  date: string;
  isOpen: boolean;
  onClose: () => void;
  workoutData?: {
    wodName: string;
    wodType: string;
    classType: 'class' | 'opengym';
    category: 'wod' | 'weightlifting' | 'strength' | 'gymnastics';
    time?: string;
    rounds?: number;
    duration: number; // 박스 체류 시간 (초)
    feeling?: 'good' | 'normal' | 'bad';
    notes?: string;
  };
}

export default function WorkoutSummaryModal({ date, isOpen, onClose, workoutData }: WorkoutSummaryModalProps) {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${minutes}분`;
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      wod: 'WOD',
      weightlifting: '역도',
      strength: '스트렝스',
      gymnastics: '짐네스틱'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getClassTypeLabel = (type: string) => {
    return type === 'class' ? '수업' : '오픈짐';
  };

  const getFeelingEmoji = (feeling?: string) => {
    if (!feeling) return '😐';
    const emojis = {
      good: '😊',
      normal: '😐',
      bad: '😓'
    };
    return emojis[feeling as keyof typeof emojis];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-text-primary">{formatDate(date)}</h3>
            <p className="text-sm text-text-secondary mt-1">운동 기록</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-light-bg transition-colors"
          >
            <X className="w-6 h-6 text-text-tertiary" />
          </button>
        </div>

        {workoutData ? (
          <div className="space-y-4">
            {/* 운동 타입 배지 */}
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-semibold">
                {getClassTypeLabel(workoutData.classType)}
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary-light text-secondary text-sm font-semibold">
                {getCategoryLabel(workoutData.category)}
              </span>
            </div>

            {/* WOD 이름 */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="w-5 h-5" />
                <span className="text-sm opacity-90">{workoutData.wodType}</span>
              </div>
              <h4 className="text-2xl font-bold">{workoutData.wodName}</h4>
            </div>

            {/* 기록 정보 */}
            <div className="grid grid-cols-2 gap-3">
              {workoutData.time && (
                <div className="p-4 rounded-xl bg-light-bg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-text-tertiary" />
                    <span className="text-xs text-text-secondary">완료 시간</span>
                  </div>
                  <div className="text-xl font-bold text-primary">{workoutData.time}</div>
                </div>
              )}
              {workoutData.rounds !== undefined && (
                <div className="p-4 rounded-xl bg-light-bg">
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-4 h-4 text-text-tertiary" />
                    <span className="text-xs text-text-secondary">라운드</span>
                  </div>
                  <div className="text-xl font-bold text-secondary">{workoutData.rounds}</div>
                </div>
              )}
              <div className="p-4 rounded-xl bg-light-bg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-text-tertiary" />
                  <span className="text-xs text-text-secondary">박스 체류</span>
                </div>
                <div className="text-xl font-bold text-text-primary">
                  {formatDuration(workoutData.duration)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-light-bg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{getFeelingEmoji(workoutData.feeling)}</span>
                  <span className="text-xs text-text-secondary">컨디션</span>
                </div>
                <div className="text-sm font-semibold text-text-primary">
                  {workoutData.feeling === 'good' ? '좋음' : workoutData.feeling === 'bad' ? '안좋음' : '보통'}
                </div>
              </div>
            </div>

            {/* 메모 */}
            {workoutData.notes && (
              <div className="p-4 rounded-xl bg-secondary-light border border-secondary/20">
                <div className="text-xs text-text-secondary mb-2 font-semibold">메모</div>
                <p className="text-sm text-text-primary">{workoutData.notes}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-text-secondary">이 날의 운동 기록이 없습니다.</p>
          </div>
        )}

        {/* 닫기 버튼 */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-light-bg hover:bg-light-card-hover text-text-primary font-semibold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
