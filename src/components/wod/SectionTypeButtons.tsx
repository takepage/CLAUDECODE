import { Zap, Timer, Target, Clock } from 'lucide-react';
import type { Section } from '../../types/wod';

interface SectionTypeButtonsProps {
  onAddSection: (type: Section['type']) => void;
}

export default function SectionTypeButtons({ onAddSection }: SectionTypeButtonsProps) {
  return (
    <div className="card p-4">
      <h3 className="text-sm font-semibold text-text-primary mb-3">섹션 추가</h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onAddSection('AMRAP')}
          className="p-3 rounded-xl bg-primary-light text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 font-semibold text-sm"
        >
          <Zap className="w-4 h-4" />
          AMRAP
        </button>
        <button
          onClick={() => onAddSection('FOR_TIME')}
          className="p-3 rounded-xl bg-secondary-light text-secondary hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 font-semibold text-sm"
        >
          <Timer className="w-4 h-4" />
          FOR TIME
        </button>
        <button
          onClick={() => onAddSection('EMOM')}
          className="p-3 rounded-xl bg-accent-purple/10 text-accent-purple hover:bg-accent-purple hover:text-white transition-all flex items-center justify-center gap-2 font-semibold text-sm"
        >
          <Target className="w-4 h-4" />
          EMOM
        </button>
        <button
          onClick={() => onAddSection('REST')}
          className="p-3 rounded-xl bg-light-bg text-text-secondary hover:bg-light-card-hover transition-all flex items-center justify-center gap-2 font-semibold text-sm"
        >
          <Clock className="w-4 h-4" />
          REST
        </button>
      </div>
    </div>
  );
}
