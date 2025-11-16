import QuickStats from '../components/QuickStats';
import StrengthRadarChart from '../components/StrengthRadarChart';
import OneRMTrendChart from '../components/OneRMTrendChart';
import { MapPin, Calendar, Flame } from 'lucide-react';

export default function Dashboard() {
  // 출석 데이터 (간단한 예시)
  const attendanceDays = [1, 2, 3, 5, 6, 8, 10, 12, 13, 14, 15]; // 11월 출석일
  const consecutiveDays = 3; // 연속 출석 일수
  const boxMembershipDaysLeft = 18; // 회원권 남은 날짜

  return (
    <div className="space-y-8">
      {/* 박스 정보 및 출석 체크 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 박스 정보 */}
        <div className="card card-hover p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary-light">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">내 박스</h3>
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-text-primary mb-2">CrossFit Seoul</h4>
            <p className="text-sm text-text-secondary mb-4">서울시 강남구</p>
            <div className="pt-4 border-t border-light-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">회원권 남은 기간</span>
                <span className={`text-lg font-bold ${boxMembershipDaysLeft <= 7 ? 'text-accent-red' : 'text-primary'}`}>
                  {boxMembershipDaysLeft}일
                </span>
              </div>
              {boxMembershipDaysLeft <= 7 && (
                <p className="text-xs text-accent-red mt-2">⚠️ 곧 만료됩니다</p>
              )}
            </div>
          </div>
        </div>

        {/* 연속 출석 */}
        <div className="card card-hover p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-accent-orange/10">
              <Flame className="w-5 h-5 text-accent-orange" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">연속 출석</h3>
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-accent-orange mb-2">{consecutiveDays}</div>
            <p className="text-sm text-text-secondary">일 연속</p>
            <p className="text-xs text-text-tertiary mt-4">
              계속 가세요! 🔥
            </p>
          </div>
        </div>

        {/* 이번 달 출석 캘린더 */}
        <div className="card card-hover p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-secondary-light">
              <Calendar className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">11월 출석</h3>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`aspect-square flex items-center justify-center text-xs rounded-lg ${
                  attendanceDays.includes(day)
                    ? 'bg-primary text-white font-bold'
                    : 'bg-light-bg text-text-tertiary'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-text-secondary text-center">
            총 {attendanceDays.length}일 출석
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StrengthRadarChart />
        <OneRMTrendChart />
      </div>

      {/* Recent WODs */}
      <div className="card card-hover p-6">
        <h3 className="text-xl font-bold text-text-primary mb-4">최근 운동 기록</h3>
        <div className="space-y-3">
          {[
            { name: 'Fran', date: '2024-11-15', time: '4:32', type: 'For Time' },
            { name: 'Murph', date: '2024-11-13', time: '42:15', type: 'For Time' },
            { name: 'Cindy', date: '2024-11-11', time: '20 Rounds', type: 'AMRAP' },
          ].map((wod, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-light-bg hover:bg-light-card-hover transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{wod.name}</h4>
                  <p className="text-sm text-text-secondary">{wod.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{wod.time}</div>
                <div className="text-xs text-text-tertiary">{wod.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
