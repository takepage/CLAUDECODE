import { useState, useEffect } from 'react';
import StrengthRadarChart from '../components/StrengthRadarChart';
import OneRMTrendChart from '../components/OneRMTrendChart';
import { MapPin, Calendar, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import Tooltip from '../components/Tooltip';
import { USER_PROFILE, ATTENDANCE_DAYS, RECENT_WODS } from '../data/dummyData';

export default function Dashboard() {
  const [attendanceDays, setAttendanceDays] = useState<string[]>([]);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  // 회원권 남은 날짜 계산
  const calculateDaysLeft = () => {
    const endDate = new Date(USER_PROFILE.membershipEnd);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const boxMembershipDaysLeft = calculateDaysLeft();

  // 연속 출석 일수 계산
  const calculateConsecutiveDays = (days: string[]) => {
    if (days.length === 0) return 0;

    const sortedDays = [...days].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let consecutive = 0;
    let currentDate = new Date(today);

    for (let i = 0; i < sortedDays.length; i++) {
      const checkDate = new Date(sortedDays[i]);
      checkDate.setHours(0, 0, 0, 0);

      const dayDiff = Math.floor((currentDate.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24));

      if (dayDiff === 0 || dayDiff === 1) {
        consecutive++;
        currentDate = checkDate;
      } else {
        break;
      }
    }

    return consecutive;
  };

  const [consecutiveDays, setConsecutiveDays] = useState(0);

  useEffect(() => {
    // localStorage에서 출석 데이터 로드, 없으면 더미 데이터 사용
    const data = localStorage.getItem('attendanceDays');
    const loadedDays = data ? JSON.parse(data) : ATTENDANCE_DAYS;
    setAttendanceDays(loadedDays);
    setConsecutiveDays(calculateConsecutiveDays(loadedDays));
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
  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const isAttendanceDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return attendanceDays.includes(dateString);
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

        {/* 연속 출석 */}
        <div className="card card-hover p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-accent-orange/10">
              <Flame className="w-5 h-5 text-accent-orange" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-text-primary">연속 출석</h3>
              <Tooltip content="연속으로 출석한 일수입니다. 하루만 쉬어도 리셋!" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-accent-orange mb-2">{consecutiveDays}</div>
              <p className="text-sm text-text-secondary">일 연속</p>
            </div>
          </div>
          <div className="text-center pt-4 border-t border-light-border">
            <p className="text-xs text-text-tertiary">계속 가세요! 🔥</p>
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
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                  <div key={day} className="text-xs text-center text-text-tertiary font-semibold">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day) => {
                  const date = new Date(2024, 10, day); // 11월
                  const dateString = date.toISOString().split('T')[0];
                  const isAttended = attendanceDays.includes(dateString);

                  return (
                    <div
                      key={day}
                      className={`aspect-square flex items-center justify-center text-xs rounded-lg ${
                        isAttended
                          ? 'bg-primary text-white font-bold'
                          : 'bg-light-bg text-text-tertiary'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-sm text-text-secondary text-center">
                11월 총 {attendanceDays.length}일 출석
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

                    return (
                      <div
                        key={index}
                        className={`aspect-square flex items-center justify-center text-sm rounded-xl font-semibold ${
                          isAttended
                            ? 'bg-primary text-white shadow-md'
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
    </div>
  );
}
