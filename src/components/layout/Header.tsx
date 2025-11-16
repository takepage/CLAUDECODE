import { Bell, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isLive, setIsLive] = useState(false);
  const [liveTime, setLiveTime] = useState(0);

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
      // LIVE 종료 - 운동 시간 저장 로직 추가 가능
      alert(`박스 체류 시간: ${formatTime(liveTime)}`);
    }
    setIsLive(!isLive);
  };

  return (
    <header className="bg-white border-b border-light-border sticky top-0 z-10">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* LIVE 버튼 */}
          <button
            onClick={handleLiveToggle}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${
              isLive
                ? 'bg-accent-red text-white shadow-lg animate-pulse'
                : 'bg-light-bg text-text-secondary hover:bg-light-card-hover'
            }`}
          >
            <Radio className="w-5 h-5" />
            {isLive ? (
              <div className="flex items-center gap-2">
                <span>LIVE</span>
                <span className="text-sm font-mono">{formatTime(liveTime)}</span>
              </div>
            ) : (
              <span>운동 시작</span>
            )}
          </button>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-light-card-hover transition-colors">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
            </button>

            {/* Profile */}
            <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-light-card-hover transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-text-primary">John Doe</div>
                <div className="text-xs text-text-tertiary">운동 156일째</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
