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
    <div className="bg-bg-card rounded-3xl p-6 border border-light-border hover:border-accent-green/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-accent-green/10 border border-accent-green/30">
          <Zap className="w-6 h-6 text-accent-green" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">언브로큰 기록</h3>
          <p className="text-sm text-text-tertiary">연속 수행 최고 기록</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {unbrokenRecords.map((record, index) => (
          <div
            key={index}
            className="relative p-4 rounded-2xl bg-light-card border border-light-border hover:scale-[1.03] transition-all duration-200 overflow-hidden"
          >
            {record.isPR && (
              <div className="absolute top-2 right-2">
                <Award className="w-4 h-4 text-warning" />
              </div>
            )}

            <div className="text-xs font-semibold text-text-tertiary mb-2 uppercase tracking-wide">
              {record.exercise}
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold text-accent-green">
                {record.count}
              </span>
              <span className="text-sm text-text-tertiary">reps</span>
            </div>

            <div className="text-xs text-text-tertiary">
              {new Date(record.date).toLocaleDateString('ko-KR')}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-light-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-tertiary">총 언브로큰 종목</span>
          <span className="text-accent-green font-bold">{unbrokenRecords.length}개</span>
        </div>
      </div>
    </div>
  );
}
