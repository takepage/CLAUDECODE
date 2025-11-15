# CrossFit Tracker Dashboard

크로스핏터를 위한 운동 기록 및 데이터 시각화 웹 애플리케이션입니다.

## 주요 기능

### 📊 강점 분석 육각형 그래프
- 역도, 체조, 심폐지구력, 파워, 근지구력, 유연성 6가지 카테고리
- 시각적으로 본인의 강점과 약점을 한눈에 파악
- 데이터 기반 전략적 운동 계획 수립 가능

### 💪 1RM 기록 관리
- **역도 1RM**: Snatch, Clean & Jerk
- **3대 운동 1RM**: Back Squat, Bench Press, Deadlift
- 최근 갱신 날짜 및 향상률(%) 표시
- 네온 컬러로 구분된 직관적인 카드 디자인

### 🔥 언브로큰 기록
- 바 머슬업, 풀업, T2B, 더블언더 등
- 연속 수행 최고 기록 추적
- PR(Personal Record) 뱃지 표시

### 📈 운동 통계
- 이번 주 운동 횟수
- 총 운동 일수
- 달성한 PR 개수
- 평균 운동 시간

### 📅 최근 WOD 기록
- 최근 2주간의 운동 기록
- 퍼포먼스 트렌드 차트
- 운동 타입별 분류 (For Time, AMRAP 등)
- 강도 표시 (High, Medium, Low)

### 🏋️ 프로필 & 박스 정보
- 현재 다니는 박스 정보
- 멤버 시작일
- 총 WOD 횟수, PR 기록, 운동 시간 요약

## 디자인 특징

### 🎨 다크 모드 & 네온 컬러
- 눈의 피로를 줄이는 차콜 그레이 배경
- 네온 핑크, 블루, 그린, 오렌지 강조 색상
- 데이터 성격에 따른 기능적 색상 사용

### ✨ 모던한 UI/UX
- **극도로 둥근 모서리** (High Border-Radius)
- **글래스모피즘** (Glassmorphism) 효과
- **글로우 효과** (Glow Effect)로 하이테크적 느낌
- 부드러운 곡선의 차트 디자인
- 완벽한 반응형 레이아웃

## 기술 스택

- **React 18** + **TypeScript**
- **Vite** - 빠른 개발 환경
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Recharts** - 데이터 시각화 라이브러리
- **Lucide React** - 아이콘 라이브러리

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 을 열어주세요.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 프리뷰

```bash
npm run preview
```

## 프로젝트 구조

```
src/
├── components/
│   ├── StrengthRadarChart.tsx    # 육각형 강점 분석 그래프
│   ├── OneRMCard.tsx              # 1RM 기록 카드
│   ├── UnbrokenRecordCard.tsx     # 언브로큰 기록 카드
│   ├── StatsCard.tsx              # 통계 카드
│   ├── ProfileCard.tsx            # 프로필 & 박스 정보
│   └── RecentWODs.tsx             # 최근 WOD 기록
├── App.tsx                        # 메인 대시보드
├── index.css                      # 글로벌 스타일
└── main.tsx                       # 앱 엔트리 포인트
```

## 향후 계획

- [ ] 운동 기록 입력 기능
- [ ] 데이터 영속성 (로컬 스토리지 / 백엔드 연동)
- [ ] 운동 기록 상세 페이지
- [ ] 통계 페이지 (월별, 연도별 분석)
- [ ] 목표 설정 및 진행률 추적
- [ ] 다른 크로스핏터와 비교 기능
- [ ] PWA 지원

## 라이선스

MIT

---

Built with ❤️ for CrossFit Athletes
