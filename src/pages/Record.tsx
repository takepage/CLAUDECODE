import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock } from 'lucide-react';
import type { WorkoutSession, WorkoutBlock, Feeling } from '../types/workout';
import { FEELING_CONFIG, BLOCK_TYPE_CONFIG } from '../types/workout';
import { getWorkoutSessions, saveWorkoutSession, getSessionByDate } from '../utils/storage';
import WorkoutBlockCard from '../components/workout/WorkoutBlockCard';
import AddBlockModal from '../components/workout/AddBlockModal';

const Record: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [currentSession, setCurrentSession] = useState<WorkoutSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<WorkoutBlock | null>(null);
  const [recentSessions, setRecentSessions] = useState<WorkoutSession[]>([]);

  // 세션 로드
  useEffect(() => {
    loadSession(selectedDate);
    loadRecentSessions();
  }, [selectedDate]);

  const loadSession = (date: string) => {
    const session = getSessionByDate(date);
    if (session) {
      setCurrentSession(session);
    } else {
      // 새 세션 생성
      setCurrentSession({
        id: `session-${Date.now()}`,
        date,
        blocks: [],
        createdAt: Date.now(),
      });
    }
  };

  const loadRecentSessions = () => {
    const sessions = getWorkoutSessions();
    setRecentSessions(sessions.slice(0, 7)); // 최근 7개
  };

  // 블록 추가
  const handleAddBlock = (blockData: Omit<WorkoutBlock, 'id' | 'orderIndex' | 'timestamp'>) => {
    if (!currentSession) return;

    const newBlock: WorkoutBlock = {
      ...blockData,
      id: `block-${Date.now()}`,
      orderIndex: currentSession.blocks.length,
      timestamp: Date.now(),
    };

    const updatedSession = {
      ...currentSession,
      blocks: [...currentSession.blocks, newBlock],
    };

    setCurrentSession(updatedSession);
    saveWorkoutSession(updatedSession);
    loadRecentSessions();
  };

  // 블록 수정
  const handleEditBlock = (block: WorkoutBlock) => {
    setEditingBlock(block);
    setIsModalOpen(true);
  };

  const handleUpdateBlock = (blockData: Omit<WorkoutBlock, 'id' | 'orderIndex' | 'timestamp'>) => {
    if (!currentSession || !editingBlock) return;

    const updatedBlocks = currentSession.blocks.map((b) =>
      b.id === editingBlock.id
        ? { ...b, ...blockData, timestamp: Date.now() }
        : b
    );

    const updatedSession = {
      ...currentSession,
      blocks: updatedBlocks,
    };

    setCurrentSession(updatedSession);
    saveWorkoutSession(updatedSession);
    setEditingBlock(null);
    loadRecentSessions();
  };

  // 블록 삭제
  const handleDeleteBlock = (blockId: string) => {
    if (!currentSession) return;

    if (confirm('이 블록을 삭제하시겠습니까?')) {
      const updatedBlocks = currentSession.blocks.filter((b) => b.id !== blockId);
      const updatedSession = {
        ...currentSession,
        blocks: updatedBlocks,
      };

      setCurrentSession(updatedSession);
      saveWorkoutSession(updatedSession);
      loadRecentSessions();
    }
  };

  // 컨디션 변경
  const handleFeelingChange = (feeling: Feeling) => {
    if (!currentSession) return;

    const updatedSession = {
      ...currentSession,
      feeling,
    };

    setCurrentSession(updatedSession);
    saveWorkoutSession(updatedSession);
  };

  // 메모 변경
  const handleNotesChange = (notes: string) => {
    if (!currentSession) return;

    const updatedSession = {
      ...currentSession,
      notes,
    };

    setCurrentSession(updatedSession);
    saveWorkoutSession(updatedSession);
  };

  // 총 운동 시간 계산
  const getTotalDuration = (): number => {
    if (!currentSession) return 0;
    return currentSession.blocks.reduce((total, block) => total + (block.duration || 0), 0);
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}시간 ${mins}분`;
    }
    return `${mins}분`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return '오늘';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return '어제';
    }

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];

    return `${month}월 ${day}일 (${weekday})`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-primary" size={24} />
            <div>
              <h1 className="text-2xl font-bold">{formatDate(selectedDate)}</h1>
              <p className="text-sm text-tertiary">{selectedDate}</p>
            </div>
          </div>

          {/* 날짜 선택 */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
          />
        </div>

        {/* 총 운동 시간 */}
        {currentSession && currentSession.blocks.length > 0 && (
          <div className="flex items-center gap-2 text-primary">
            <Clock size={20} />
            <span className="font-semibold">
              총 운동 시간: {formatDuration(getTotalDuration())}
            </span>
          </div>
        )}
      </div>

      {/* 블록 리스트 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">오늘의 운동</h2>
          <button
            onClick={() => {
              setEditingBlock(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all hover:shadow-lg active:scale-95"
          >
            <Plus size={20} />
            블록 추가
          </button>
        </div>

        {currentSession && currentSession.blocks.length > 0 ? (
          <div className="space-y-3">
            {currentSession.blocks.map((block) => (
              <WorkoutBlockCard
                key={block.id}
                block={block}
                onEdit={handleEditBlock}
                onDelete={handleDeleteBlock}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-12 text-center">
            <p className="text-gray-500 mb-4">아직 기록된 운동이 없습니다.</p>
            <button
              onClick={() => {
                setEditingBlock(null);
                setIsModalOpen(true);
              }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all"
            >
              첫 번째 블록 추가하기
            </button>
          </div>
        )}
      </div>

      {/* 컨디션 & 메모 */}
      {currentSession && currentSession.blocks.length > 0 && (
        <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
          {/* 컨디션 */}
          <div>
            <label className="block text-sm font-semibold mb-3">오늘의 컨디션</label>
            <div className="flex gap-3">
              {(['good', 'normal', 'bad'] as Feeling[]).map((feeling) => {
                const config = FEELING_CONFIG[feeling];
                return (
                  <button
                    key={feeling}
                    onClick={() => handleFeelingChange(feeling)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      currentSession.feeling === feeling
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-1">{config.emoji}</div>
                    <div className="text-sm font-medium">{config.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 메모 */}
          <div>
            <label className="block text-sm font-semibold mb-2">전체 메모</label>
            <textarea
              value={currentSession.notes || ''}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="오늘 운동에 대한 전반적인 느낌이나 특이사항을 기록하세요."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none resize-none"
            />
          </div>
        </div>
      )}

      {/* 최근 기록 */}
      {recentSessions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">최근 7일 기록</h2>
          <div className="space-y-2">
            {recentSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedDate(session.date)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                  session.date === selectedDate
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{formatDate(session.date)}</span>
                      {session.feeling && (
                        <span className="text-lg">{FEELING_CONFIG[session.feeling].emoji}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-tertiary">
                      <span>{session.blocks.length}개 블록</span>
                      {session.blocks.some((b) => b.duration) && (
                        <>
                          <span>•</span>
                          <span>
                            {formatDuration(
                              session.blocks.reduce((total, b) => total + (b.duration || 0), 0)
                            )}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {session.blocks.slice(0, 4).map((block, idx) => (
                      <span key={idx} className="text-lg">
                        {BLOCK_TYPE_CONFIG[block.type]?.emoji || '📝'}
                      </span>
                    ))}
                    {session.blocks.length > 4 && (
                      <span className="text-sm text-tertiary">+{session.blocks.length - 4}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 블록 추가/수정 모달 */}
      <AddBlockModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBlock(null);
        }}
        onSave={editingBlock ? handleUpdateBlock : handleAddBlock}
        editBlock={editingBlock}
      />
    </div>
  );
};

export default Record;
