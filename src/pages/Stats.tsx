import { BarChart3 } from 'lucide-react';

export default function Stats() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-secondary-light">
          <BarChart3 className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">통계</h2>
          <p className="text-sm text-text-secondary">나의 운동 데이터를 분석하세요</p>
        </div>
      </div>

      <div className="card p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-10 h-10 text-secondary" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">통계 페이지 준비 중</h3>
          <p className="text-text-secondary">
            월별, 연도별 운동 통계 및 분석 기능이 곧 추가됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
