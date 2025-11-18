import { useState } from 'react';
import { X, Dumbbell, Users, Check } from 'lucide-react';

interface QuickWorkoutLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: WorkoutLogData) => void;
  duration: number; // 박스 체류 시간 (초)
}

export interface WorkoutLogData {
  classType: 'class' | 'opengym';
  categories: ('wod' | 'weightlifting' | 'strength' | 'gymnastics' | 'cardio')[]; // 복수 선택
  wodName: string;
  feeling: 'good' | 'normal' | 'bad';
  notes: string;
}

export default function QuickWorkoutLogModal({ isOpen, onClose, onSave, duration }: QuickWorkoutLogModalProps) {
  const [classType, setClassType] = useState<'class' | 'opengym'>('class');
  const [categories, setCategories] = useState<('wod' | 'weightlifting' | 'strength' | 'gymnastics' | 'cardio')[]>(['wod']);
  const [wodName, setWodName] = useState('');
  const [feeling, setFeeling] = useState<'good' | 'normal' | 'bad'>('good');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${minutes}분`;
  };

  const handleSave = () => {
    onSave({
      classType,
      categories,
      wodName: wodName || getCategoryDefaultName(),
      feeling,
      notes
    });
    onClose();
  };

  const getCategoryDefaultName = () => {
    if (categories.length === 0) return 'Daily Workout';
    if (categories.length === 1) {
      const defaults = {
        wod: 'Daily WOD',
        weightlifting: '역도 트레이닝',
        strength: '스트렝스 트레이닝',
        gymnastics: '짐네스틱 트레이닝',
        cardio: '유산소 트레이닝'
      };
      return defaults[categories[0]];
    }
    // 복수 선택 시
    return '복합 트레이닝';
  };

  const toggleCategory = (cat: 'wod' | 'weightlifting' | 'strength' | 'gymnastics' | 'cardio') => {
    setCategories(prev => {
      if (prev.includes(cat)) {
        // 이미 선택되어 있으면 제거 (단, 최소 1개는 유지)
        return prev.length > 1 ? prev.filter(c => c !== cat) : prev;
      } else {
        // 선택되어 있지 않으면 추가
        return [...prev, cat];
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-text-primary">운동 완료! 🎉</h3>
            <p className="text-sm text-text-secondary mt-1">
              박스 체류 시간: <span className="font-semibold text-primary">{formatDuration(duration)}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-light-bg transition-colors"
          >
            <X className="w-6 h-6 text-text-tertiary" />
          </button>
        </div>

        <div className="space-y-5">
          {/* 수업 타입 */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3">
              수업 타입
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setClassType('class')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  classType === 'class'
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-light-border bg-white text-text-secondary hover:border-primary/30'
                }`}
              >
                <Users className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">수업</div>
              </button>
              <button
                onClick={() => setClassType('opengym')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  classType === 'opengym'
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-light-border bg-white text-text-secondary hover:border-primary/30'
                }`}
              >
                <Dumbbell className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">오픈짐</div>
              </button>
            </div>
          </div>

          {/* 운동 카테고리 - 복수 선택 */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              운동 종류 <span className="text-xs text-text-tertiary font-normal">(복수 선택 가능)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'wod', label: 'WOD' },
                { value: 'weightlifting', label: '역도' },
                { value: 'strength', label: '스트렝스' },
                { value: 'gymnastics', label: '짐네스틱' },
                { value: 'cardio', label: '유산소' }
              ].map((cat) => {
                const isSelected = categories.includes(cat.value as any);
                return (
                  <button
                    key={cat.value}
                    onClick={() => toggleCategory(cat.value as any)}
                    className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-secondary text-white shadow-md'
                        : 'bg-light-bg text-text-secondary hover:bg-secondary-light'
                    }`}
                  >
                    {isSelected && (
                      <Check className="absolute top-1 right-1 w-3 h-3" />
                    )}
                    {cat.label}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-text-tertiary mt-2">
              선택된 항목: {categories.map(c => {
                const labels: Record<string, string> = {
                  wod: 'WOD',
                  weightlifting: '역도',
                  strength: '스트렝스',
                  gymnastics: '짐네스틱',
                  cardio: '유산소'
                };
                return labels[c];
              }).join(', ')}
            </p>
          </div>

          {/* WOD 이름 */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              WOD 이름 (선택)
            </label>
            <input
              type="text"
              value={wodName}
              onChange={(e) => setWodName(e.target.value)}
              placeholder={getCategoryDefaultName()}
              className="w-full px-4 py-3 rounded-xl border-2 border-light-border focus:border-primary outline-none transition-colors"
            />
          </div>

          {/* 컨디션 */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3">
              오늘 컨디션
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'good', emoji: '😊', label: '좋음' },
                { value: 'normal', emoji: '😐', label: '보통' },
                { value: 'bad', emoji: '😓', label: '안좋음' }
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFeeling(f.value as any)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    feeling === f.value
                      ? 'border-primary bg-primary-light'
                      : 'border-light-border bg-white hover:border-primary/30'
                  }`}
                >
                  <div className="text-3xl mb-1">{f.emoji}</div>
                  <div className="text-xs font-semibold text-text-primary">{f.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 메모 */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              메모 (선택)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="오늘 운동에 대한 메모를 남겨보세요..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-light-border focus:border-primary outline-none transition-colors resize-none"
            />
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-light-bg hover:bg-light-card-hover text-text-primary font-semibold transition-colors"
          >
            건너뛰기
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white font-semibold transition-all"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
