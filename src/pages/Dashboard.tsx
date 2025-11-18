import { useState, useEffect } from 'react';
import StrengthRadarChart from '../components/StrengthRadarChart';
import OneRMTrendChart from '../components/OneRMTrendChart';
import WorkoutSummaryModal from '../components/WorkoutSummaryModal';
import { MapPin, Calendar, Flame, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Tooltip from '../components/Tooltip';
import { USER_PROFILE, ATTENDANCE_DAYS, RECENT_WODS } from '../data/dummyData';

export default function Dashboard() {
  const [attendanceDays, setAttendanceDays] = useState<string[]>([]);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 0-11

  // 회원권 남은 날짜 계산
  const calculateDaysLeft = () => {
    const endDate = new Date(USER_PROFILE.membershipEnd);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const boxMembershipDaysLeft = calculateDaysLeft();

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

  const [weeklyAttendance, setWeeklyAttendance] = useState(0);
  const weeklyGoal = USER_PROFILE.targetFrequency; // 주 목표 출석 횟수
  const achievementRate = weeklyGoal > 0 ? Math.round((weeklyAttendance / weeklyGoal) * 100) : 0;

  useEffect(() => {
    // localStorage에서 출석 데이터 로드, 없으면 더미 데이터 사용
    const data = localStorage.getItem('attendanceDays');
    const loadedDays = data ? JSON.parse(data) : ATTENDANCE_DAYS;
    setAttendanceDays(loadedDays);
    setWeeklyAttendance(calculateWeeklyAttendance(loadedDays));
  }, []);

  // 현재 주의 날짜들 (일~토)
  const getCurrentWeekDays = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (일요일) ~ 6 (토요일)
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

  const weekDays = getCurrentWeekDays();

  // 선택된 월의 캘린더 데이터 생성
  const getMonthCalendar = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 (일요일) ~ 6 (토요일)

    const calendarDays: (Date | null)[] = [];

    // 이전 달의 빈 칸
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null);
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(selectedYear, selectedMonth, day));
    }

    return calendarDays;
  };

  const monthCalendarDays = getMonthCalendar();

  // 월 변경 핸들러
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

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const isAttendanceDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return attendanceDays.includes(dateString);
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (dateString: string) => {
    if (attendanceDays.includes(dateString)) {
      setSelectedDate(dateString);
      setIsModalOpen(true);
    }
  };

  // 선택된 날짜의 운동 데이터 가져오기
  const getWorkoutDataForDate = (dateString: string) => {
    // 1. localStorage의 workoutLogs 먼저 확인
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

    // 2. 더미 데이터 확인
    const workout = RECENT_WODS.find(wod => wod.date === dateString);
    if (!workout) return undefined;

    return {
      wodName: workout.wodName,
      wodType: workout.wodType,
      classType: workout.classType,
      categories: workout.categories || [workout.category], // 하위 호환성
      time: workout.time,
      rounds: workout.rounds,
      duration: workout.duration,
      feeling: workout.feeling,
      notes: workout.notes
    };
  };

  return (
    <div className="space-y-8">
      {/* 박스 정보 및 출석 체크 - 높이 통일 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 내 박스 */}
        <div className="card card-hover p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary-light">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-text-primary">내 박스</h3>
              <Tooltip content="다니고 있는 크로스핏 박스 정보입니다" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-text-primary mb-2">{USER_PROFILE.box}</h4>
            <p className="text-sm text-text-secondary mb-4">수원시 팔달구</p>
          </div>
          <div className="pt-4 border-t border-light-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">회원권 남은 기간</span>
                <Tooltip content="회원권 만료일까지 남은 일수입니다" />
              </div>
              <span className={`text-xl font-bold ${boxMembershipDaysLeft <= 7 ? 'text-accent-red' : 'text-primary'}`}>
                {boxMembershipDaysLeft}일
              </span>
            </div>
            {boxMembershipDaysLeft <= 7 && (
              <p className="text-xs text-accent-red mt-2">⚠️ 곧 만료됩니다</p>
            )}
          </div>
        </div>

        {/* 주간 목표 달성율 */}
        <div className="card card-hover p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-accent-orange/10">
              <Flame className="w-5 h-5 text-accent-orange" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-text-primary">주간 목표 달성율</h3>
              <Tooltip content={`이번 주 목표: 주 ${weeklyGoal}회 출석`} />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-4">
              <div className="text-6xl font-bold text-accent-orange mb-2">{achievementRate}%</div>
              <p className="text-sm text-text-secondary">
                이번 주 {weeklyAttendance}/{weeklyGoal}회
              </p>
            </div>
            {/* 진행바 */}
            <div className="w-full bg-light-bg rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  achievementRate >= 100
                    ? 'bg-gradient-to-r from-primary to-accent-green'
                    : achievementRate >= 70
                    ? 'bg-accent-orange'
                    : 'bg-gray-400'
                }`}
                style={{ width: `${Math.min(achievementRate, 100)}%` }}
              />
            </div>
          </div>
          <div className="text-center pt-4 border-t border-light-border">
            <p className="text-xs text-text-tertiary">
              {achievementRate >= 100
                ? '목표 달성! 🔥'
                : achievementRate >= 70
                ? '거의 다 왔어요! 💪'
                : '화이팅! 💪'}
            </p>
          </div>
        </div>

        {/* 출석 캘린더 - 주별/월별 토글 */}
        <div className="card card-hover p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-secondary-light">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-text-primary">출석 체크</h3>
                <Tooltip content="운동 시작 버튼으로 자동 체크됩니다. 클릭하여 월별 보기!" />
              </div>
            </div>
            <button
              onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
              className="p-1 hover:bg-light-bg rounded-lg transition-colors"
            >
              {isCalendarExpanded ? (
                <ChevronUp className="w-4 h-4 text-text-tertiary" />
              ) : (
                <ChevronDown className="w-4 h-4 text-text-tertiary" />
              )}
            </button>
          </div>

          {isCalendarExpanded ? (
            /* 월별 캘린더 */
            <>
              {/* 월/년 네비게이션 */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-light-bg rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-text-tertiary" />
                </button>
                <div className="font-semibold text-text-primary">
                  {selectedYear}년 {monthNames[selectedMonth]}
                </div>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-light-bg rounded-lg transition-colors"
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
                    // 빈 칸
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
            /* 주별 캘린더 (한 줄) */
            <>
              <div className="flex-1">
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
                        onClick={() => handleDateClick(dateString)}
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
              </div>
              <div className="mt-4 pt-4 border-t border-light-border text-center">
                <p className="text-xs text-text-tertiary">이번 주 출석 • 클릭하여 월별 보기</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 1행: 강점 그래프 (전체 너비) */}
      <StrengthRadarChart />

      {/* 2행: 추이 그래프 (전체 너비) */}
      <OneRMTrendChart />

      {/* Recent WODs */}
      <div className="card card-hover p-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-xl font-bold text-text-primary">최근 운동 기록</h3>
          <Tooltip content="최근 수행한 WOD 기록입니다. 클릭하면 상세 보기!" />
        </div>
        <div className="space-y-3">
          {RECENT_WODS.slice(0, 5).map((wod, index) => (
            <div key={wod.id} className="flex items-center justify-between p-4 rounded-xl bg-light-bg hover:bg-light-card-hover transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-light group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center">
                  <span className="text-lg font-bold text-primary group-hover:text-white">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary flex items-center gap-2">
                    {wod.wodName}
                    {wod.rxd ? (
                      <span className="text-xs px-2 py-0.5 rounded bg-primary text-white font-bold">RXD</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-400 text-white font-bold">Scaled</span>
                    )}
                  </h4>
                  <p className="text-sm text-text-secondary">{wod.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {wod.time || `${wod.rounds} rounds`}
                </div>
                <div className="text-xs text-text-tertiary">{wod.wodType}</div>
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
