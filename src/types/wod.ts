// WOD 관련 타입 정의

export interface Movement {
  id: string;
  name: string;
  type: 'reps' | 'calories' | 'distance' | 'time';
  value: string;
  unit?: string;
  isProgressive: boolean;
  progressivePattern?: string;
  // 스케일링 관련
  isScaled: boolean;
  scaledMovementName?: string;
  rxdWeight?: number;
  scaledWeight?: number;
  weightUnit?: 'lb' | 'kg';
}

export interface Section {
  id: string;
  type: 'AMRAP' | 'FOR_TIME' | 'EMOM' | 'REST';
  duration?: number;
  rounds?: number;
  interval?: number; // EMOM 간격 (분)
  timecap?: number;
  movements: Movement[];
}
