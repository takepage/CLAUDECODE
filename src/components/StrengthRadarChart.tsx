import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Brain, Award } from 'lucide-react';

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
  { category: '스트렝스', value: 88, fullMark: 100 },
  { category: '머신', value: 90, fullMark: 100 },
  { category: '짐네스틱', value: 70, fullMark: 100 },
  { category: '심폐지구력', value: 92, fullMark: 100 },
  { category: '근지구력', value: 75, fullMark: 100 },
];

export default function StrengthRadarChart({ data = defaultData }: StrengthRadarChartProps) {
  // 가장 높은 점수의 카테고리 찾기
  const topCategory = data.reduce((max, item) =>
    item.value > max.value ? item : max, data[0]
  );

  const athleteType = `${topCategory.category}형`;

  const aiAnalysis = `당신은 ${athleteType} 애슬릿입니다. ${topCategory.category} 능력이 뛰어나며(${topCategory.value}점), 짐네스틱 영역을 보완하면 균형잡힌 크로스핏터가 될 수 있습니다.`;

  return (
    <div className="card card-hover p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-text-primary mb-1">강점/약점 분석</h3>
        <p className="text-sm text-text-secondary">6가지 영역으로 보는 내 능력치</p>
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
        <div className="lg:col-span-1 space-y-4">
          {/* 운동 타입 배지 */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5" />
              <h4 className="font-semibold">운동 타입</h4>
            </div>
            <div className="text-3xl font-bold mt-2">{athleteType}</div>
            <div className="text-sm opacity-90 mt-1">
              {topCategory.category} 특화 애슬릿
            </div>
          </div>

          {/* AI 분석 */}
          <div className="p-5 rounded-xl bg-secondary-light border border-secondary/20 flex flex-col">
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
