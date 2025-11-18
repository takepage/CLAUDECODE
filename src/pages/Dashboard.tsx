import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StrengthRadarChart from '../components/StrengthRadarChart';
import OneRMTrendChart from '../components/OneRMTrendChart';
import WorkoutSummaryModal from '../components/WorkoutSummaryModal';
import {
  Timer,
  Plus,
  TrendingUp,
  Award,
  ChevronRight,
  Zap,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft
} from 'lucide-react';
import {
  USER_PROFILE,
  ATTENDANCE_DAYS,
  DAILY_INSIGHTS,
  RECENT_ACTIVITIES
} from '../data/dummyData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [attendanceDays, setAttendanceDays] = useState<string[]>([]);
  const [weeklyAttendance, setWeeklyAttendance] = useState(0);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const weeklyGoal = USER_PROFILE.targetFrequency;

  // 이번 주 출석 일수 계산
  const calculateWeeklyAttendance = (days: string[]) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
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

  // 현재 주의 날짜들
  const getCurrentWeekDays = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      week.push(day);
    }
    return week;
  };

  // 월 캘린더 데이터 생성
  const getMonthCalendar = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendarDays: (Date | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(selectedYear, selectedMonth, day));
    }

    return calendarDays;
  };

  const weekDays = getCurrentWeekDays();
  const monthCalendarDays = getMonthCalendar();
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const isAttendanceDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return attendanceDays.includes(dateString);
  };

  const handleDateClick = (dateString: string) => {
    if (attendanceDays.includes(dateString)) {
      setSelectedDate(dateString);
      setIsModalOpen(true);
    }
  };

  const getWorkoutDataForDate = (dateString: string) => {
    const logsData = localStorage.getItem('workoutLogs');
    if (logsData) {
      const workoutLogs = JSON.parse(logsData);
      const logWorkout = workoutLogs.find((wod: any) => wod.date === dateString);
      if (logWorkout) {
        return {
          wodName: logWorkout.wodName,
          wodType: logWorkout.wodType,
          classType: logWorkout.classType,
          categories: logWorkout.categories,
          time: logWorkout.time,
          rounds: logWorkout.rounds,
          duration: logWorkout.duration,
          feeling: logWorkout.feeling,
          notes: logWorkout.notes
        };
      }
    }
    return undefined;
  };

  useEffect(() => {
    const data = localStorage.getItem('attendanceDays');
    const loadedDays = data ? JSON.parse(data) : ATTENDANCE_DAYS;
    setAttendanceDays(loadedDays);
    setWeeklyAttendance(calculateWeeklyAttendance(loadedDays));
  }, []);

  const topInsight = [...DAILY_INSIGHTS].sort((a, b) => a.priority - b.priority)[0];

  const getInsightStyle = (type: string) => {
    switch (type) {
      case 'pr':
        return 'bg-primary text-white';
      case 'fact':
        return 'bg-secondary text-white';
      case 'reminder':
        return 'bg-accent-purple text-white';
      case 'goal':
        return 'bg-primary text-white';
      default:
        return 'bg-primary-light text-primary';
    }
  };

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
      {/* 데일리 인사이트 카드 - 모바일에서 더 작고 깔끔하게 */}
      {topInsight && (
        <div className={`card p-3 md:p-4 ${getInsightStyle(topInsight.type)}`}>
          <div className="flex items-start gap-2 md:gap-3">
            <Zap className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium opacity-80 mb-0.5">Today's Insight</p>
              <p className="text-sm md:text-base font-bold leading-snug">{topInsight.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* 주요 액션 버튼 */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <button
          onClick={() => navigate('/wod-strategy')}
          className="p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 min-h-[120px] md:min-h-[140px] bg-primary text-white rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <div className="p-3 md:p-4 rounded-2xl bg-white/20">
            <Timer className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold">타이머</h3>
            <p className="text-xs md:text-sm opacity-90 mt-1">운동 시작하기</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/logbook')}
          className="p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 min-h-[120px] md:min-h-[140px] bg-secondary text-white rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <div className="p-3 md:p-4 rounded-2xl bg-white/20">
            <Plus className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold">빠른 기록</h3>
            <p className="text-xs md:text-sm opacity-90 mt-1">운동 기록하기</p>
          </div>
        </button>
      </div>

      {/* 출석 캘린더 + 주간 출석 */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary-light">
              <Calendar className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">출석 캘린더</h3>
              <p className="text-xs text-text-tertiary mt-0.5">
                이번 주 {weeklyAttendance}/{weeklyGoal}회
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
            className="p-2 hover:bg-light-bg rounded-lg transition-colors"
            aria-label={isCalendarExpanded ? '주별 보기' : '월별 보기'}
          >
            {isCalendarExpanded ? (
              <ChevronUp className="w-5 h-5 text-text-tertiary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-text-tertiary" />
            )}
          </button>
        </div>

        {/* 주간 출석 바 */}
        <div className="flex gap-2 mb-4">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full transition-all ${
                index < weeklyAttendance
                  ? 'bg-primary shadow-sm'
                  : 'bg-light-border'
              }`}
            />
          ))}
        </div>

        {isCalendarExpanded ? (
          /* 월별 캘린더 */
          <>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-light-bg rounded-lg transition-colors"
                aria-label="이전 달"
              >
                <ChevronLeft className="w-4 h-4 text-text-tertiary" />
              </button>
              <div className="font-semibold text-text-primary">
                {selectedYear}년 {monthNames[selectedMonth]}
              </div>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-light-bg rounded-lg transition-colors"
                aria-label="다음 달"
              >
                <ChevronRight className="w-4 h-4 text-text-tertiary" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className="text-xs text-center text-text-tertiary font-semibold">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {monthCalendarDays.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dateString = date.toISOString().split('T')[0];
                const isAttended = attendanceDays.includes(dateString);

                return (
                  <div
                    key={index}
                    onClick={() => isAttended && handleDateClick(dateString)}
                    className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-all ${
                      isAttended
                        ? 'bg-primary text-white font-bold cursor-pointer hover:bg-primary/80 hover:scale-110'
                        : 'bg-light-bg text-text-tertiary'
                    }`}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-sm text-text-secondary text-center">
              {selectedYear}년 {monthNames[selectedMonth]} 총{' '}
              {attendanceDays.filter((dateString) => {
                const d = new Date(dateString);
                return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
              }).length}일 출석
            </div>
          </>
        ) : (
          /* 주별 캘린더 */
          <>
            <div className="grid grid-cols-7 gap-2 mb-3">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className="text-xs text-center text-text-tertiary font-semibold">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((date, index) => {
                const isAttended = isAttendanceDay(date);
                const isToday = date.toDateString() === new Date().toDateString();
                const dateString = date.toISOString().split('T')[0];

                return (
                  <div
                    key={index}
                    onClick={() => isAttended && handleDateClick(dateString)}
                    className={`aspect-square flex items-center justify-center text-sm rounded-xl font-semibold transition-all ${
                      isAttended
                        ? 'bg-primary text-white shadow-md cursor-pointer hover:bg-primary/80 hover:scale-110'
                        : isToday
                        ? 'bg-secondary-light text-secondary border-2 border-secondary'
                        : 'bg-light-bg text-text-tertiary'
                    }`}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* 상세 분석: 레이더 + 추이 그래프 (좌우 배치) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StrengthRadarChart />
        <OneRMTrendChart />
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

      {/* 운동 요약 모달 */}
      <WorkoutSummaryModal
        date={selectedDate || ''}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workoutData={selectedDate ? getWorkoutDataForDate(selectedDate) : undefined}
      />
    </div>
  );
}
