import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Award } from 'lucide-react';
import { STRENGTH_ANALYSIS } from '../data/dummyData';

interface StrengthData {
  name: string;
  score: number;
  maxScore: number;
  factors?: string[];
}

interface StrengthRadarChartProps {
  data?: StrengthData[];
}

// 0-10점 스케일로 변경
const defaultData: StrengthData[] = STRENGTH_ANALYSIS.categories;

export default function StrengthRadarChart({ data = defaultData }: StrengthRadarChartProps) {
  // 평균 점수 계산
  const averageScore = (data.reduce((sum, item) => sum + item.score, 0) / data.length).toFixed(1);

  // 선수 유형 정보
  const athleteType = STRENGTH_ANALYSIS.athleteType;
  const topCategory = STRENGTH_ANALYSIS.topCategory;
  const typeExplanation = STRENGTH_ANALYSIS.typeExplanation;

  // Recharts용 데이터 형식 변환
  const chartData = data.map(item => ({
    category: item.name,
    value: item.score,
    fullMark: item.maxScore,
    factors: item.factors || []
  }));

  // 커스텀 툴팁 컴포넌트
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-light-border max-w-xs">
          <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
            {data.category}
            <span className="text-primary">{data.value}/10</span>
          </h4>
          <div className="text-xs text-text-secondary space-y-1">
            <p className="font-semibold text-text-primary mb-1">주요 기여 요소:</p>
            {data.factors && data.factors.length > 0 ? (
              data.factors.map((factor: string, index: number) => (
                <p key={index} className="leading-relaxed">• {factor}</p>
              ))
            ) : (
              <p className="text-text-tertiary italic">데이터 없음</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-1">퍼포먼스 그래프</h3>
          <p className="text-sm text-text-secondary">6가지 영역으로 보는 내 능력치</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-2 h-[280px] md:h-[350px]" style={{ outline: 'none' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} style={{ outline: 'none' }}>
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
                domain={[0, 10]}
                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                stroke="#E5E7EB"
              />

              <Tooltip content={<CustomTooltip />} />

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
              <span className="text-text-secondary">현재 수준 (평균 {averageScore}/10)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-text-secondary">최대치 (10점)</span>
            </div>
          </div>
        </div>

        {/* AI Analysis Comment */}
        <div className="lg:col-span-1 flex items-stretch">
          {/* 운동 타입 배지 */}
          <div className="p-6 md:p-8 rounded-xl bg-primary text-white w-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 md:w-5 md:h-5" />
                <h4 className="text-sm md:text-base font-semibold">선수 유형</h4>
              </div>
              <div className="text-xl md:text-2xl font-bold mt-3">
                {athleteType}
              </div>
              <div className="text-xs md:text-sm opacity-90 mt-3 md:mt-4 leading-relaxed">
                {typeExplanation}
              </div>
            </div>
            <div className="text-xs md:text-sm opacity-80 pt-3 md:pt-4 border-t border-white/20 mt-4 md:mt-6">
              {topCategory} 특화 • 평균 {averageScore}/10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
