import { useState } from 'react';
import { Sparkles, TrendingUp, AlertCircle, Target } from 'lucide-react';

export default function AIWODStrategy() {
  const [wodInput, setWodInput] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!wodInput.trim()) return;

    setIsAnalyzing(true);

    // 시뮬레이션: 실제로는 AI API를 호출합니다
    setTimeout(() => {
      setAnalysis({
        scaling: {
          deadlift: '95kg (60% of 1RM)',
          hspu: 'Abmat HSPU',
        },
        pacing: [
          '21 Reps: 2-3세트로 분할, 3분 목표',
          '15 Reps: 2세트로 분할, 2분 목표',
          '9 Reps: Unbroken 시도, 1분 30초 목표',
        ],
        bottleneck: 'HSPU가 주요 병목 구간입니다. 어깨 피로도 관리가 핵심입니다.',
        estimatedTime: '8-10분',
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="card card-hover p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary-light">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">AI WOD 전략 추천</h3>
          <p className="text-sm text-text-secondary">오늘의 WOD를 입력하고 맞춤 전략을 받아보세요</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            WOD 입력
          </label>
          <textarea
            value={wodInput}
            onChange={(e) => setWodInput(e.target.value)}
            placeholder="예: 21-15-9 Deadlift 225lb, HSPU"
            className="w-full px-4 py-3 rounded-xl border border-light-border bg-light-bg text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!wodInput.trim() || isAnalyzing}
          className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              분석 중...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              AI 전략 분석하기
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="mt-6 space-y-4 animate-fadeIn">
          <div className="border-t border-light-border pt-6">
            <h4 className="text-lg font-bold text-text-primary mb-4">분석 결과</h4>

            {/* Scaling */}
            <div className="mb-4 p-4 rounded-xl bg-secondary-light border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-secondary" />
                <h5 className="font-semibold text-text-primary">추천 무게/스케일링</h5>
              </div>
              <ul className="space-y-1 ml-7">
                <li className="text-sm text-text-secondary">
                  Deadlift: <span className="font-semibold text-text-primary">{analysis.scaling.deadlift}</span>
                </li>
                <li className="text-sm text-text-secondary">
                  HSPU: <span className="font-semibold text-text-primary">{analysis.scaling.hspu}</span>
                </li>
              </ul>
            </div>

            {/* Pacing */}
            <div className="mb-4 p-4 rounded-xl bg-primary-light border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h5 className="font-semibold text-text-primary">페이싱 & 렙 스킴</h5>
              </div>
              <ul className="space-y-2 ml-7">
                {analysis.pacing.map((item: string, index: number) => (
                  <li key={index} className="text-sm text-text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-3 ml-7 text-xs text-text-tertiary">
                예상 시간: <span className="font-semibold text-primary">{analysis.estimatedTime}</span>
              </div>
            </div>

            {/* Bottleneck */}
            <div className="p-4 rounded-xl bg-accent-orange/10 border border-accent-orange/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-accent-orange" />
                <h5 className="font-semibold text-text-primary">주의사항 (Bottleneck)</h5>
              </div>
              <p className="text-sm text-text-secondary ml-7">
                {analysis.bottleneck}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
