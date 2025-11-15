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
    <div className="bg-dark-card rounded-3xl p-6 border border-gray-800/50 hover:border-neon-purple/30 transition-all duration-300">
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-pink via-neon-purple to-neon-blue p-1">
            <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center">
              <span className="text-2xl font-bold text-white">JD</span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-neon-green rounded-full border-2 border-dark-card"></div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">John Doe</h2>
          <p className="text-sm text-gray-400">Intermediate Athlete</p>
        </div>
      </div>

      {/* Box Info */}
      <div className="space-y-3 p-4 rounded-2xl glass-effect border border-gray-700/50">
        <div className="flex items-center justify-between pb-3 border-b border-gray-700/50">
          <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
            현재 박스
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-3">{boxInfo.name}</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-neon-blue" />
              <span className="text-gray-300">{boxInfo.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-neon-green" />
              <span className="text-gray-300">멤버 시작: {boxInfo.memberSince}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-neon-orange" />
              <span className="text-gray-300">총 {boxInfo.totalMembers}명의 멤버</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center p-3 rounded-xl bg-gray-800/30">
          <div className="text-2xl font-bold text-neon-pink">156</div>
          <div className="text-xs text-gray-500 mt-1">총 WOD</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-gray-800/30">
          <div className="text-2xl font-bold text-neon-blue">23</div>
          <div className="text-xs text-gray-500 mt-1">PR 기록</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-gray-800/30">
          <div className="text-2xl font-bold text-neon-green">245</div>
          <div className="text-xs text-gray-500 mt-1">운동 시간</div>
        </div>
      </div>
    </div>
  );
}
