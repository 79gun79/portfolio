# Contributing Guide

## 개발 환경 설정

### 필수 요구사항

- Node.js 18+
- pnpm (권장) 또는 npm

### 초기 설정

```bash
# 1. 저장소 클론
git clone https://github.com/79gun79/portfolio.git
cd portfolio

# 2. 의존성 설치
pnpm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일을 편집하여 Firebase 자격 증명 입력
```

## 사용 가능한 스크립트

| 스크립트 | 명령어 | 설명 |
|----------|--------|------|
| `dev` | `pnpm dev` | Vite 개발 서버 실행 (HMR 지원) |
| `build` | `pnpm build` | TypeScript 컴파일 + Vite 프로덕션 빌드 |
| `lint` | `pnpm lint` | ESLint로 코드 검사 |
| `preview` | `pnpm preview` | 프로덕션 빌드 미리보기 서버 실행 |

## 환경 변수

`.env.example` 참조. 모든 변수는 `VITE_` 접두사를 사용하며 Firebase 프로젝트 설정에서 확인 가능합니다.

| 변수 | 목적 | 형식 |
|------|------|------|
| `VITE_FIREBASE_API_KEY` | Firebase API 키 | 문자열 |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase 인증 도메인 | `{project}.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID | 문자열 |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage 버킷 | `{project}.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | FCM 발신자 ID | 숫자 문자열 |
| `VITE_FIREBASE_APP_ID` | Firebase 앱 ID | `1:{id}:web:{hash}` |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics 측정 ID | `G-XXXXXXXXXX` |

## 기술 스택

- **프레임워크**: React 19 + TypeScript 5.9
- **스타일링**: Tailwind CSS 4
- **빌드 도구**: Vite 7
- **백엔드**: Firebase (Firestore, Auth, Hosting)
- **라이브러리**: Motion (애니메이션), Lucide React (아이콘), React Router DOM (라우팅), React Markdown (포스트 렌더링), React Type Animation (타이핑 효과)

## 프로젝트 구조

```
src/
├── api/            # API 호출 함수 (post.ts, auth.ts)
├── components/     # React 컴포넌트
│   ├── ui/         # 재사용 가능한 UI 컴포넌트
│   ├── Footer.tsx  # 사이트 푸터
│   ├── Home.tsx    # 홈 섹션
│   ├── Navigation.tsx
│   ├── Post.tsx    # 포스트 카드
│   ├── Posts.tsx   # 포스트 목록
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── Start.tsx   # 히어로 섹션
├── data/           # 정적 데이터 (프로젝트, 포스트)
├── hooks/          # 커스텀 React 훅 (useAuth.ts)
├── page/           # 페이지 컴포넌트
│   ├── Login.tsx
│   └── PostDetail.tsx
├── services/       # Firebase 서비스 래퍼
├── style/          # 전역 스타일
├── types/          # TypeScript 타입 정의
└── util/           # 유틸리티 함수
```

## 개발 워크플로우

1. `main` 브랜치에서 기능 브랜치 생성
2. `pnpm dev`로 개발 서버 실행
3. 코드 변경 후 `pnpm lint`로 검사
4. `pnpm build`로 빌드 성공 확인
5. 커밋 메시지는 컨벤셔널 커밋 형식 사용 (`feat:`, `fix:`, `refactor:` 등)

## 테스트

현재 테스트 프레임워크가 설정되어 있지 않습니다. 추후 추가 예정.
