import AIWODStrategy from '../components/AIWODStrategy';
import QuickStats from '../components/QuickStats';
import StrengthRadarChart from '../components/StrengthRadarChart';
import OneRMTrendChart from '../components/OneRMTrendChart';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* AI WOD Strategy - 최상단 */}
      <AIWODStrategy />

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
