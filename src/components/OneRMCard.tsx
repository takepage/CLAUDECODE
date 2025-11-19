import { TrendingUp, Dumbbell } from 'lucide-react';

interface OneRMRecord {
  name: string;
  weight: number;
  unit: string;
  lastUpdated: string;
  trend: number; // percentage change
  color: 'pink' | 'blue' | 'green' | 'orange';
}

interface OneRMCardProps {
  title: string;
  subtitle: string;
  records: OneRMRecord[];
}

const colorClasses = {
  pink: {
    bg: 'bg-accent-pink/10',
    border: 'border-accent-pink/30',
    text: 'text-accent-pink',
  },
  blue: {
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue/30',
    text: 'text-accent-blue',
  },
  green: {
    bg: 'bg-accent-green/10',
    border: 'border-accent-green/30',
    text: 'text-accent-green',
  },
  orange: {
    bg: 'bg-accent-orange/10',
    border: 'border-accent-orange/30',
    text: 'text-accent-orange',
  },
};

export default function OneRMCard({ title, subtitle, records }: OneRMCardProps) {
  return (
    <div className="bg-bg-card rounded-3xl p-6 border border-light-border hover:border-accent-blue/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-accent-blue/10 border border-accent-blue/30">
          <Dumbbell className="w-6 h-6 text-accent-blue" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">{title}</h3>
          <p className="text-sm text-text-tertiary">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-4">
        {records.map((record, index) => {
          const colors = colorClasses[record.color];
          return (
            <div
              key={index}
              className={`p-4 rounded-2xl ${colors.bg} border ${colors.border} hover:scale-[1.02] transition-transform duration-200`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-text-secondary">{record.name}</span>
                {record.trend > 0 && (
                  <div className={`flex items-center gap-1 text-xs ${colors.text}`}>
                    <TrendingUp className="w-3 h-3" />
                    <span>+{record.trend}%</span>
                  </div>
                )}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold ${colors.text}`}>
                      {record.weight}
                    </span>
                    <span className="text-lg text-text-tertiary font-medium">{record.unit}</span>
                  </div>
                </div>
                <div className="text-xs text-text-tertiary">
                  {record.lastUpdated}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
