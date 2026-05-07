# Runbook

## 배포 절차

### Firebase Hosting 배포

```bash
# 1. 프로덕션 빌드
pnpm build

# 2. Firebase 로그인 (최초 1회)
firebase login

# 3. 배포
firebase deploy --only hosting
```

배포 URL: https://official-gunblog.web.app/

### Firestore Rules 배포

```bash
firebase deploy --only firestore:rules
```

## 배포 설정

- `firebase.json`: Hosting 및 Firestore 설정
- 빌드 출력: `dist/` 디렉토리
- SPA 리라이트: 모든 경로 → `/index.html`

## 일반적인 문제와 해결

### 빌드 실패

```bash
# TypeScript 오류 확인
npx tsc --noEmit

# 의존성 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 환경 변수 누락

증상: Firebase 초기화 실패, 콘솔에 `undefined` 관련 오류

해결:
1. `.env` 파일 존재 확인
2. 모든 `VITE_FIREBASE_*` 변수가 설정되었는지 확인
3. 개발 서버 재시작 (환경 변수 변경 시 필수)

### Firebase 인증 오류

증상: 로그인 실패, 403 오류

해결:
1. Firebase 콘솔에서 Authentication 제공업체 활성화 확인
2. 승인된 도메인 목록에 현재 도메인 추가

### 배포 후 404

증상: 직접 URL 접근 시 404

해결: `firebase.json`의 `rewrites` 설정 확인 (SPA 리라이트 필요)

### Firestore 데이터 만료 (캐시 stale)

증상: 포스트 데이터가 오래된 상태로 표시되거나 업데이트가 반영되지 않음

해결:
1. `firebase.json`의 캐시 설정 확인
2. Firestore 규칙 재배포: `firebase deploy --only firestore:rules`
3. 브라우저 캐시 강제 갱신 후 재확인

## 롤백 절차

```bash
# 최근 배포 목록 확인
firebase hosting:channel:list

# 이전 버전으로 롤백
firebase hosting:rollback
```

## 모니터링

- Firebase 콘솔: https://console.firebase.google.com/
- Google Analytics: `VITE_FIREBASE_MEASUREMENT_ID`로 연동됨
- Firestore 사용량: Firebase 콘솔 > Firestore > 사용량 탭
