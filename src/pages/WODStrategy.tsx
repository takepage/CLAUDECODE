import { useState } from 'react';
import { Sparkles, Plus, Trash2, Copy, Clock, Zap, Timer, Target, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

// 크로스핏 동작 리스트 (자동완성용)
const CROSSFIT_MOVEMENTS = [
  'Pull-up',
  'Strict Pull-up',
  'Kipping Pull-up',
  'Chest to Bar',
  'Strict Chest to Bar',
  'Hand Stand Push Up',
  'Strict Hand Stand Push Up',
  'Kipping Hand Stand Push Up',
  'HSPU',
  'Strict HSPU',
  'Push-up',
  'Strict Push-up',
  'Ring Dip',
  'Strict Ring Dip',
  'Bar Muscle Up',
  'Ring Muscle Up',
  'Toes to Bar',
  'Knees to Elbow',
  'Air Squat',
  'Box Jump',
  'Burpee',
  'Double Under',
  'Single Under',
  'Row',
  'Ski Erg',
  'Assault Bike',
  'Thruster',
  'Wall Ball',
  'Deadlift',
  'Clean',
  'Power Clean',
  'Squat Clean',
  'Clean & Jerk',
  'Snatch',
  'Power Snatch',
  'Squat Snatch',
  'Front Squat',
  'Back Squat',
  'Overhead Squat',
  'Shoulder Press',
  'Push Press',
  'Push Jerk',
  'Split Jerk',
  'Bench Press',
  'Sumo Deadlift High Pull',
  'Kettlebell Swing',
  'Turkish Get Up',
  'Farmer Carry',
  'Sled Push',
  'Sled Pull',
  'Devil Press'
];

// 데이터 타입 정의
interface Movement {
  id: string;
  name: string;
  type: 'reps' | 'calories' | 'distance' | 'time';
  value: string;
  unit?: string;
  isProgressive: boolean;
  progressivePattern?: string;
}

interface Section {
  id: string;
  type: 'AMRAP' | 'FOR_TIME' | 'EMOM' | 'REST';
  duration?: number;
  rounds?: number;
  interval?: number; // EMOM 간격 (분)
  timecap?: number;
  movements: Movement[];
}

export default function WODStrategy() {
  const [sections, setSections] = useState<Section[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [movementSuggestions, setMovementSuggestions] = useState<{ [key: string]: string[] }>({});

  // 섹션 추가
  const addSection = (type: Section['type']) => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      type,
      duration: type === 'AMRAP' ? 5 : type === 'REST' ? 3 : undefined,
      rounds: type === 'EMOM' ? 10 : undefined,
      interval: type === 'EMOM' ? 1 : undefined, // EMOM 기본 1분
      timecap: type === 'FOR_TIME' ? 20 : undefined,
      movements: []
    };
    setSections([...sections, newSection]);
    setExpandedSections(new Set([...expandedSections, newSection.id]));
  };

  // 섹션 삭제
  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId));
    const newExpanded = new Set(expandedSections);
    newExpanded.delete(sectionId);
    setExpandedSections(newExpanded);
  };

  // 섹션 복제
  const duplicateSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const newSection: Section = {
      ...section,
      id: `section-${Date.now()}`,
      movements: section.movements.map(m => ({ ...m, id: `movement-${Date.now()}-${Math.random()}` }))
    };
    const index = sections.findIndex(s => s.id === sectionId);
    const newSections = [...sections];
    newSections.splice(index + 1, 0, newSection);
    setSections(newSections);
  };

  // 섹션 업데이트
  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, ...updates } : s));
  };

  // 드래그 앤 드롭
  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedSection(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault();
    if (!draggedSection || draggedSection === targetSectionId) return;

    const draggedIndex = sections.findIndex(s => s.id === draggedSection);
    const targetIndex = sections.findIndex(s => s.id === targetSectionId);

    const newSections = [...sections];
    const [removed] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, removed);

    setSections(newSections);
    setDraggedSection(null);
  };

  // 동작 추가
  const addMovement = (sectionId: string) => {
    const newMovement: Movement = {
      id: `movement-${Date.now()}`,
      name: '',
      type: 'reps',
      value: '',
      isProgressive: false
    };
    setSections(sections.map(s =>
      s.id === sectionId
        ? { ...s, movements: [...s.movements, newMovement] }
        : s
    ));
  };

  // 동작 삭제
  const deleteMovement = (sectionId: string, movementId: string) => {
    setSections(sections.map(s =>
      s.id === sectionId
        ? { ...s, movements: s.movements.filter(m => m.id !== movementId) }
        : s
    ));
  };

  // 동작 업데이트
  const updateMovement = (sectionId: string, movementId: string, updates: Partial<Movement>) => {
    setSections(sections.map(s =>
      s.id === sectionId
        ? {
            ...s,
            movements: s.movements.map(m =>
              m.id === movementId ? { ...m, ...updates } : m
            )
          }
        : s
    ));
  };

  // 동작 자동완성
  const handleMovementNameChange = (sectionId: string, movementId: string, value: string) => {
    updateMovement(sectionId, movementId, { name: value });

    if (value.length >= 2) {
      const filtered = CROSSFIT_MOVEMENTS.filter(m =>
        m.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setMovementSuggestions({ ...movementSuggestions, [movementId]: filtered });
    } else {
      const newSuggestions = { ...movementSuggestions };
      delete newSuggestions[movementId];
      setMovementSuggestions(newSuggestions);
    }
  };

  const selectSuggestion = (sectionId: string, movementId: string, suggestion: string) => {
    updateMovement(sectionId, movementId, { name: suggestion });
    const newSuggestions = { ...movementSuggestions };
    delete newSuggestions[movementId];
    setMovementSuggestions(newSuggestions);
  };

  // 섹션 확장/축소
  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // WOD 텍스트 생성 (미리보기)
  const generateWODText = () => {
    return sections.map(section => {
      let text = '';

      if (section.type === 'REST') {
        text = `${section.duration || 3}MIN REST`;
      } else {
        // 섹션 헤더
        if (section.type === 'AMRAP') {
          text = `${section.duration || 5}MIN AMRAP\n`;
        } else if (section.type === 'FOR_TIME') {
          text = `FOR TIME${section.timecap ? ` (${section.timecap}min cap)` : ''}\n`;
        } else if (section.type === 'EMOM') {
          text = `EMOM ${section.rounds || 10}${section.interval && section.interval > 1 ? ` (Every ${section.interval}min)` : ''}\n`;
        }

        // 동작 추가
        section.movements.forEach(movement => {
          if (movement.name) {
            if (movement.isProgressive && movement.progressivePattern) {
              text += `${movement.name} ${movement.progressivePattern}\n`;
            } else {
              const valueText = movement.type === 'calories'
                ? `${movement.value} CAL`
                : movement.type === 'distance'
                ? `${movement.value}${movement.unit || 'm'}`
                : movement.value;
              text += `${valueText} ${movement.name}\n`;
            }
          }
        });
      }

      return text.trim();
    }).join('\n\n');
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-primary-light">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">WOD 전략 분석</h2>
          <p className="text-sm text-text-secondary">블록을 추가하여 복잡한 WOD도 쉽게 구성하세요</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 왼쪽: WOD 빌더 */}
        <div className="space-y-4">
          {/* 섹션 추가 버튼 */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">섹션 추가</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addSection('AMRAP')}
                className="p-3 rounded-xl bg-primary-light text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 font-semibold text-sm"
              >
                <Zap className="w-4 h-4" />
                AMRAP
              </button>
              <button
                onClick={() => addSection('FOR_TIME')}
                className="p-3 rounded-xl bg-secondary-light text-secondary hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 font-semibold text-sm"
              >
                <Timer className="w-4 h-4" />
                FOR TIME
              </button>
              <button
                onClick={() => addSection('EMOM')}
                className="p-3 rounded-xl bg-accent-purple/10 text-accent-purple hover:bg-accent-purple hover:text-white transition-all flex items-center justify-center gap-2 font-semibold text-sm"
              >
                <Target className="w-4 h-4" />
                EMOM
              </button>
              <button
                onClick={() => addSection('REST')}
                className="p-3 rounded-xl bg-light-bg text-text-secondary hover:bg-light-card-hover transition-all flex items-center justify-center gap-2 font-semibold text-sm"
              >
                <Clock className="w-4 h-4" />
                REST
              </button>
            </div>
          </div>

          {/* 섹션 리스트 */}
          <div className="space-y-3">
            {sections.length === 0 && (
              <div className="card p-8 text-center">
                <Plus className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
                <p className="text-text-secondary text-sm">섹션을 추가하여 WOD를 구성하세요</p>
              </div>
            )}

            {sections.map((section, index) => {
              const isExpanded = expandedSections.has(section.id);
              const isRest = section.type === 'REST';

              return (
                <div
                  key={section.id}
                  className="card relative"
                  draggable
                  onDragStart={(e) => handleDragStart(e, section.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, section.id)}
                >
                  {/* 섹션 번호 (왼쪽 상단) */}
                  <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>

                  {/* 섹션 헤더 */}
                  <div className="p-4 border-b border-light-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 ml-8">
                        {/* 드래그 핸들 */}
                        <button
                          className="p-1 hover:bg-light-bg rounded-lg transition-colors cursor-move"
                          title="드래그하여 순서 변경"
                        >
                          <GripVertical className="w-5 h-5 text-text-tertiary" />
                        </button>

                        <span className="font-bold text-text-primary">
                          {section.type}
                        </span>

                        {/* 시간 입력 */}
                        {!isRest && isExpanded && (
                          <div className="flex items-center gap-2 ml-4">
                            {section.type === 'AMRAP' && (
                              <>
                                <input
                                  type="number"
                                  value={section.duration || ''}
                                  onChange={(e) => updateSection(section.id, { duration: parseInt(e.target.value) || 0 })}
                                  className="w-16 px-2 py-1 rounded-lg border border-light-border text-sm"
                                  placeholder="5"
                                />
                                <span className="text-xs text-text-tertiary">분</span>
                              </>
                            )}
                            {section.type === 'FOR_TIME' && (
                              <>
                                <span className="text-xs text-text-tertiary">Timecap:</span>
                                <input
                                  type="number"
                                  value={section.timecap || ''}
                                  onChange={(e) => updateSection(section.id, { timecap: parseInt(e.target.value) || undefined })}
                                  className="w-16 px-2 py-1 rounded-lg border border-light-border text-sm"
                                  placeholder="20"
                                />
                                <span className="text-xs text-text-tertiary">분</span>
                              </>
                            )}
                            {section.type === 'EMOM' && (
                              <>
                                <span className="text-xs text-text-tertiary">Every</span>
                                <input
                                  type="number"
                                  value={section.interval || ''}
                                  onChange={(e) => updateSection(section.id, { interval: parseInt(e.target.value) || 1 })}
                                  className="w-12 px-2 py-1 rounded-lg border border-light-border text-sm"
                                  placeholder="1"
                                />
                                <span className="text-xs text-text-tertiary">분 x</span>
                                <input
                                  type="number"
                                  value={section.rounds || ''}
                                  onChange={(e) => updateSection(section.id, { rounds: parseInt(e.target.value) || 0 })}
                                  className="w-16 px-2 py-1 rounded-lg border border-light-border text-sm"
                                  placeholder="10"
                                />
                                <span className="text-xs text-text-tertiary">라운드</span>
                              </>
                            )}
                          </div>
                        )}

                        {isRest && (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={section.duration || ''}
                              onChange={(e) => updateSection(section.id, { duration: parseInt(e.target.value) || 0 })}
                              className="w-16 px-2 py-1 rounded-lg border border-light-border text-sm"
                              placeholder="3"
                            />
                            <span className="text-xs text-text-tertiary">분</span>
                          </div>
                        )}
                      </div>

                      {/* 섹션 액션 버튼 */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => duplicateSection(section.id)}
                          className="p-2 hover:bg-light-bg rounded-lg transition-colors"
                          title="복제"
                        >
                          <Copy className="w-4 h-4 text-text-tertiary" />
                        </button>
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="p-2 hover:bg-light-bg rounded-lg transition-colors"
                          title={isExpanded ? "접기" : "펼치기"}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-text-tertiary" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-text-tertiary" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 섹션 내용 */}
                  {isExpanded && !isRest && (
                    <div className="p-4 space-y-3">
                      {/* 동작 리스트 */}
                      {section.movements.map((movement, mIndex) => (
                        <div key={movement.id} className="p-3 rounded-xl bg-light-bg border border-light-border">
                          <div className="flex items-start gap-2">
                            <span className="text-xs font-bold text-text-tertiary mt-2">{mIndex + 1}</span>
                            <div className="flex-1 space-y-2 relative">
                              {/* 동작명 */}
                              <div className="relative">
                                <input
                                  type="text"
                                  value={movement.name}
                                  onChange={(e) => handleMovementNameChange(section.id, movement.id, e.target.value)}
                                  placeholder="동작 이름 (예: Pull-up, Row)"
                                  className="w-full px-3 py-2 rounded-lg border border-light-border text-sm"
                                />
                                {/* 자동완성 드롭다운 */}
                                {movementSuggestions[movement.id] && movementSuggestions[movement.id].length > 0 && (
                                  <div className="absolute z-10 w-full mt-1 bg-white border border-light-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {movementSuggestions[movement.id].map((suggestion, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => selectSuggestion(section.id, movement.id, suggestion)}
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-primary-light transition-colors"
                                      >
                                        {suggestion}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* 누적 패턴 체크박스 */}
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`progressive-${movement.id}`}
                                  checked={movement.isProgressive}
                                  onChange={(e) => updateMovement(section.id, movement.id, {
                                    isProgressive: e.target.checked,
                                    progressivePattern: e.target.checked ? '10-15-20-25' : undefined
                                  })}
                                  className="rounded border-light-border"
                                />
                                <label htmlFor={`progressive-${movement.id}`} className="text-xs text-text-secondary">
                                  누적 패턴 (10-15-20-25...)
                                </label>
                              </div>

                              {/* 값 입력 */}
                              {movement.isProgressive ? (
                                <input
                                  type="text"
                                  value={movement.progressivePattern || ''}
                                  onChange={(e) => updateMovement(section.id, movement.id, { progressivePattern: e.target.value })}
                                  placeholder="10-15-20-25-30"
                                  className="w-full px-3 py-2 rounded-lg border border-light-border text-sm"
                                />
                              ) : (
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={movement.value}
                                    onChange={(e) => updateMovement(section.id, movement.id, { value: e.target.value })}
                                    placeholder="횟수/칼로리/거리"
                                    className="flex-1 px-3 py-2 rounded-lg border border-light-border text-sm"
                                  />
                                  <select
                                    value={movement.type}
                                    onChange={(e) => updateMovement(section.id, movement.id, { type: e.target.value as any })}
                                    className="px-3 py-2 rounded-lg border border-light-border text-sm"
                                  >
                                    <option value="reps">Reps</option>
                                    <option value="calories">Cal</option>
                                    <option value="distance">Distance</option>
                                  </select>
                                  {movement.type === 'distance' && (
                                    <input
                                      type="text"
                                      value={movement.unit || 'm'}
                                      onChange={(e) => updateMovement(section.id, movement.id, { unit: e.target.value })}
                                      placeholder="m"
                                      className="w-16 px-3 py-2 rounded-lg border border-light-border text-sm"
                                    />
                                  )}
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() => deleteMovement(section.id, movement.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors mt-1"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* 동작 추가 버튼 */}
                      <button
                        onClick={() => addMovement(section.id)}
                        className="w-full p-3 rounded-xl border-2 border-dashed border-light-border hover:border-primary hover:bg-primary-light/20 transition-all flex items-center justify-center gap-2 text-text-tertiary hover:text-primary"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-semibold">동작 추가</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 오른쪽: 미리보기 및 분석 */}
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
      </div>
    </div>
  );
}
