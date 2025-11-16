import { Activity, Calendar, Trophy, Target } from 'lucide-react';

const stats = [
  { icon: Activity, label: '이번 주 운동', value: '5회', color: 'bg-primary-light', textColor: 'text-primary' },
  { icon: Calendar, label: '총 운동 일수', value: '156일', color: 'bg-secondary-light', textColor: 'text-secondary' },
  { icon: Trophy, label: '달성한 PR', value: '23개', color: 'bg-accent-orange/10', textColor: 'text-accent-orange' },
  { icon: Target, label: '평균 운동 시간', value: '65분', color: 'bg-accent-purple/10', textColor: 'text-accent-purple' },
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="card card-hover p-5">
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium uppercase tracking-wide mb-1">
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
