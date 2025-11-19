# FitterBoard - 앱 기능 및 디자인 문서

> CrossFit 운동 추적 및 성과 분석 대시보드

---

## 📱 프로젝트 개요

**FitterBoard**는 CrossFit 운동자를 위한 종합 성과 추적 대시보드입니다. 운동 기록, 1RM 측정, 기술 발전, WOD 전략 수립 등 CrossFit 트레이닝의 모든 측면을 시각화하고 관리할 수 있습니다.

### 기술 스택
- **Frontend**: React 19.2 + TypeScript 5.9
- **빌드 도구**: Vite 7.2
- **스타일링**: Tailwind CSS 3.4
- **차트**: Recharts 3.4
- **아이콘**: Lucide React 0.553
- **라우팅**: React Router DOM 7.9

---

## 🎨 디자인 시스템

### 색상 팔레트 (Green-tone Design)

FitterBoard는 **자연스러운 초록 톤 기반의 클린한 디자인 시스템**을 사용합니다.

#### 배경 색상
- `bg-base` (#D7E9D0): 전체 배경 - 옅은 초록
- `bg-card` (#EFF7EE): 카드 배경 - 거의 흰색에 가까운 옅은 초록
- `light-card` (#EFF7EE): 카드 배경
- `light-card-hover` (#E5F3E3): 호버 시 카드 배경
- `light-border` (#C5DFC0): 테두리 색상

#### 텍스트 색상
- `text-primary` (#010400): 메인 텍스트 - 거의 검정
- `text-secondary` (#2C3E2A): 보조 텍스트 - 진한 초록 톤
- `text-tertiary` (#5A6C57): 삼차 텍스트 - 중간 톤

#### 브랜드 색상
- `primary` (#409B60): 메인 초록색
- `primary-dark` (#1F332A): 강조용 짙은 초록
- `primary-light` (#A8D5BA): 연한 초록
- `secondary` (#3B7A56): 보조 초록

#### 시맨틱 색상
- `success` (#409B60): 성공, 완료 표시
- `danger` (#D64545): 위험, 타이머 운동 구간
- `warning` (#E6A23C): 경고, PR 알림
- `info` (#4A90A4): 정보 표시

#### 액센트 색상 (차트/하이라이트용)
- `accent-green` (#409B60)
- `accent-blue` (#4A90A4)
- `accent-purple` (#7B8BA3)
- `accent-orange` (#E6A23C)
- `accent-red` (#D64545)
- `accent-pink` (#C98B9E)

### 타이포그래피
- **폰트**: Pretendard (한글 최적화 시스템 폰트)
- **크기 체계**: 12px ~ 72px (모바일 친화적)
- **타이머 폰트**: 5xl ~ 7xl (48px ~ 72px)

### 레이아웃
- **반응형 디자인**: 모바일 우선 (Mobile-first)
- **카드 기반 UI**: rounded-3xl (2rem 라운드)
- **터치 영역**: 최소 44px (iOS 권장 사이즈)
- **간격 시스템**: Tailwind 기본 간격 체계 활용

---

## 🚀 주요 기능

### 1. 대시보드 (Dashboard)

**경로**: `/`

**주요 컴포넌트**:
- `Dashboard.tsx` (448줄)

**기능**:
- **출석 달력**: 월간 운동 출석 현황 표시
  - 일별 출석 마킹
  - 출석률 통계
  - 연속 출석일 표시

- **오늘의 인사이트**: AI 기반 운동 조언 및 동기부여 메시지
  - 최근 운동 패턴 분석
  - 개인화된 조언 제공

- **6축 레이더 차트** (`StrengthRadarChart.tsx`):
  - Strength (근력)
  - Gymnastics (체조)
  - Endurance (지구력)
  - Power (폭발력)
  - Muscular Endurance (근지구력)
  - Flexibility (유연성)

- **1RM 트렌드 차트** (`OneRMTrendChart.tsx`):
  - 다중 운동 종목 1RM 추이 비교
  - 시간별 발전 현황 시각화
  - 라인 차트 기반

- **최근 WOD 기록** (`RecentWODs.tsx`):
  - 지난 2주간 운동 기록
  - 퍼포먼스 트렌드 차트
  - 운동 강도별 색상 구분 (High/Medium/Low)

### 2. WOD Strategy (운동 전략 수립)

**경로**: `/wod-strategy`

**주요 컴포넌트**:
- `WODStrategy.tsx` (862줄)
- `AIWODStrategy.tsx` (134줄)

**기능**:
- **블록 기반 WOD 빌더**:
  - 드래그 앤 드롭 방식으로 운동 블록 추가
  - 블록 타입: Warmup, Skill, Strength, Metcon, Cool Down
  - 각 블록별 상세 설정 (시간, 무게, 반복 횟수 등)

- **AI 전략 분석**:
  - 작성한 WOD에 대한 AI 기반 전략 제안
  - 페이싱 전략, 주의사항, 목표 시간 제시

- **이미지 업로드**:
  - 박스 화이트보드 사진 업로드
  - 운동 기록 첨부

- **무게 스케일링**:
  - Rx / Scaled 옵션
  - 개인 능력에 맞는 무게 조정

- **운동 템플릿**:
  - 자주 사용하는 WOD 템플릿 저장
  - 빠른 재사용 가능

### 3. Logbook (운동 일지)

**경로**: `/logbook`

**주요 컴포넌트**:
- `Logbook.tsx` (171줄)
- `QuickWorkoutLogModal.tsx` (227줄)
- `WorkoutSummaryModal.tsx` (169줄)

**기능**:
- **운동 기록 관리**:
  - 과거 운동 기록 조회
  - 날짜별 필터링
  - 운동 타입별 필터링

- **빠른 운동 로깅 모달**:
  - 운동명, 시간, 무게 기록
  - RPE (운동 강도) 평가
  - 컨디션 기록
  - 메모 추가

- **운동 요약 모달**:
  - 상세 운동 통계
  - 이전 기록과 비교
  - PR 달성 여부 표시

### 4. Stats (통계)

**경로**: `/stats`

**주요 컴포넌트**:
- `Stats.tsx` (1,081줄 - 현재 플레이스홀더)

**기능** (계획 중):
- 월별/연간 운동 통계
- PR 기록 추이
- 운동 강도 분포
- 출석률 통계
- 부위별 운동량 분석

### 5. Profile (프로필 설정)

**경로**: `/profile`

**주요 컴포넌트**:
- `Profile.tsx` (137줄)
- `ProfileCard.tsx` (84줄)

**기능**:
- **프로필 정보**:
  - 이름, 박스 정보
  - 회원 시작일
  - 프로필 사진

- **1RM 기록 카드** (`OneRMCard.tsx`):
  - 주요 운동 1RM 기록
  - 색상별 구분 (Pink/Blue/Green/Orange)
  - 트렌드 표시 (증가율)

- **언브로큰 기록 카드** (`UnbrokenRecordCard.tsx`):
  - 연속 수행 최고 기록
  - 바 머슬업, 풀업, T2B, 더블언더 등
  - PR 뱃지 표시

- **통계 카드**:
  - 총 WOD 수
  - PR 기록 수
  - 총 운동 시간

---

## 🧩 주요 컴포넌트 설명

### Layout Components

#### `MainLayout.tsx`
- 전체 레이아웃 래퍼
- 사이드바 + 메인 콘텐츠 영역 구성
- 반응형 레이아웃 제공

#### `Sidebar.tsx` (145줄)
- 좌측 네비게이션 메뉴
- 5개 주요 라우트 링크
- 활성 페이지 하이라이트

#### `Header.tsx` (188줄)
- 상단 헤더 바
- **LIVE 타이머**: 실시간 운동 타이머 기능
- 알림 아이콘
- 빠른 운동 로깅 버튼

### Chart Components

#### `StrengthRadarChart.tsx` (154줄)
- 6축 레이더 차트 (Recharts 기반)
- 운동 능력 시각화
- 반응형 차트 크기

#### `OneRMTrendChart.tsx` (236줄)
- 라인 차트로 1RM 추이 표시
- 다중 운동 종목 비교
- 시간축 기반 시각화

#### `RecentWODs.tsx` (136줄)
- WOD 목록 + 퍼포먼스 차트
- 운동 강도별 색상 코딩
- 그라데이션 차트 라인

### Modal Components

#### `QuickWorkoutLogModal.tsx` (227줄)
- 빠른 운동 기록 입력
- 폼 기반 UI
- RPE 슬라이더
- 컨디션 선택 (Good/Average/Bad)

#### `WorkoutSummaryModal.tsx` (169줄)
- 운동 완료 후 요약 표시
- 통계 및 비교 데이터
- PR 달성 알림

### Card Components

#### `OneRMCard.tsx` (95줄)
- 1RM 기록 표시 카드
- 4가지 색상 테마 지원
- 트렌드 아이콘 및 퍼센티지

#### `UnbrokenRecordCard.tsx` (68줄)
- 언브로큰 기록 그리드 레이아웃
- PR 뱃지 표시
- 2열 그리드 구성

#### `ProfileCard.tsx` (84줄)
- 사용자 프로필 정보
- 박스 정보 (위치, 멤버 수)
- 간단한 통계 (WOD, PR, 시간)

### Utility Components

#### `Tooltip.tsx` (33줄)
- 재사용 가능한 툴팁 컴포넌트
- 호버 시 정보 표시

---

## 📊 데이터 구조

### 더미 데이터 (dummyData.ts - 687줄)

현재는 모든 데이터가 하드코딩된 더미 데이터로 구성되어 있습니다.

**주요 데이터 타입**:

```typescript
// 사용자 프로필
interface UserProfile {
  name: string;
  box: string;
  memberSince: string;
  level: string;
}

// 1RM 테스트 기록
interface OneRMTest {
  exercise: string;
  weight: number;
  unit: string;
  date: string;
  trend: number;
  color: 'pink' | 'blue' | 'green' | 'orange';
}

// 기술 기록
interface SkillRecord {
  skill: string;
  level: 'achieved' | 'in-progress' | 'not-started';
  date?: string;
}

// WOD 기록
interface WODRecord {
  date: string;
  name: string;
  type: 'For Time' | 'AMRAP' | 'EMOM' | 'Tabata';
  time: string;
  intensity: 'high' | 'medium' | 'low';
  rpe: number; // 1-10
  notes: string;
}

// 출석 기록
interface AttendanceRecord {
  date: string;
  attended: boolean;
}
```

---

## 🎯 사용자 플로우

### 1. 대시보드 진입
1. 앱 실행 → 메인 대시보드 표시
2. 오늘의 인사이트 확인
3. 최근 운동 기록 및 트렌드 확인
4. 레이더 차트로 현재 능력 파악

### 2. WOD 전략 수립
1. 상단 헤더 또는 사이드바에서 "WOD Strategy" 클릭
2. 블록 추가 버튼으로 운동 블록 생성
3. 각 블록에 운동 상세 정보 입력
4. AI 전략 분석 버튼 클릭
5. AI 제안 확인 및 전략 수정
6. 이미지 업로드 (선택)
7. 저장 또는 템플릿 저장

### 3. 운동 로깅
1. 헤더의 "Quick Log" 버튼 클릭
2. 운동명, 시간, 무게 입력
3. RPE 및 컨디션 선택
4. 메모 작성 (선택)
5. 저장
6. 운동 요약 모달 확인

### 4. 기록 조회
1. 사이드바에서 "Logbook" 클릭
2. 날짜별 또는 운동 타입별 필터링
3. 특정 운동 기록 클릭
4. 상세 정보 및 요약 확인

### 5. 프로필 관리
1. 사이드바에서 "Profile" 클릭
2. 프로필 정보 수정
3. 1RM 기록 업데이트
4. 언브로큰 기록 확인

---

## 🔄 향후 개발 계획

### 데이터 영속성
- [ ] LocalStorage 연동
- [ ] 백엔드 API 연동
- [ ] 데이터베이스 구축

### 기능 확장
- [ ] Stats 페이지 완성 (현재 플레이스홀더)
- [ ] 소셜 기능 (친구 추가, 기록 공유)
- [ ] 목표 설정 및 추적
- [ ] 운동 계획 자동 생성
- [ ] 영양 관리 기능

### UI/UX 개선
- [ ] 다크 모드 지원
- [ ] 애니메이션 강화
- [ ] 접근성 개선 (ARIA 라벨)
- [ ] PWA 지원 (오프라인 모드)

### 성능 최적화
- [ ] 코드 스플리팅
- [ ] 이미지 최적화
- [ ] 번들 크기 축소
- [ ] 지연 로딩 (Lazy Loading)

---

## 📁 프로젝트 구조

```
CLAUDECODE/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── layout/          # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── AIWODStrategy.tsx
│   │   ├── OneRMCard.tsx
│   │   ├── OneRMTrendChart.tsx
│   │   ├── ProfileCard.tsx
│   │   ├── QuickWorkoutLogModal.tsx
│   │   ├── RecentWODs.tsx
│   │   ├── StrengthRadarChart.tsx
│   │   ├── Tooltip.tsx
│   │   ├── UnbrokenRecordCard.tsx
│   │   └── WorkoutSummaryModal.tsx
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Dashboard.tsx
│   │   ├── Logbook.tsx
│   │   ├── Profile.tsx
│   │   ├── Stats.tsx        # (플레이스홀더)
│   │   └── WODStrategy.tsx
│   ├── data/
│   │   └── dummyData.ts     # 더미 데이터
│   ├── App.tsx              # 라우터 설정
│   ├── main.tsx             # 엔트리 포인트
│   └── index.css            # 글로벌 스타일
├── public/                  # 정적 자산
├── index.html               # HTML 템플릿
├── package.json             # 의존성 관리
├── vite.config.ts           # Vite 설정
├── tailwind.config.js       # Tailwind CSS 설정
├── tsconfig.json            # TypeScript 설정
├── README.md                # 프로젝트 소개
└── DOCUMENTATION.md         # 이 문서
```

---

## 🛠 개발 환경 설정

### 필요 사항
- Node.js 18+
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 린트 검사
npm run lint
```

### 개발 서버
- **URL**: http://localhost:5173
- **HMR**: 자동 핫 리로드 지원
- **TypeScript**: 실시간 타입 체크

---

## 🎨 디자인 원칙

### 1. 모바일 우선 (Mobile-first)
- 모든 UI는 모바일에서 먼저 설계
- 터치 영역 최소 44px 준수
- 반응형 레이아웃

### 2. 명확성 (Clarity)
- 간결한 텍스트
- 명확한 아이콘
- 직관적인 인터랙션

### 3. 일관성 (Consistency)
- 통일된 색상 시스템
- 동일한 간격 체계
- 재사용 가능한 컴포넌트

### 4. 피드백 (Feedback)
- 호버 효과
- 로딩 상태 표시
- 성공/실패 메시지

### 5. 접근성 (Accessibility)
- 충분한 색상 대비
- 키보드 네비게이션 지원
- 스크린 리더 호환 (진행 중)

---

## 📝 코딩 컨벤션

### TypeScript
- 명시적 타입 선언
- Interface 우선 사용
- Strict 모드 활성화

### React
- 함수형 컴포넌트 사용
- Hooks 기반 상태 관리
- Props 타입 명시

### CSS (Tailwind)
- 유틸리티 클래스 우선
- 커스텀 색상은 config에 정의
- 반응형 클래스 사용 (sm:, md:, lg:)

### 파일 구조
- PascalCase: 컴포넌트 파일 (예: `Dashboard.tsx`)
- camelCase: 유틸리티 파일 (예: `dummyData.ts`)
- kebab-case: CSS 파일 (예: `index.css`)

---

## 🔍 트러블슈팅

### 빌드 에러
1. `node_modules` 삭제 후 재설치
2. TypeScript 버전 확인
3. Vite 캐시 삭제 (`.vite` 폴더)

### 스타일 적용 안 됨
1. Tailwind config 확인
2. CSS 파일 import 확인
3. PostCSS 플러그인 확인

### 라우팅 문제
1. React Router 버전 확인
2. 라우트 경로 확인
3. BrowserRouter 설정 확인

---

## 📞 문의 및 기여

프로젝트에 대한 문의나 기여는 GitHub 이슈를 통해 주시기 바랍니다.

**라이선스**: MIT

---

**마지막 업데이트**: 2025-11-19
**버전**: 1.0.0
**작성자**: FitterBoard Team
