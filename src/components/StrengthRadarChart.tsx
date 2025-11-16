import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Brain } from 'lucide-react';

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
  // AI 분석 코멘트 (실제로는 AI API에서 가져옴)
  const aiAnalysis = "스트렝스(역도, 파워)는 우수하나, 체조와 유연성이 상대적으로 부족합니다. 짐내스틱 움직임(Gymnastics) 강화 트레이닝을 추천합니다.";

  return (
    <div className="card card-hover p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-text-primary mb-1">강점/약점 분석</h3>
        <p className="text-sm text-text-secondary">육각형 그래프로 보는 내 능력치</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={data}>
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <PolarGrid
                stroke="#E5E7EB"
                strokeWidth={1}
              />

              <PolarAngleAxis
                dataKey="category"
                tick={{
                  fill: '#6B7280',
                  fontSize: 13,
                  fontWeight: 600
                }}
                stroke="#D1D5DB"
              />

              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                stroke="#E5E7EB"
              />

              <Radar
                name="능력치"
                dataKey="value"
                stroke="#10B981"
                fill="url(#radarGradient)"
                fillOpacity={0.6}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>

          <div className="mt-4 flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-text-secondary">현재 수준</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-text-secondary">최대치 (100%)</span>
            </div>
          </div>
        </div>

        {/* AI Analysis Comment */}
        <div className="lg:col-span-1">
          <div className="p-5 rounded-xl bg-secondary-light border border-secondary/20 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-secondary" />
              <h4 className="font-semibold text-text-primary">AI 분석</h4>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed flex-1">
              {aiAnalysis}
            </p>

            <div className="mt-4 pt-4 border-t border-secondary/20">
              <div className="text-xs text-text-tertiary">
                마지막 업데이트: 2024-11-15
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
