import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Clock, Flame } from 'lucide-react';

interface WOD {
  date: string;
  name: string;
  time: string;
  intensity: 'high' | 'medium' | 'low';
  type: string;
}

const recentWODs: WOD[] = [
  { date: '2024-11-15', name: 'Fran', time: '4:32', intensity: 'high', type: 'For Time' },
  { date: '2024-11-13', name: 'Murph', time: '42:15', intensity: 'high', type: 'For Time' },
  { date: '2024-11-11', name: 'Cindy', time: '20 Rounds', intensity: 'medium', type: 'AMRAP' },
  { date: '2024-11-09', name: 'Grace', time: '3:45', intensity: 'high', type: 'For Time' },
];

const performanceData = [
  { date: '11/01', score: 75 },
  { date: '11/05', score: 82 },
  { date: '11/09', score: 78 },
  { date: '11/13', score: 88 },
  { date: '11/15', score: 92 },
];

const intensityColors = {
  high: 'text-neon-pink',
  medium: 'text-neon-orange',
  low: 'text-neon-green',
};

const intensityBgColors = {
  high: 'bg-neon-pink/10 border-neon-pink/30',
  medium: 'bg-neon-orange/10 border-neon-orange/30',
  low: 'bg-neon-green/10 border-neon-green/30',
};

export default function RecentWODs() {
  return (
    <div className="bg-dark-card rounded-3xl p-6 border border-gray-800/50 hover:border-neon-cyan/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">최근 운동 기록</h3>
          <p className="text-sm text-gray-400">지난 2주간의 WOD</p>
        </div>
        <div className="px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30">
          <span className="text-sm font-semibold text-neon-cyan">4 WODs</span>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="mb-6 p-4 rounded-2xl bg-gray-800/30">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-neon-pink" />
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
            퍼포먼스 트렌드
          </span>
        </div>

        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={performanceData}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff006e" />
                <stop offset="50%" stopColor="#4cc9f0" />
                <stop offset="100%" stopColor="#06ffa5" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#666"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#666"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={[60, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ fill: '#ff006e', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#4cc9f0' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* WOD List */}
      <div className="space-y-3">
        {recentWODs.map((wod, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-bold text-white">{wod.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${intensityBgColors[wod.intensity]} ${intensityColors[wod.intensity]}`}>
                    {wod.type}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(wod.date).toLocaleDateString('ko-KR')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className={`text-lg font-bold ${intensityColors[wod.intensity]}`}>
                  {wod.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
