import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StrengthRadarChart from '../components/StrengthRadarChart';
import OneRMTrendChart from '../components/OneRMTrendChart';
import {
  Timer,
  Plus,
  TrendingUp,
  Award,
  ChevronRight,
  Zap
} from 'lucide-react';
import {
  USER_PROFILE,
  ATTENDANCE_DAYS,
  DAILY_INSIGHTS,
  RECENT_ACTIVITIES
} from '../data/dummyData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [weeklyAttendance, setWeeklyAttendance] = useState(0);

  const weeklyGoal = USER_PROFILE.targetFrequency; // 주 목표 출석 횟수

  // 이번 주 출석 일수 계산 (일요일 시작)
  const calculateWeeklyAttendance = (days: string[]) => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (일요일) ~ 6 (토요일)
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weeklyDays = days.filter(dateString => {
      const date = new Date(dateString);
      return date >= weekStart && date <= weekEnd;
    });

    return weeklyDays.length;
  };

  useEffect(() => {
    // localStorage에서 출석 데이터 로드, 없으면 더미 데이터 사용
    const data = localStorage.getItem('attendanceDays');
    const loadedDays = data ? JSON.parse(data) : ATTENDANCE_DAYS;
    setWeeklyAttendance(calculateWeeklyAttendance(loadedDays));
  }, []);

  // 우선순위가 가장 높은 인사이트 메시지 가져오기
  const topInsight = DAILY_INSIGHTS.sort((a, b) => a.priority - b.priority)[0];

  // 인사이트 타입별 배경 스타일
  const getInsightStyle = (type: string) => {
    switch (type) {
      case 'pr':
        return 'bg-gradient-to-br from-warning to-accent-orange text-white';
      case 'fact':
        return 'bg-gradient-to-br from-primary to-secondary text-white';
      case 'reminder':
        return 'bg-gradient-to-br from-secondary to-accent-purple text-white';
      case 'goal':
        return 'bg-gradient-to-br from-accent-purple to-accent-pink text-white';
      default:
        return 'bg-primary-light text-primary';
    }
  };

  // 활동 타입별 아이콘 색상
  const getActivityColor = (type: string, isPR: boolean) => {
    if (isPR) return 'text-warning';
    switch (type) {
      case 'wod':
        return 'text-primary';
      case '1rm':
        return 'text-danger';
      case 'skill':
        return 'text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  // 활동 타입별 배경 색상
  const getActivityBgColor = (type: string, isPR: boolean) => {
    if (isPR) return 'bg-warning/10';
    switch (type) {
      case 'wod':
        return 'bg-primary-light';
      case '1rm':
        return 'bg-danger/10';
      case 'skill':
        return 'bg-secondary-light';
      default:
        return 'bg-light-bg';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* 데일리 인사이트 카드 */}
      {topInsight && (
        <div className={`card p-5 ${getInsightStyle(topInsight.type)}`}>
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium opacity-80 mb-1">Today's Insight</p>
              <p className="text-lg font-bold leading-snug">{topInsight.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* 주요 액션 버튼 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 타이머 시작 버튼 */}
        <button
          onClick={() => navigate('/live')}
          className="card card-hover p-6 flex flex-col items-center justify-center gap-3 min-h-[140px] bg-gradient-to-br from-primary to-primary-dark text-white active:scale-95 transition-transform"
        >
          <div className="p-4 rounded-2xl bg-white/20">
            <Timer className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold">타이머</h3>
            <p className="text-sm opacity-90 mt-1">운동 시작하기</p>
          </div>
        </button>

        {/* 빠른 기록 버튼 */}
        <button
          onClick={() => navigate('/logbook')}
          className="card card-hover p-6 flex flex-col items-center justify-center gap-3 min-h-[140px] bg-gradient-to-br from-secondary to-accent-blue text-white active:scale-95 transition-transform"
        >
          <div className="p-4 rounded-2xl bg-white/20">
            <Plus className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold">빠른 기록</h3>
            <p className="text-sm opacity-90 mt-1">운동 기록하기</p>
          </div>
        </button>
      </div>

      {/* 이번 주 출석 현황 */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-text-primary">이번 주</h3>
          <span className="text-sm font-semibold text-text-secondary">
            {weeklyAttendance}/{weeklyGoal}회
          </span>
        </div>
        <div className="flex gap-2">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-3 rounded-full transition-all ${
                index < weeklyAttendance
                  ? 'bg-primary shadow-sm'
                  : 'bg-light-border'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-text-tertiary mt-3 text-center">
          {weeklyAttendance >= weeklyGoal
            ? '🔥 이번 주 목표 달성!'
            : `${weeklyGoal - weeklyAttendance}회 더 필요해요`}
        </p>
      </div>

      {/* 최근 활동 */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-text-primary">최근 활동</h3>
          <button
            onClick={() => navigate('/logbook')}
            className="flex items-center gap-1 text-sm text-primary font-semibold hover:gap-2 transition-all"
          >
            전체보기
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {RECENT_ACTIVITIES.slice(0, 6).map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-xl bg-light-bg hover:bg-light-card-hover transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-xl ${getActivityBgColor(activity.type, activity.isPR)} flex items-center justify-center flex-shrink-0`}>
                  {activity.type === 'wod' && <Timer className={`w-5 h-5 ${getActivityColor(activity.type, activity.isPR)}`} />}
                  {activity.type === '1rm' && <TrendingUp className={`w-5 h-5 ${getActivityColor(activity.type, activity.isPR)}`} />}
                  {activity.type === 'skill' && <Award className={`w-5 h-5 ${getActivityColor(activity.type, activity.isPR)}`} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-text-primary text-sm truncate">
                      {activity.name}
                    </h4>
                    {activity.isPR && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-warning text-white font-bold flex-shrink-0">
                        PR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-tertiary">{activity.timeAgo}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <div className={`text-base font-bold ${activity.isPR ? 'text-warning' : 'text-primary'}`}>
                  {activity.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 분석 섹션 */}
      <div className="pt-4">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-text-primary">상세 분석</h2>
          <div className="flex-1 h-px bg-light-border"></div>
        </div>

        {/* 강점/약점 분석 */}
        <div className="mb-6">
          <StrengthRadarChart />
        </div>

        {/* 추이 분석 */}
        <div>
          <OneRMTrendChart />
        </div>
      </div>
    </div>
  );
}
