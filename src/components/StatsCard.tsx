import { Activity, Calendar, Trophy, Target } from 'lucide-react';

interface StatItem {
  icon: 'activity' | 'calendar' | 'trophy' | 'target';
  label: string;
  value: string | number;
  color: 'pink' | 'blue' | 'green' | 'orange';
}

const icons = {
  activity: Activity,
  calendar: Calendar,
  trophy: Trophy,
  target: Target,
};

const colorClasses = {
  pink: {
    bg: 'bg-neon-pink/10',
    border: 'border-neon-pink/30',
    text: 'text-neon-pink',
    iconBg: 'bg-neon-pink/20',
  },
  blue: {
    bg: 'bg-neon-blue/10',
    border: 'border-neon-blue/30',
    text: 'text-neon-blue',
    iconBg: 'bg-neon-blue/20',
  },
  green: {
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/30',
    text: 'text-neon-green',
    iconBg: 'bg-neon-green/20',
  },
  orange: {
    bg: 'bg-neon-orange/10',
    border: 'border-neon-orange/30',
    text: 'text-neon-orange',
    iconBg: 'bg-neon-orange/20',
  },
};

const stats: StatItem[] = [
  { icon: 'activity', label: '이번 주 운동', value: '5회', color: 'pink' },
  { icon: 'calendar', label: '총 운동 일수', value: '156일', color: 'blue' },
  { icon: 'trophy', label: '달성한 PR', value: '23개', color: 'green' },
  { icon: 'target', label: '평균 운동 시간', value: '65분', color: 'orange' },
];

export default function StatsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = icons[stat.icon];
        const colors = colorClasses[stat.color];

        return (
          <div
            key={index}
            className={`bg-dark-card rounded-3xl p-5 border ${colors.border} hover:scale-[1.03] transition-all duration-200`}
          >
            <div className={`w-12 h-12 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${colors.text}`}>
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
