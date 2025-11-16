import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface OneRMData {
  date: string;
  snatch: number;
  cleanJerk: number;
}

const data: OneRMData[] = [
  { date: '2024-08', snatch: 75, cleanJerk: 95 },
  { date: '2024-09', snatch: 78, cleanJerk: 98 },
  { date: '2024-10', snatch: 82, cleanJerk: 102 },
  { date: '2024-11', snatch: 85, cleanJerk: 105 },
];

export default function OneRMTrendChart() {
  return (
    <div className="card card-hover p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary-light">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">역도 1RM 추이</h3>
          <p className="text-sm text-text-secondary">최근 4개월 기록 변화</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            style={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: 12 }}
            domain={[60, 120]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="snatch"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7 }}
            name="Snatch"
          />
          <Line
            type="monotone"
            dataKey="cleanJerk"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7 }}
            name="Clean & Jerk"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-primary-light">
          <div className="text-xs text-text-secondary mb-1">Snatch 최근 증가</div>
          <div className="text-2xl font-bold text-primary">+10kg</div>
        </div>
        <div className="p-3 rounded-xl bg-secondary-light">
          <div className="text-xs text-text-secondary mb-1">C&J 최근 증가</div>
          <div className="text-2xl font-bold text-secondary">+7kg</div>
        </div>
      </div>
    </div>
  );
}
