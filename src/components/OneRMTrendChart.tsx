import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import {
  WEIGHT_TREND,
  DEADLIFT_1RM_TREND,
  CLEAN_AND_JERK_1RM_TREND,
  SNATCH_1RM_TREND,
  BACK_SQUAT_1RM_TREND,
  SHOULDER_PRESS_1RM_TREND
} from '../data/dummyData';
import TooltipComponent from './Tooltip';

type TrendType = 'weight' | 'weightlifting' | 'big3';

export default function OneRMTrendChart() {
  const [selectedTrend, setSelectedTrend] = useState<TrendType>('weight');

  // 체중 추이 데이터
  const weightData = WEIGHT_TREND.map(item => ({
    date: item.date.slice(5), // "2024-10-17" → "10-17"
    체중: item.weight
  }));

  // 역도 1RM 추이 데이터 (Clean & Jerk, Snatch)
  const weightliftingData = (() => {
    const dateMap = new Map<string, any>();

    CLEAN_AND_JERK_1RM_TREND.forEach(item => {
      const date = item.date.slice(5);
      dateMap.set(date, { ...dateMap.get(date), date, 'Clean & Jerk': item.weight });
    });

    SNATCH_1RM_TREND.forEach(item => {
      const date = item.date.slice(5);
      dateMap.set(date, { ...dateMap.get(date), date, 'Snatch': item.weight });
    });

    return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  })();

  // 3대 1RM 추이 데이터 (Deadlift, Back Squat, Shoulder Press)
  const big3Data = (() => {
    const dateMap = new Map<string, any>();

    DEADLIFT_1RM_TREND.forEach(item => {
      const date = item.date.slice(5);
      dateMap.set(date, { ...dateMap.get(date), date, 'Deadlift': item.weight });
    });

    BACK_SQUAT_1RM_TREND.forEach(item => {
      const date = item.date.slice(5);
      dateMap.set(date, { ...dateMap.get(date), date, 'Back Squat': item.weight });
    });

    SHOULDER_PRESS_1RM_TREND.forEach(item => {
      const date = item.date.slice(5);
      dateMap.set(date, { ...dateMap.get(date), date, 'Shoulder Press': item.weight });
    });

    return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  })();

  const chartData = selectedTrend === 'weight' ? weightData : selectedTrend === 'weightlifting' ? weightliftingData : big3Data;

  // 증감 계산 (체중만)
  const calculateWeightChange = () => {
    if (chartData.length < 2) return { change: 0, isPositive: true };
    if (selectedTrend === 'weight') {
      const first = chartData[0].체중;
      const last = chartData[chartData.length - 1].체중;
      const change = last - first;
      // 체중은 감소가 좋음 (다이어트 중)
      return { change: Math.abs(change), isPositive: change < 0, current: last };
    }
    return { change: 0, isPositive: true, current: 0 };
  };

  const weightChangeData = calculateWeightChange();

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
              <p className="text-sm text-text-secondary">2024.11.17부터 기록 중</p>
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
            onClick={() => setSelectedTrend('weightlifting')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedTrend === 'weightlifting'
                ? 'bg-white text-primary shadow-md'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            역도 1RM
          </button>
          <button
            onClick={() => setSelectedTrend('big3')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedTrend === 'big3'
                ? 'bg-white text-primary shadow-md'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            3대 1RM
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="lineGradient1" x1="0" y1="0" x2="1" y2="0">
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

          {selectedTrend === 'weight' && (
            <Line
              type="monotone"
              dataKey="체중"
              stroke="url(#lineGradient1)"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 6, stroke: '#fff' }}
              activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 3 }}
              name="체중 (kg)"
            />
          )}

          {selectedTrend === 'weightlifting' && (
            <>
              <Line
                type="monotone"
                dataKey="Clean & Jerk"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6, stroke: '#fff' }}
                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 3 }}
                name="Clean & Jerk (kg)"
              />
              <Line
                type="monotone"
                dataKey="Snatch"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6, stroke: '#fff' }}
                activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 3 }}
                name="Snatch (kg)"
              />
            </>
          )}

          {selectedTrend === 'big3' && (
            <>
              <Line
                type="monotone"
                dataKey="Deadlift"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6, stroke: '#fff' }}
                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 3 }}
                name="Deadlift (kg)"
              />
              <Line
                type="monotone"
                dataKey="Back Squat"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6, stroke: '#fff' }}
                activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 3 }}
                name="Back Squat (kg)"
              />
              <Line
                type="monotone"
                dataKey="Shoulder Press"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6, stroke: '#fff' }}
                activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 3 }}
                name="Shoulder Press (kg)"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>

      {selectedTrend === 'weight' && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl ${weightChangeData.isPositive ? 'bg-primary-light' : 'bg-accent-orange/10'}`}>
            <div className="text-xs text-text-secondary mb-1 font-semibold">2개월 변화</div>
            <div className={`text-3xl font-bold ${weightChangeData.isPositive ? 'text-primary' : 'text-accent-orange'}`}>
              {weightChangeData.isPositive ? '-' : '+'}{weightChangeData.change.toFixed(1)}kg
            </div>
            <div className="text-xs text-text-tertiary mt-1">
              {weightChangeData.isPositive ? '✅ 감량 성공!' : '⚠️ 증량 중'}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-secondary-light">
            <div className="text-xs text-text-secondary mb-1 font-semibold">현재</div>
            <div className="text-3xl font-bold text-secondary">
              {weightChangeData.current.toFixed(1)}kg
            </div>
            <div className="text-xs text-text-tertiary mt-1">목표: 95kg</div>
          </div>
        </div>
      )}

      {selectedTrend !== 'weight' && (
        <div className="mt-6 p-4 rounded-xl bg-light-bg text-center">
          <p className="text-sm text-text-secondary">
            {selectedTrend === 'weightlifting'
              ? '🏋️ 역도 1RM 추이를 확인하세요. Clean & Jerk와 Snatch의 발전 과정을 한눈에!'
              : '💪 크로스핏 3대 운동의 추이를 확인하세요. Deadlift, Squat, Shoulder Press!'}
          </p>
        </div>
      )}
    </div>
  );
}
