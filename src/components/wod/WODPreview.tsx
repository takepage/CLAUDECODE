import { Sparkles } from 'lucide-react';
import type { Section } from '../../types/wod';

interface WODPreviewProps {
  sections: Section[];
  generateWODText: () => string;
}

export default function WODPreview({ sections, generateWODText }: WODPreviewProps) {
  return (
    <div className="space-y-6">
      {/* WOD 미리보기 */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">WOD 미리보기</h3>
        {sections.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-text-tertiary text-sm">WOD를 구성하면 여기에 표시됩니다</p>
          </div>
        ) : (
          <pre className="text-sm text-text-primary whitespace-pre-wrap bg-light-bg p-4 rounded-xl border border-light-border font-sans">
            {generateWODText()}
          </pre>
        )}
      </div>

      {/* AI 분석 버튼 */}
      {sections.length > 0 && (
        <button className="w-full px-6 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 shadow-md">
          <Sparkles className="w-5 h-5" />
          AI 전략 분석하기
        </button>
      )}
    </div>
  );
}
