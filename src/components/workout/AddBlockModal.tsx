import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { WorkoutBlock, BlockType, WeightUnit } from '../../types/workout';
import { BLOCK_TYPE_CONFIG } from '../../types/workout';

interface AddBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (block: Omit<WorkoutBlock, 'id' | 'orderIndex' | 'timestamp'>) => void;
  editBlock?: WorkoutBlock | null;
}

const AddBlockModal: React.FC<AddBlockModalProps> = ({ isOpen, onClose, onSave, editBlock }) => {
  const [blockType, setBlockType] = useState<BlockType>('wod');
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [content, setContent] = useState('');
  const [isPR, setIsPR] = useState(false);

  useEffect(() => {
    if (editBlock) {
      setBlockType(editBlock.type);
      setName(editBlock.name);
      setDuration(editBlock.duration ? Math.floor(editBlock.duration / 60).toString() : '');
      setSets(editBlock.sets || '');
      setWeight(editBlock.weight?.toString() || '');
      setWeightUnit(editBlock.weightUnit || 'kg');
      setContent(editBlock.content || '');
      setIsPR(editBlock.isPR || false);
    } else {
      // 초기화
      setBlockType('wod');
      setName('');
      setDuration('');
      setSets('');
      setWeight('');
      setWeightUnit('kg');
      setContent('');
      setIsPR(false);
    }
  }, [editBlock, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('운동 이름을 입력해주세요.');
      return;
    }

    const block: Omit<WorkoutBlock, 'id' | 'orderIndex' | 'timestamp'> = {
      type: blockType,
      name: name.trim(),
      duration: duration ? parseInt(duration) * 60 : undefined,
      sets: sets.trim() || undefined,
      weight: weight ? parseFloat(weight) : undefined,
      weightUnit: weight ? weightUnit : undefined,
      content: content.trim() || undefined,
      isPR,
    };

    onSave(block);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {editBlock ? '블록 수정' : '블록 추가'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 블록 타입 선택 */}
          <div>
            <label className="block text-sm font-semibold mb-2">블록 타입</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(BLOCK_TYPE_CONFIG) as BlockType[]).map((type) => {
                const typeConfig = BLOCK_TYPE_CONFIG[type];
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBlockType(type)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      blockType === type
                        ? typeConfig.color + ' border-current'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{typeConfig.emoji}</span>
                      <span className="font-medium text-sm">{typeConfig.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 운동 이름 */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              운동 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: Back Squat, Fran 등"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
              required
            />
          </div>

          {/* 시간 */}
          <div>
            <label className="block text-sm font-semibold mb-2">시간 (분)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="예: 25"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
              min="0"
            />
          </div>

          {/* 세트 & 무게 (스트렝스/역도일 때 강조) */}
          {(blockType === 'strength' || blockType === 'weightlifting') && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-2">세트</label>
                <input
                  type="text"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  placeholder="예: 5x5"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">무게</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="100"
                    className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                    step="0.5"
                    min="0"
                  />
                  <select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
                    className="px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 메모 */}
          <div>
            <label className="block text-sm font-semibold mb-2">메모</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="운동 내용, 느낌, 특이사항 등을 기록하세요."
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none resize-none"
            />
          </div>

          {/* PR 체크박스 */}
          {(blockType === 'strength' || blockType === 'weightlifting') && (
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPR}
                  onChange={(e) => setIsPR(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-semibold">🏆 PR 기록</span>
              </label>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 font-semibold hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-secondary transition-colors"
            >
              {editBlock ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlockModal;
