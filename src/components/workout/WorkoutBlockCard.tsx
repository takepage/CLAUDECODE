import React from 'react';
import { WorkoutBlock, BLOCK_TYPE_CONFIG } from '../../types/workout';
import { Clock, Trash2, Edit, Award } from 'lucide-react';

interface WorkoutBlockCardProps {
  block: WorkoutBlock;
  onEdit?: (block: WorkoutBlock) => void;
  onDelete?: (blockId: string) => void;
}

const WorkoutBlockCard: React.FC<WorkoutBlockCardProps> = ({ block, onEdit, onDelete }) => {
  const config = BLOCK_TYPE_CONFIG[block.type];

  const formatDuration = (seconds?: number): string => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}분 ${secs}초` : `${mins}분`;
  };

  return (
    <div className={`border-2 rounded-xl p-4 ${config.color} transition-all hover:shadow-md`}>
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-2xl">{config.emoji}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{block.name}</h3>
              {block.isPR && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  <Award size={12} />
                  PR
                </span>
              )}
            </div>
            <p className="text-xs opacity-70">{config.label}</p>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(block)}
              className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
              title="수정"
            >
              <Edit size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(block.id)}
              className="p-1.5 hover:bg-red-100 rounded-lg transition-colors text-red-600"
              title="삭제"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="space-y-2">
        {/* 시간 */}
        {block.duration && (
          <div className="flex items-center gap-2 text-sm">
            <Clock size={14} className="opacity-60" />
            <span>{formatDuration(block.duration)}</span>
          </div>
        )}

        {/* 세트 & 무게 */}
        {(block.sets || block.weight) && (
          <div className="text-sm">
            {block.sets && <span className="font-semibold">{block.sets}</span>}
            {block.weight && (
              <span className="ml-2">
                @ {block.weight}{block.weightUnit || 'kg'}
              </span>
            )}
          </div>
        )}

        {/* 메모 */}
        {block.content && (
          <p className="text-sm bg-white/50 rounded-lg p-2 whitespace-pre-wrap">
            {block.content}
          </p>
        )}

        {/* 영상 (나중에 구현) */}
        {block.videoUrl && (
          <div className="mt-2">
            <button className="text-sm text-blue-600 hover:underline">
              📹 영상 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutBlockCard;
