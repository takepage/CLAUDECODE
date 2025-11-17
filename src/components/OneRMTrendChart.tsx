import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { WEIGHT_TREND, DEADLIFT_1RM_TREND } from '../data/dummyData';
import TooltipComponent from './Tooltip';

type TrendType = 'weight' | 'deadlift';

export default function OneRMTrendChart() {
  const [selectedTrend, setSelectedTrend] = useState<TrendType>('weight');

  // 체중 추이 데이터
  const weightData = WEIGHT_TREND.map(item => ({
    date: item.date.slice(5), // "2024-10-17" → "10-17"
    value: item.weight,
    label: '체중'
  }));

  // 데드리프트 1RM 추이 데이터
  const deadliftData = DEADLIFT_1RM_TREND.map(item => ({
    date: item.date.slice(5),
    value: item.weight,
    label: 'Deadlift'
  }));

  const chartData = selectedTrend === 'weight' ? weightData : deadliftData;

  // 증감 계산
  const calculateChange = () => {
    if (chartData.length < 2) return { change: 0, isPositive: true };
    const first = chartData[0].value;
    const last = chartData[chartData.length - 1].value;
    const change = last - first;

    if (selectedTrend === 'weight') {
      // 체중은 감소가 좋음 (다이어트 중)
      return { change: Math.abs(change), isPositive: change < 0 };
    } else {
      // 1RM은 증가가 좋음
      return { change, isPositive: change > 0 };
    }
  };

  const { change, isPositive } = calculateChange();

  return (
    <div className="card card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary-light">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-xl font-bold text-text-primary">추이 분석</h3>
              <p className="text-sm text-text-secondary">최근 3개월 변화</p>
            </div>
            <TooltipComponent content="탭을 클릭하여 다른 지표를 확인하세요" />
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex gap-2 bg-light-bg p-1 rounded-xl">
          <button
            onClick={() => setSelectedTrend('weight')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedTrend === 'weight'
                ? 'bg-white text-primary shadow-md'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            체중
          </button>
          <button
            onClick={() => setSelectedTrend('deadlift')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedTrend === 'deadlift'
                ? 'bg-white text-primary shadow-md'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            Deadlift 1RM
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            style={{ fontSize: 12, fontWeight: 500 }}
            tickMargin={10}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: 12, fontWeight: 500 }}
            tickMargin={10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              padding: '12px',
            }}
            labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 6, stroke: '#fff' }}
            activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 3 }}
            name={selectedTrend === 'weight' ? '체중 (kg)' : 'Deadlift (kg)'}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl ${isPositive ? 'bg-primary-light' : 'bg-accent-orange/10'}`}>
          <div className="text-xs text-text-secondary mb-1 font-semibold">
            {selectedTrend === 'weight' ? '3개월 변화' : '6개월 성장'}
          </div>
          <div className={`text-3xl font-bold ${isPositive ? 'text-primary' : 'text-accent-orange'}`}>
            {isPositive ? '+' : ''}{change.toFixed(1)}kg
          </div>
          <div className="text-xs text-text-tertiary mt-1">
            {selectedTrend === 'weight'
              ? (isPositive ? '✅ 감량 성공!' : '⚠️ 증량 중')
              : (isPositive ? '🔥 기록 갱신!' : '📊 유지 중')}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-secondary-light">
          <div className="text-xs text-text-secondary mb-1 font-semibold">현재</div>
          <div className="text-3xl font-bold text-secondary">
            {chartData[chartData.length - 1]?.value.toFixed(1)}kg
          </div>
          <div className="text-xs text-text-tertiary mt-1">
            {selectedTrend === 'weight' ? '목표: 95kg' : '목표: 220kg'}
          </div>
        </div>
      </div>
    </div>
  );
}
