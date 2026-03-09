# Firebase Google Login: 팝업 방식으로 안정화

## 문제 상황

Redirect 방식의 Google 로그인을 사용하던 중, 특정 케이스에서 `no-result` 오류가 발생하는 문제를 발견했습니다.

## 해결 과정

1. **문제 분석**: Redirect 방식은 페이지 전환 시 상태가 손실되는 경우가 있었습니다.
2. **솔루션 선택**: 팝업 방식으로 전환하여 페이지 상태를 유지하면서 인증을 처리하도록 변경했습니다.
3. **구현**: `signInWithPopup` API를 사용하여 안정적인 로그인 플로우를 구현했습니다.

## 결과

팝업 방식 도입으로 인증 성공률이 향상되었고, 사용자 경험이 개선되었습니다.

## 기술 스택

- Firebase Authentication
- React
- TypeScript
