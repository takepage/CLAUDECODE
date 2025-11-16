import { BookOpen, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Logbook() {
  const [showForm, setShowForm] = useState(false);

  const workouts = [
    {
      date: '2024-11-15',
      wod: 'Fran',
      description: '21-15-9 Thrusters (95lb), Pull-ups',
      time: '4:32',
      rpe: 9,
      condition: 'good',
      notes: '전략대로 잘 수행함',
    },
    {
      date: '2024-11-13',
      wod: 'Murph',
      description: '1 Mile Run, 100 Pull-ups, 200 Push-ups, 300 Squats, 1 Mile Run',
      time: '42:15',
      rpe: 10,
      condition: 'normal',
      notes: 'Vest 없이 수행',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary-light">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">운동 기록 (Smart Logbook)</h2>
            <p className="text-sm text-text-secondary">나의 모든 WOD 기록을 관리하세요</p>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          새 기록 추가
        </button>
      </div>

      {/* 새 기록 추가 폼 */}
      {showForm && (
        <div className="card p-6 mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">새 운동 기록</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">날짜</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">WOD 이름</label>
                <input
                  type="text"
                  placeholder="Fran"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">WOD 설명</label>
              <textarea
                placeholder="21-15-9 Thrusters, Pull-ups"
                rows={3}
                className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">기록 (시간/라운드)</label>
                <input
                  type="text"
                  placeholder="4:32"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">RPE (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="5"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">컨디션</label>
              <div className="flex gap-4">
                {['좋음', '보통', '나쁨'].map((condition) => (
                  <button
                    key={condition}
                    className="px-4 py-2 rounded-xl border border-light-border hover:border-primary hover:bg-primary-light transition-colors"
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">메모</label>
              <textarea
                placeholder="오늘의 느낌, 배운 점 등..."
                rows={3}
                className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-200 text-text-primary rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors">
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 운동 기록 목록 */}
      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <div key={index} className="card card-hover p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-text-primary">{workout.wod}</h3>
                <p className="text-sm text-text-secondary mt-1">{workout.date}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{workout.time}</div>
                <div className="text-xs text-text-tertiary mt-1">RPE: {workout.rpe}/10</div>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-3">{workout.description}</p>

            <div className="flex items-center gap-4 pt-3 border-t border-light-border">
              <span className="text-xs px-3 py-1 rounded-full bg-primary-light text-primary font-medium">
                {workout.condition === 'good' ? '좋음' : workout.condition === 'normal' ? '보통' : '나쁨'}
              </span>
              {workout.notes && (
                <span className="text-xs text-text-tertiary">{workout.notes}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
