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

type TrendType = 'weight' | 'weightlifting' | 'big3';

export default function OneRMTrendChart() {
  const [selectedTrend, setSelectedTrend] = useState<TrendType>('weight');

  // 체중 추이 데이터 (lb로 변환)
  const weightData = WEIGHT_TREND.map(item => ({
    date: item.date.slice(5), // "2024-10-17" → "10-17"
    체중: (item.weight * 2.20462).toFixed(1) // kg를 lb로 변환
  }));

  // 역도 1RM 추이 데이터 (lb로 변환)
  const weightliftingData = (() => {
    const dateMap = new Map<string, any>();

    CLEAN_AND_JERK_1RM_TREND.forEach(item => {
      const date = item.date.slice(5);
      dateMap.set(date, { ...dateMap.get(date), date, 'Clean & Jerk': (item.weight * 2.20462).toFixed(1) });
    });

    SNATCH_1RM_TREND.forEach(item => {
      const date = item.date.slice(5);
      dateMap.set(date, { ...dateMap.get(date), date, 'Snatch': (item.weight * 2.20462).toFixed(1) });
    });

    return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  })();

  // 3대 1RM 추이 데이터 (lb로 변환)
  const big3Data = (() => {
    const dateMap = new Map<string, any>();

    DEADLIFT_1RM_TREND.forEach(item => {
      const date = item.date.slice(5);
      dateMap.set(date, { ...dateMap.get(date), date, 'Deadlift': (item.weight * 2.20462).toFixed(1) });
    });

    BACK_SQUAT_1RM_TREND.forEach(item => {
      const date = item.date.slice(5);
      dateMap.set(date, { ...dateMap.get(date), date, 'Back Squat': (item.weight * 2.20462).toFixed(1) });
    });

    SHOULDER_PRESS_1RM_TREND.forEach(item => {
      const date = item.date.slice(5);
      dateMap.set(date, { ...dateMap.get(date), date, 'Shoulder Press': (item.weight * 2.20462).toFixed(1) });
    });

    return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  })();

  const chartData = selectedTrend === 'weight' ? weightData : selectedTrend === 'weightlifting' ? weightliftingData : big3Data;

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary-light">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">타임라인</h3>
            <p className="text-sm text-text-secondary">2024.11.17부터 기록 중</p>
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
              name="체중 (lb)"
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
                name="Clean & Jerk (lb)"
              />
              <Line
                type="monotone"
                dataKey="Snatch"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6, stroke: '#fff' }}
                activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 3 }}
                name="Snatch (lb)"
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
                name="Deadlift (lb)"
              />
              <Line
                type="monotone"
                dataKey="Back Squat"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6, stroke: '#fff' }}
                activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 3 }}
                name="Back Squat (lb)"
              />
              <Line
                type="monotone"
                dataKey="Shoulder Press"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6, stroke: '#fff' }}
                activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 3 }}
                name="Shoulder Press (lb)"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>

      {selectedTrend === 'weight' && (
        <div className="mt-6 p-4 rounded-xl bg-light-bg text-center">
          <p className="text-sm text-text-secondary">
            체중 변화를 확인하세요. Deadlift, Squat, Shoulder Press 기록도 확인해보세요!
          </p>
        </div>
      )}

      {selectedTrend !== 'weight' && (
        <div className="mt-6 p-4 rounded-xl bg-light-bg text-center">
          <p className="text-sm text-text-secondary">
            {selectedTrend === 'weightlifting'
              ? '역도 1RM 변화를 확인하세요. Clean & Jerk와 Snatch의 발전 과정을 한눈에!'
              : '크로스핏 3대 운동 변화를 확인하세요. Deadlift, Squat, Shoulder Press!'}
          </p>
        </div>
      )}
    </div>
  );
}
