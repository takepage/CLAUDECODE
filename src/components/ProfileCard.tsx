import { MapPin, Clock, Users } from 'lucide-react';

interface BoxInfo {
  name: string;
  location: string;
  memberSince: string;
  totalMembers: number;
}

const boxInfo: BoxInfo = {
  name: 'CrossFit Seoul',
  location: '서울시 강남구',
  memberSince: '2023.03',
  totalMembers: 120,
};

export default function ProfileCard() {
  return (
    <div className="bg-bg-card rounded-3xl p-6 border border-light-border hover:border-accent-purple/30 transition-all duration-300">
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-pink via-accent-purple to-accent-blue p-1">
            <div className="w-full h-full rounded-full bg-bg-card flex items-center justify-center">
              <span className="text-2xl font-bold text-text-primary">JD</span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-green rounded-full border-2 border-bg-card"></div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-text-primary mb-1">John Doe</h2>
          <p className="text-sm text-text-tertiary">Intermediate Athlete</p>
        </div>
      </div>

      {/* Box Info */}
      <div className="space-y-3 p-4 rounded-2xl bg-light-card border border-light-border">
        <div className="flex items-center justify-between pb-3 border-b border-light-border">
          <span className="text-xs text-text-tertiary uppercase tracking-wide font-semibold">
            현재 박스
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-text-primary mb-3">{boxInfo.name}</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-accent-blue" />
              <span className="text-text-secondary">{boxInfo.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-accent-green" />
              <span className="text-text-secondary">멤버 시작: {boxInfo.memberSince}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-accent-orange" />
              <span className="text-text-secondary">총 {boxInfo.totalMembers}명의 멤버</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center p-3 rounded-xl bg-light-card">
          <div className="text-2xl font-bold text-accent-pink">156</div>
          <div className="text-xs text-text-tertiary mt-1">총 WOD</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-light-card">
          <div className="text-2xl font-bold text-accent-blue">23</div>
          <div className="text-xs text-text-tertiary mt-1">PR 기록</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-light-card">
          <div className="text-2xl font-bold text-accent-green">245</div>
          <div className="text-xs text-text-tertiary mt-1">운동 시간</div>
        </div>
      </div>
    </div>
  );
}
