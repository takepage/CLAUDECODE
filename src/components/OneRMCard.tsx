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
    bg: 'bg-neon-pink/10',
    border: 'border-neon-pink/30',
    text: 'text-neon-pink',
    glow: 'glow-pink',
  },
  blue: {
    bg: 'bg-neon-blue/10',
    border: 'border-neon-blue/30',
    text: 'text-neon-blue',
    glow: 'glow-blue',
  },
  green: {
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/30',
    text: 'text-neon-green',
    glow: 'glow-green',
  },
  orange: {
    bg: 'bg-neon-orange/10',
    border: 'border-neon-orange/30',
    text: 'text-neon-orange',
    glow: 'glow-orange',
  },
};

export default function OneRMCard({ title, subtitle, records }: OneRMCardProps) {
  return (
    <div className="bg-dark-card rounded-3xl p-6 border border-gray-800/50 hover:border-neon-blue/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-neon-blue/10 border border-neon-blue/30">
          <Dumbbell className="w-6 h-6 text-neon-blue" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
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
                <span className="text-sm font-semibold text-gray-300">{record.name}</span>
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
                    <span className={`text-4xl font-bold ${colors.text} ${colors.glow}`}>
                      {record.weight}
                    </span>
                    <span className="text-lg text-gray-400 font-medium">{record.unit}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
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
