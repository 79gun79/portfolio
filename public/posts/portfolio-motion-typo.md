# 포트폴리오 메인 섹션 모션/타이포 다듬기

## 개선 목표

랜딩 페이지의 첫인상을 개선하고, 사용자에게 더 나은 경험을 제공하기 위해 모션과 타이포그래피를 정리했습니다.

## 주요 변경사항

### 1. 타이포그래피 스케일 정리

- 제목 크기: `text-5xl` → `text-6xl`
- 부제목: `text-xl` → `text-2xl`
- 일관된 `font-weight` 적용

### 2. 모션 개선

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  {/* Content */}
</motion.div>
```

- 자연스러운 fade-in 효과
- 부드러운 easing 적용
- 적절한 delay로 순차적 등장

### 3. 레이아웃 리듬

- 섹션 간 일관된 spacing 적용
- 시각적 계층 구조 명확화

## 결과

더 프로페셔널하고 세련된 첫인상을 주는 랜딩 페이지가 완성되었습니다.
