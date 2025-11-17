import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Brain, Award } from 'lucide-react';
import { STRENGTH_ANALYSIS } from '../data/dummyData';

interface StrengthData {
  name: string;
  score: number;
  maxScore: number;
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
  const athleteEmoji = STRENGTH_ANALYSIS.athleteEmoji;
  const topCategory = STRENGTH_ANALYSIS.topCategory;
  const topScore = STRENGTH_ANALYSIS.topScore;

  const aiAnalysis = `데드리프트 206kg의 중량 덕후! 바벨만 잡으면 괴물이 되지만, 링 운동은... 아직 연습 중입니다. Grace 2분 컷의 실력자로 스트렝스(${topScore}/10)가 최강 강점입니다.`;

  // Recharts용 데이터 형식 변환
  const chartData = data.map(item => ({
    category: item.name,
    value: item.score,
    fullMark: item.maxScore
  }));

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
            <RadarChart data={chartData}>
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
        <div className="lg:col-span-1 space-y-4">
          {/* 운동 타입 배지 */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5" />
              <h4 className="font-semibold">선수 유형</h4>
            </div>
            <div className="text-3xl font-bold mt-2 flex items-center gap-2">
              <span>{athleteType}</span>
              <span className="text-4xl">{athleteEmoji}</span>
            </div>
            <div className="text-sm opacity-90 mt-2">
              {topCategory} 특화 • 평균 {averageScore}/10
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
