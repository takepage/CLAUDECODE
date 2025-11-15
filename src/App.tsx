import { Bell, Search, Settings } from 'lucide-react';
import StrengthRadarChart from './components/StrengthRadarChart';
import OneRMCard from './components/OneRMCard';
import UnbrokenRecordCard from './components/UnbrokenRecordCard';
import StatsCard from './components/StatsCard';
import ProfileCard from './components/ProfileCard';
import RecentWODs from './components/RecentWODs';

function App() {
  // 역도 1RM 데이터
  const weightliftingRecords = [
    { name: 'Snatch', weight: 85, unit: 'kg', lastUpdated: '2024-11-10', trend: 5, color: 'pink' as const },
    { name: 'Clean & Jerk', weight: 105, unit: 'kg', lastUpdated: '2024-11-08', trend: 3, color: 'blue' as const },
  ];

  // 3대 운동 1RM 데이터
  const bigThreeRecords = [
    { name: 'Back Squat', weight: 140, unit: 'kg', lastUpdated: '2024-11-12', trend: 7, color: 'green' as const },
    { name: 'Bench Press', weight: 95, unit: 'kg', lastUpdated: '2024-11-05', trend: 2, color: 'orange' as const },
    { name: 'Deadlift', weight: 160, unit: 'kg', lastUpdated: '2024-11-13', trend: 4, color: 'pink' as const },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navigation Bar with Glassmorphism */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-gray-800/50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold">
                <span className="text-gradient-pink">CrossFit</span>
                <span className="text-white"> Tracker</span>
              </h1>

              <div className="hidden md:flex items-center gap-6">
                <button className="px-4 py-2 text-sm font-semibold text-white hover:text-neon-pink transition-colors">
                  대시보드
                </button>
                <button className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                  운동 기록
                </button>
                <button className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                  통계
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="검색..."
                  className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-40"
                />
              </div>

              {/* Icons */}
              <button className="p-2 rounded-full hover:bg-gray-800/50 transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-800/50 transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            안녕하세요, <span className="text-gradient-blue">John</span>님!
          </h2>
          <p className="text-gray-400">오늘도 열심히 운동해봅시다!</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCard />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <ProfileCard />
          </div>

          {/* Middle Column - Radar Chart */}
          <div className="lg:col-span-1">
            <StrengthRadarChart />
          </div>

          {/* Right Column - Unbroken Records */}
          <div className="lg:col-span-1">
            <UnbrokenRecordCard />
          </div>
        </div>

        {/* 1RM Records */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <OneRMCard
            title="역도 1RM"
            subtitle="올림픽 리프팅 최대 중량"
            records={weightliftingRecords}
          />
          <OneRMCard
            title="3대 운동 1RM"
            subtitle="스쿼트, 벤치프레스, 데드리프트"
            records={bigThreeRecords}
          />
        </div>

        {/* Recent WODs */}
        <div className="mb-6">
          <RecentWODs />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 CrossFit Tracker. All rights reserved.</p>
            <p className="mt-2">크로스핏 운동 기록을 체계적으로 관리하세요.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
