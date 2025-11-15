import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface StrengthData {
  category: string;
  value: number;
  fullMark: number;
}

interface StrengthRadarChartProps {
  data?: StrengthData[];
}

const defaultData: StrengthData[] = [
  { category: '역도', value: 85, fullMark: 100 },
  { category: '체조', value: 70, fullMark: 100 },
  { category: '심폐지구력', value: 90, fullMark: 100 },
  { category: '파워', value: 88, fullMark: 100 },
  { category: '근지구력', value: 75, fullMark: 100 },
  { category: '유연성', value: 65, fullMark: 100 },
];

export default function StrengthRadarChart({ data = defaultData }: StrengthRadarChartProps) {
  return (
    <div className="bg-dark-card rounded-3xl p-6 border border-gray-800/50 hover:border-neon-pink/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">나의 강점 분석</h3>
          <p className="text-sm text-gray-400">육각형 그래프로 보는 내 능력치</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={data}>
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff006e" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#4cc9f0" stopOpacity={0.3} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <PolarGrid
            stroke="#2a2a2a"
            strokeWidth={1.5}
          />

          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: '#ffffff',
              fontSize: 13,
              fontWeight: 600
            }}
            stroke="#3a3a3a"
          />

          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#666', fontSize: 11 }}
            stroke="#2a2a2a"
          />

          <Radar
            name="능력치"
            dataKey="value"
            stroke="#ff006e"
            fill="url(#radarGradient)"
            fillOpacity={0.6}
            strokeWidth={3}
            filter="url(#glow)"
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-pink glow-pink"></div>
          <span className="text-gray-400">현재 수준</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-600"></div>
          <span className="text-gray-400">최대치 (100%)</span>
        </div>
      </div>
    </div>
  );
}
