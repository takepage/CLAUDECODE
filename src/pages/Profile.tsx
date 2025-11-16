import { User, Save } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-4xl">
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary-light">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">내 프로필 (Athlete Profile)</h2>
            <p className="text-sm text-text-secondary">AI 분석을 위한 기본 데이터를 입력하세요</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">기본 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">키 (cm)</label>
                <input
                  type="number"
                  placeholder="175"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">체중 (kg)</label>
                <input
                  type="number"
                  placeholder="75"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* 스트렝스 1RM */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">스트렝스 1RM</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Back Squat (kg)</label>
                <input
                  type="number"
                  placeholder="140"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Bench Press (kg)</label>
                <input
                  type="number"
                  placeholder="95"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Deadlift (kg)</label>
                <input
                  type="number"
                  placeholder="160"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* 역도 1RM */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">역도 1RM</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Snatch (kg)</label>
                <input
                  type="number"
                  placeholder="85"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Clean & Jerk (kg)</label>
                <input
                  type="number"
                  placeholder="105"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* 짐내스틱 Max Reps */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">짐내스틱 Unbroken Max</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Pull-ups</label>
                <input
                  type="number"
                  placeholder="42"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">T2B</label>
                <input
                  type="number"
                  placeholder="38"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Bar Muscle-ups</label>
                <input
                  type="number"
                  placeholder="15"
                  className="w-full px-4 py-2 rounded-xl border border-light-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end pt-4">
            <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2">
              <Save className="w-5 h-5" />
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
