import { useState, useEffect } from 'react';
import { Sparkles, Plus, Trash2, Copy, Clock, Zap, Timer, Target, ChevronDown, ChevronUp, GripVertical, Upload, Image, X, Save, FolderOpen, Edit2 } from 'lucide-react';

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
  // 무게 설정
  weight?: number;
  weightUnit?: 'lb' | 'kg';
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

interface SavedWOD {
  id: string;
  name: string;
  date: string;
  sections: Section[];
}

// LocalStorage 유틸리티
const STORAGE_KEY = 'saved-wods';

const getSavedWODs = (): SavedWOD[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveWODToStorage = (wod: SavedWOD) => {
  const wods = getSavedWODs();
  const existing = wods.findIndex(w => w.id === wod.id);
  if (existing >= 0) {
    wods[existing] = wod;
  } else {
    wods.push(wod);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wods));
};

const deleteWODFromStorage = (id: string) => {
  const wods = getSavedWODs().filter(w => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wods));
};

export default function WODStrategy() {
  const [sections, setSections] = useState<Section[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [movementSuggestions, setMovementSuggestions] = useState<{ [key: string]: string[] }>({});
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 저장/불러오기 관련 state
  const [wodName, setWodName] = useState('');
  const [currentWodId, setCurrentWodId] = useState<string | null>(null);
  const [savedWODs, setSavedWODs] = useState<SavedWOD[]>([]);
  const [showSavedWODs, setShowSavedWODs] = useState(false);
  const [editingWodId, setEditingWodId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  // 저장된 WOD 목록 로드
  useEffect(() => {
    setSavedWODs(getSavedWODs());
  }, []);

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
      isProgressive: false,
      weightUnit: 'lb'
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

  // WOD 저장
  const handleSaveWOD = () => {
    if (sections.length === 0) {
      alert('저장할 WOD가 없습니다.');
      return;
    }

    const name = wodName.trim() || `WOD ${new Date().toLocaleDateString()}`;
    const id = currentWodId || `wod-${Date.now()}`;

    const savedWOD: SavedWOD = {
      id,
      name,
      date: new Date().toISOString(),
      sections
    };

    saveWODToStorage(savedWOD);
    setSavedWODs(getSavedWODs());
    setCurrentWodId(id);
    setWodName(name);
    alert(`"${name}" 저장 완료!`);
  };

  // WOD 불러오기
  const handleLoadWOD = (wod: SavedWOD) => {
    setSections(wod.sections);
    setWodName(wod.name);
    setCurrentWodId(wod.id);
    setShowSavedWODs(false);

    // 모든 섹션 펼치기
    const allSectionIds = new Set(wod.sections.map(s => s.id));
    setExpandedSections(allSectionIds);
  };

  // WOD 삭제
  const handleDeleteWOD = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteWODFromStorage(id);
      setSavedWODs(getSavedWODs());

      // 현재 편집 중인 WOD를 삭제한 경우
      if (currentWodId === id) {
        setCurrentWodId(null);
        setWodName('');
      }
    }
  };

  // WOD 이름 수정
  const handleRenameWOD = (id: string, newName: string) => {
    const wod = savedWODs.find(w => w.id === id);
    if (wod && newName.trim()) {
      const updatedWOD = { ...wod, name: newName.trim() };
      saveWODToStorage(updatedWOD);
      setSavedWODs(getSavedWODs());

      if (currentWodId === id) {
        setWodName(newName.trim());
      }
    }
    setEditingWodId(null);
    setEditingName('');
  };

  // 새 WOD 시작
  const handleNewWOD = () => {
    if (sections.length > 0 && !confirm('현재 WOD를 지우고 새로 시작하시겠습니까?')) {
      return;
    }
    setSections([]);
    setWodName('');
    setCurrentWodId(null);
    setExpandedSections(new Set());
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setUploadedImage(imageUrl);
      // TODO: AI 이미지 분석 및 섹션 자동 생성
      analyzeImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  // 이미지 분석 (placeholder)
  const analyzeImage = async (_imageUrl: string) => {
    setIsAnalyzing(true);
    // TODO: 실제 AI 분석 API 연동
    // 현재는 placeholder로 2초 후 메시지만 표시
    setTimeout(() => {
      setIsAnalyzing(false);
      alert('이미지 분석 기능은 준비 중입니다.\n수동으로 WOD를 구성해주세요.');
    }, 2000);
  };

  // 이미지 제거
  const removeImage = () => {
    setUploadedImage(null);
    setIsAnalyzing(false);
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
              text += `${movement.name} ${movement.progressivePattern}`;
              if (movement.weight) {
                text += ` @ ${movement.weight}${movement.weightUnit || 'lb'}`;
              }
              text += '\n';
            } else {
              const valueText = movement.type === 'calories'
                ? `${movement.value} CAL`
                : movement.type === 'distance'
                ? `${movement.value}${movement.unit || 'm'}`
                : movement.value;

              text += `${valueText} ${movement.name}`;
              if (movement.weight) {
                text += ` @ ${movement.weight}${movement.weightUnit || 'lb'}`;
              }
              text += '\n';
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
      <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
        <div className="p-2 md:p-3 rounded-xl bg-primary-light">
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-text-primary">WOD 전략 분석</h2>
          <p className="text-xs md:text-sm text-text-secondary">블록을 추가하여 복잡한 WOD도 쉽게 구성하세요</p>
        </div>
      </div>

      {/* WOD 저장/불러오기 바 */}
      <div className="card p-3 md:p-4 mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={wodName}
            onChange={(e) => setWodName(e.target.value)}
            placeholder="WOD 이름 (예: Fran, Murph)"
            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-light-border text-sm"
          />
          <button
            onClick={handleSaveWOD}
            disabled={sections.length === 0}
            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            저장
          </button>
          <button
            onClick={() => setShowSavedWODs(true)}
            className="px-4 py-2 bg-secondary text-white rounded-lg font-semibold text-sm hover:bg-secondary-dark transition-colors flex items-center gap-2"
          >
            <FolderOpen className="w-4 h-4" />
            불러오기 ({savedWODs.length})
          </button>
          <button
            onClick={handleNewWOD}
            className="px-4 py-2 bg-light-bg text-text-secondary rounded-lg font-semibold text-sm hover:bg-light-card-hover transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            새로 만들기
          </button>
        </div>
        {currentWodId && wodName && (
          <p className="text-xs text-text-tertiary">
            현재 편집 중: <span className="font-semibold text-primary">{wodName}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 왼쪽: WOD 빌더 */}
        <div className="space-y-4">
          {/* 이미지 업로드 */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Image className="w-4 h-4" />
              이미지로 WOD 가져오기
            </h3>

            {!uploadedImage ? (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-light-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary-light/10 transition-all">
                <Upload className="w-8 h-8 text-text-tertiary mb-2" />
                <span className="text-sm text-text-secondary mb-1">이미지를 클릭하거나 드래그하여 업로드</span>
                <span className="text-xs text-text-tertiary">WOD 이미지를 자동으로 분석합니다</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <img src={uploadedImage} alt="Uploaded WOD" className="w-full rounded-lg border border-light-border" />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-white/90 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm font-semibold text-text-primary">이미지 분석 중...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

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
                  <div className="p-2.5 md:p-4 border-b border-light-border space-y-2">
                    {/* 첫 번째 줄: 타입과 액션 버튼만 */}
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1 ml-7 min-w-0">
                        {/* 드래그 핸들 - 모바일에서 숨김 */}
                        <button
                          className="hidden md:block p-1 hover:bg-light-bg rounded-lg transition-colors cursor-move flex-shrink-0"
                          title="드래그하여 순서 변경"
                        >
                          <GripVertical className="w-5 h-5 text-text-tertiary" />
                        </button>

                        <span className="font-bold text-text-primary text-xs md:text-base truncate">
                          {section.type}
                        </span>
                      </div>

                      {/* 섹션 액션 버튼 - 항상 보임 */}
                      <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
                        <button
                          onClick={() => duplicateSection(section.id)}
                          className="p-1 md:p-2 hover:bg-light-bg rounded-lg transition-colors"
                          title="복제"
                        >
                          <Copy className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-tertiary" />
                        </button>
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-1 md:p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
                        </button>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="p-1 md:p-2 hover:bg-light-bg rounded-lg transition-colors"
                          title={isExpanded ? "접기" : "펼치기"}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-text-tertiary" />
                          ) : (
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-text-tertiary" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 두 번째 줄: 시간 입력만 (펼쳤을 때 또는 REST 타입) */}
                    {(isExpanded || isRest) && (
                      <div className="ml-7 text-sm">
                        {isRest && (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={section.duration || ''}
                              onChange={(e) => updateSection(section.id, { duration: parseInt(e.target.value) || 0 })}
                              className="w-12 md:w-16 px-1.5 py-1 rounded-lg border border-light-border text-sm"
                              placeholder="3"
                            />
                            <span className="text-xs text-text-tertiary">분</span>
                          </div>
                        )}
                        {!isRest && section.type === 'AMRAP' && (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={section.duration || ''}
                              onChange={(e) => updateSection(section.id, { duration: parseInt(e.target.value) || 0 })}
                              className="w-12 md:w-16 px-1.5 py-1 rounded-lg border border-light-border text-sm"
                              placeholder="5"
                            />
                            <span className="text-xs text-text-tertiary">분</span>
                          </div>
                        )}
                        {!isRest && section.type === 'FOR_TIME' && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-text-tertiary hidden sm:inline">Cap:</span>
                            <input
                              type="number"
                              value={section.timecap || ''}
                              onChange={(e) => updateSection(section.id, { timecap: parseInt(e.target.value) || undefined })}
                              className="w-12 md:w-16 px-1.5 py-1 rounded-lg border border-light-border text-sm"
                              placeholder="20"
                            />
                            <span className="text-xs text-text-tertiary">분</span>
                          </div>
                        )}
                        {!isRest && section.type === 'EMOM' && (
                          <div className="flex flex-wrap items-center gap-1.5 text-xs">
                            <input
                              type="number"
                              value={section.interval || ''}
                              onChange={(e) => updateSection(section.id, { interval: parseInt(e.target.value) || 1 })}
                              className="w-10 md:w-12 px-1.5 py-1 rounded-lg border border-light-border"
                              placeholder="1"
                            />
                            <span className="text-text-tertiary">분</span>
                            <span className="text-text-tertiary">×</span>
                            <input
                              type="number"
                              value={section.rounds || ''}
                              onChange={(e) => updateSection(section.id, { rounds: parseInt(e.target.value) || 0 })}
                              className="w-12 md:w-16 px-1.5 py-1 rounded-lg border border-light-border"
                              placeholder="10"
                            />
                            <span className="text-text-tertiary">R</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 섹션 내용 */}
                  {isExpanded && !isRest && (
                    <div className="p-4 space-y-3">
                      {/* 동작 리스트 */}
                      {section.movements.map((movement, mIndex) => (
                        <div key={movement.id} className="p-2 md:p-3 rounded-xl bg-light-bg border border-light-border">
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <span className="text-xs font-bold text-text-tertiary mt-2 min-w-[1rem]">{mIndex + 1}</span>
                            <div className="flex-1 space-y-2 relative min-w-0">
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
                                  className="w-full px-2 md:px-3 py-2 rounded-lg border border-light-border text-sm"
                                />
                              ) : (
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                  <input
                                    type="text"
                                    value={movement.value}
                                    onChange={(e) => updateMovement(section.id, movement.id, { value: e.target.value })}
                                    placeholder="횟수"
                                    className="flex-1 min-w-[80px] px-2 md:px-3 py-2 rounded-lg border border-light-border text-sm"
                                  />
                                  <select
                                    value={movement.type}
                                    onChange={(e) => updateMovement(section.id, movement.id, { type: e.target.value as any })}
                                    className="px-2 md:px-3 py-2 rounded-lg border border-light-border text-sm min-w-[70px]"
                                  >
                                    <option value="reps">Reps</option>
                                    <option value="calories">Cal</option>
                                    <option value="distance">거리</option>
                                  </select>
                                  {movement.type === 'distance' && (
                                    <input
                                      type="text"
                                      value={movement.unit || 'm'}
                                      onChange={(e) => updateMovement(section.id, movement.id, { unit: e.target.value })}
                                      placeholder="m"
                                      className="w-12 md:w-16 px-2 md:px-3 py-2 rounded-lg border border-light-border text-sm"
                                    />
                                  )}
                                </div>
                              )}

                              {/* 무게 입력 */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs text-text-tertiary">무게:</span>
                                <input
                                  type="number"
                                  value={movement.weight || ''}
                                  onChange={(e) => updateMovement(section.id, movement.id, {
                                    weight: parseFloat(e.target.value) || undefined
                                  })}
                                  placeholder="135"
                                  className="w-20 px-2 py-1.5 rounded-lg border border-light-border text-sm"
                                />
                                <select
                                  value={movement.weightUnit || 'lb'}
                                  onChange={(e) => updateMovement(section.id, movement.id, {
                                    weightUnit: e.target.value as 'lb' | 'kg'
                                  })}
                                  className="px-2 py-1.5 rounded-lg border border-light-border text-sm"
                                >
                                  <option value="lb">lb</option>
                                  <option value="kg">kg</option>
                                </select>
                              </div>
                            </div>

                            <button
                              onClick={() => deleteMovement(section.id, movement.id)}
                              className="p-1.5 md:p-2 hover:bg-red-50 rounded-lg transition-colors mt-1 flex-shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
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

      {/* 저장된 WOD 목록 모달 */}
      {showSavedWODs && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSavedWODs(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* 모달 헤더 */}
            <div className="p-4 md:p-6 border-b border-light-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary-light">
                  <FolderOpen className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-text-primary">저장된 WOD</h3>
                  <p className="text-xs text-text-tertiary">총 {savedWODs.length}개</p>
                </div>
              </div>
              <button
                onClick={() => setShowSavedWODs(false)}
                className="p-2 hover:bg-light-bg rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>

            {/* WOD 목록 */}
            <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {savedWODs.length === 0 ? (
                <div className="text-center py-12">
                  <FolderOpen className="w-16 h-16 text-text-tertiary mx-auto mb-4 opacity-50" />
                  <p className="text-text-tertiary">저장된 WOD가 없습니다</p>
                  <p className="text-xs text-text-tertiary mt-2">WOD를 구성하고 저장해보세요!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedWODs
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((wod) => (
                      <div
                        key={wod.id}
                        className="p-4 rounded-xl border border-light-border hover:border-primary hover:bg-primary-light/10 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            {editingWodId === wod.id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editingName}
                                  onChange={(e) => setEditingName(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleRenameWOD(wod.id, editingName);
                                    } else if (e.key === 'Escape') {
                                      setEditingWodId(null);
                                      setEditingName('');
                                    }
                                  }}
                                  className="flex-1 px-2 py-1 rounded-lg border border-primary text-sm font-semibold"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleRenameWOD(wod.id, editingName)}
                                  className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-dark"
                                >
                                  확인
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingWodId(null);
                                    setEditingName('');
                                  }}
                                  className="px-3 py-1 bg-light-bg text-text-secondary rounded-lg text-xs font-semibold hover:bg-light-card-hover"
                                >
                                  취소
                                </button>
                              </div>
                            ) : (
                              <>
                                <h4 className="font-bold text-text-primary mb-1 truncate">{wod.name}</h4>
                                <p className="text-xs text-text-tertiary mb-2">
                                  {new Date(wod.date).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                                <p className="text-xs text-text-secondary">
                                  {wod.sections.length}개 섹션
                                  {' · '}
                                  {wod.sections.reduce((acc, s) => acc + s.movements.length, 0)}개 동작
                                </p>
                              </>
                            )}
                          </div>

                          {editingWodId !== wod.id && (
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => handleLoadWOD(wod)}
                                className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-dark transition-colors"
                              >
                                불러오기
                              </button>
                              <button
                                onClick={() => {
                                  setEditingWodId(wod.id);
                                  setEditingName(wod.name);
                                }}
                                className="p-1.5 hover:bg-light-bg rounded-lg transition-colors"
                                title="이름 수정"
                              >
                                <Edit2 className="w-4 h-4 text-text-tertiary" />
                              </button>
                              <button
                                onClick={() => handleDeleteWOD(wod.id)}
                                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                title="삭제"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
