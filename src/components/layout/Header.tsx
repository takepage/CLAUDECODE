import { Bell, Radio, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import Tooltip from '../Tooltip';
import QuickWorkoutLogModal from '../QuickWorkoutLogModal';
import type { WorkoutLogData } from '../QuickWorkoutLogModal';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isLive, setIsLive] = useState(false);
  const [liveTime, setLiveTime] = useState(0);
  const [showWorkoutLogModal, setShowWorkoutLogModal] = useState(false);
  const [savedDuration, setSavedDuration] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isLive) {
      interval = window.setInterval(() => {
        setLiveTime((prev) => prev + 1);
      }, 1000);
    } else {
      setLiveTime(0);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLiveToggle = () => {
    if (isLive) {
      // LIVE 종료 - 운동 기록 모달 표시
      setSavedDuration(liveTime);
      setShowWorkoutLogModal(true);
      setIsLive(false);
    } else {
      // LIVE 시작
      setIsLive(true);
    }
  };

  const handleWorkoutSave = (data: WorkoutLogData) => {
    const today = new Date().toISOString().split('T')[0];

    // 운동 상세 정보 저장 (workoutHistory)
    const workoutData = {
      date: today,
      duration: savedDuration,
      timestamp: Date.now(),
      ...data
    };

    const existingData = localStorage.getItem('workoutHistory');
    const workoutHistory = existingData ? JSON.parse(existingData) : [];
    workoutHistory.push(workoutData);
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));

    // 운동 기록 로그 생성 (workoutLogs) - 나중에 Logbook 페이지와 캘린더에서 사용
    const workoutLog = {
      id: `wod-${Date.now()}`,
      date: today,
      wodName: data.wodName,
      wodType: 'CUSTOM', // 사용자가 직접 기록
      classType: data.classType,
      categories: data.categories,
      duration: savedDuration,
      feeling: data.feeling,
      notes: data.notes,
      rxd: true, // 기본값
      timestamp: Date.now()
    };

    const existingLogs = localStorage.getItem('workoutLogs');
    const workoutLogs = existingLogs ? JSON.parse(existingLogs) : [];
    workoutLogs.unshift(workoutLog); // 최신 기록이 앞에 오도록
    localStorage.setItem('workoutLogs', JSON.stringify(workoutLogs));

    // 출석 날짜 저장
    const attendanceData = localStorage.getItem('attendanceDays');
    const attendanceDays = attendanceData ? JSON.parse(attendanceData) : [];
    if (!attendanceDays.includes(today)) {
      attendanceDays.push(today);
      localStorage.setItem('attendanceDays', JSON.stringify(attendanceDays));
    }

    // 성공 메시지
    alert(`✅ 운동 기록 완료!\n박스 체류 시간: ${formatTime(savedDuration)}\n출석 및 운동 기록이 자동으로 저장되었습니다.`);
  };

  return (
    <header className="bg-bg-card border-b border-light-border sticky top-0 z-30">
      <div className="px-4 md:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Left Section */}
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            {/* Hamburger Menu (Mobile Only) */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-light-card-hover transition-colors flex-shrink-0"
              aria-label="메뉴 열기"
            >
              <Menu className="w-6 h-6 text-text-secondary" />
            </button>

            {/* LIVE Button */}
            <button
              onClick={handleLiveToggle}
              className={`flex items-center gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base min-w-0 flex-shrink ${
                isLive
                  ? 'bg-danger text-white shadow-lg animate-pulse'
                  : 'bg-primary text-white hover:shadow-md active:scale-95'
              }`}
            >
              <Radio className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              {isLive ? (
                <div className="flex items-center gap-1 md:gap-2 min-w-0">
                  <span className="hidden sm:inline">LIVE</span>
                  <span className="text-xs md:text-sm font-mono truncate">{formatTime(liveTime)}</span>
                </div>
              ) : (
                <span className="hidden sm:inline">운동 시작</span>
              )}
            </button>

            <div className="hidden md:block">
              <Tooltip content="클릭하면 운동 시작! 다시 클릭하면 종료 후 자동으로 출석 체크됩니다." />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Notifications */}
            <div className="relative">
              <button
                className="relative p-2 rounded-xl hover:bg-light-card-hover transition-colors"
                aria-label="알림"
              >
                <Bell className="w-5 h-5 text-text-secondary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
              </button>
            </div>

            {/* Profile */}
            <button className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 rounded-xl hover:bg-light-card-hover transition-colors">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-sm font-semibold text-text-primary">John Doe</div>
                <div className="text-xs text-text-tertiary">운동 156일째</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 운동 기록 모달 */}
      <QuickWorkoutLogModal
        isOpen={showWorkoutLogModal}
        onClose={() => setShowWorkoutLogModal(false)}
        onSave={handleWorkoutSave}
        duration={savedDuration}
      />
    </header>
  );
}
