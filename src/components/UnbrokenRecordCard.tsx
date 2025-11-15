import { Zap, Award } from 'lucide-react';

interface UnbrokenRecord {
  exercise: string;
  count: number;
  date: string;
  isPR: boolean;
}

const unbrokenRecords: UnbrokenRecord[] = [
  { exercise: '바 머슬업', count: 15, date: '2024-11-10', isPR: true },
  { exercise: '풀업', count: 42, date: '2024-11-08', isPR: true },
  { exercise: 'T2B', count: 38, date: '2024-11-05', isPR: false },
  { exercise: '더블언더', count: 125, date: '2024-11-12', isPR: true },
];

export default function UnbrokenRecordCard() {
  return (
    <div className="bg-dark-card rounded-3xl p-6 border border-gray-800/50 hover:border-neon-green/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-neon-green/10 border border-neon-green/30">
          <Zap className="w-6 h-6 text-neon-green" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">언브로큰 기록</h3>
          <p className="text-sm text-gray-400">연속 수행 최고 기록</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {unbrokenRecords.map((record, index) => (
          <div
            key={index}
            className="relative p-4 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:scale-[1.03] transition-all duration-200 overflow-hidden"
          >
            {record.isPR && (
              <div className="absolute top-2 right-2">
                <Award className="w-4 h-4 text-neon-yellow" />
              </div>
            )}

            <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
              {record.exercise}
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold text-neon-green glow-green">
                {record.count}
              </span>
              <span className="text-sm text-gray-500">reps</span>
            </div>

            <div className="text-xs text-gray-600">
              {new Date(record.date).toLocaleDateString('ko-KR')}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">총 언브로큰 종목</span>
          <span className="text-neon-green font-bold">{unbrokenRecords.length}개</span>
        </div>
      </div>
    </div>
  );
}
