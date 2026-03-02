import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Skeleton } from './ui/Skeleton';
import { Spinner } from './ui/Spinner';
import {
  Code,
  Mail,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  FolderKanban,
} from 'lucide-react';

type ProfileItem = {
  label: string;
  value: ReactNode;
  icon: LucideIcon;
};

type HistoryItem = {
  type: '학력' | '경력' | '활동';
  period: string;
  title: string;
  details?: ReactNode[];
  icon: LucideIcon;
};

const profileItems: ProfileItem[] = [
  {
    label: '이메일',
    value: (
      <a
        href="mailto:79gun79@naver.com"
        className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
      >
        79gun79@naver.com
      </a>
    ),
    icon: Mail,
  },
  {
    label: '생년월일',
    value: '2000-08-01',
    icon: Calendar,
  },
  {
    label: '주소',
    value: 'Gyeonggi-do, Siheung, KR',
    icon: MapPin,
  },
];

export function About() {
  const [isPaperPreviewOpen, setIsPaperPreviewOpen] = useState(false);
  const [isBojBadgePreviewOpen, setIsBojBadgePreviewOpen] = useState(false);
  const [bojBadgeStatus, setBojBadgeStatus] = useState<
    'idle' | 'loading' | 'loaded' | 'error'
  >('idle');
  const [bojBadgeReloadKey, setBojBadgeReloadKey] = useState(0);
  const [paperStatus, setPaperStatus] = useState<
    'idle' | 'loading' | 'loaded' | 'error'
  >('idle');
  const [paperLoadedCount, setPaperLoadedCount] = useState(0);
  const [paperReloadKey, setPaperReloadKey] = useState(0);

  useEffect(() => {
    if (!isBojBadgePreviewOpen || bojBadgeStatus !== 'loading') return;
    const timeoutId = window.setTimeout(() => {
      setBojBadgeStatus((status) => (status === 'loading' ? 'error' : status));
    }, 10000);
    return () => window.clearTimeout(timeoutId);
  }, [isBojBadgePreviewOpen, bojBadgeStatus, bojBadgeReloadKey]);

  useEffect(() => {
    if (!isPaperPreviewOpen || paperStatus !== 'loading') return;
    const timeoutId = window.setTimeout(() => {
      setPaperStatus((status) => (status === 'loading' ? 'error' : status));
    }, 10000);
    return () => window.clearTimeout(timeoutId);
  }, [isPaperPreviewOpen, paperStatus, paperReloadKey]);

  const openBojBadgePreview = () => {
    setBojBadgeStatus('loading');
    setBojBadgeReloadKey((k) => k + 1);
    setIsBojBadgePreviewOpen(true);
  };

  const closeBojBadgePreview = () => {
    setIsBojBadgePreviewOpen(false);
  };

  const openPaperPreview = () => {
    setPaperStatus('loading');
    setPaperLoadedCount(0);
    setPaperReloadKey((k) => k + 1);
    setIsPaperPreviewOpen(true);
  };

  const closePaperPreview = () => {
    setIsPaperPreviewOpen(false);
  };

  const historyItems: HistoryItem[] = [
    {
      type: '학력',
      period: '2019.03 - 2025.02',
      title: '성결대학교 컴퓨터공학과',
      details: [
        <>
          교내 알고리즘 스터디를 통해, 코딩테스트 실력 향상 →{' '}
          <button
            type="button"
            onClick={openBojBadgePreview}
            className="cursor-pointer font-bold text-emerald-600 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-700 hover:decoration-emerald-600"
          >
            백준 Tier Gold 1
          </button>
        </>,
        <>
          2023 한국디지털콘텐츠학회 하계종합학술제 <b>동상</b> 수상 (
          <button
            type="button"
            onClick={openPaperPreview}
            className="ml-1 cursor-pointer font-bold text-emerald-600 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-700 hover:decoration-emerald-600"
          >
            논문보기
          </button>
          )
        </>,
        <div>
          <div>교내 설계프로젝트 경진대회 수상 다수</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-600 sm:text-base">
            <li>23-1 모바일프로그래밍 경진대회 대상</li>
            <li>23-2 머신러닝 경진대회 대상</li>
            <li>23-2 전공종합설계(1) 경진대회 장려상</li>
            <li>23-2 전공종합설계(2) 경진대회 장려상</li>
          </ul>
        </div>,
        <>
          졸업 작품, <b>OCR 기술 활용</b>,{' '}
          <b>고령층 비서 애플리케이션 푸르바(Purba)</b> 제작
        </>,
        <>
          <span className="font-semibold text-slate-700">학점(전공): </span>
          <span className="font-bold text-green-900">4.27(4.42) / 4.5</span>
        </>,
      ],
      icon: GraduationCap,
    },
    {
      type: '활동',
      period: '2025.03 - 2025.08',
      title: '프로그래머스 데브코스 | 프론트엔드 4기 5회차',
      details: [
        <>
          <b>JavaScript</b> 심화 후 <b>TypeScript</b> 학습 (타입 안정성 체감)
        </>,
        <>
          <b>React</b> 실습/프로젝트 수행 (API 호출·로딩 UI 최적화)
        </>,
        <>
          <b>Vue</b> +{' '}
          <a
            href="https://boisterous-babka-7df143.netlify.app/"
            target="_blank"
            rel="noreferrer noopener"
            className="font-bold text-emerald-600 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-700 hover:decoration-emerald-600"
          >
            영화 정보 API
          </a>{' '}
          실습 (Swiper 슬라이드)
        </>,
        <>
          <b>Next.js</b> + <b>Supabase</b> 인증 실습 (미들웨어 활용)
        </>,
        <>
          <b>Tailwind CSS</b> 기반 빠른 스타일링
        </>,
        <>GitHub 브랜치/PR 전략으로 코드리뷰·형상관리</>,
        <>팀 프로젝트 4회 팀장 (조율·협업 경험)</>,
        <>Notion·기술 블로그로 학습/회고 정리</>,
      ],
      icon: FolderKanban,
    },
    {
      type: '경력',
      period: '2026.02 - 현재',
      title: '(주)아크스퀘어 | 프론트엔드 개발자',
      details: [
        <>
          <b>MES</b> 기반 엔터프라이즈 <b>제조 도메인</b> 업무 화면 및{' '}
          <b>모니터링 대시보드</b> 개발
        </>,
        <>
          <a
            href="https://arcsquare.ai/"
            target="_blank"
            rel="noreferrer noopener"
            className="font-bold text-emerald-600 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-700 hover:decoration-emerald-600"
          >
            공식 홈페이지
          </a>{' '}
          개발 및 다양한 프로젝트 참여
        </>,
        <>
          <b>그룹웨어</b>(전자결재·협업), <b>인사/근태</b> 등 업무시스템 확장
          개발
        </>,
        <>
          <b>Next.js</b> 기반 <b>SSR/SSG</b> 구조 설계 및 <b>성능 최적화</b>
        </>,
        <>
          <b>Tailwind CSS</b> 기반 UI 설계 및 <b>공통 컴포넌트/디자인 시스템</b>{' '}
          구축
        </>,
        <>
          <b>데이터 시각화</b>(차트·리포트·모니터링) 및 <b>테이블/그리드</b>{' '}
          화면 구현
        </>,
        <>
          <b>백엔드 API</b> 연동 및 클라이언트 데이터 처리 (<b>React Query</b>,{' '}
          <b>SWR</b>
          등)
        </>,
        <>
          UI 개선 및 <b>테스트/품질 관리</b> (유닛 테스트, 통합 테스트 등)
        </>,
      ],
      icon: Briefcase,
    },
  ];

  return (
    <section
      id="about"
      className="bg-white px-4 py-20 sm:px-6 sm:py-32 lg:py-48"
    >
      {isBojBadgePreviewOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="백준 배지 미리보기"
          onClick={closeBojBadgePreview}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-4 shadow-xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="text-lg font-bold text-slate-900">백준 배지</div>
              <button
                type="button"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-900"
                onClick={closeBojBadgePreview}
              >
                닫기
              </button>
            </div>

            <div className="flex justify-center">
              <div className="w-full">
                {bojBadgeStatus === 'loading' ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-14">
                    <Spinner size="lg" thickness="thick" label="배지 로딩" />
                    <div className="w-full max-w-lg space-y-3">
                      <Skeleton className="h-6 w-44" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-11/12" />
                      <Skeleton className="h-64 w-full rounded-xl" />
                    </div>
                    <div className="text-sm text-slate-500">
                      배지를 불러오는 중입니다...
                    </div>
                  </div>
                ) : null}

                {bojBadgeStatus === 'error' ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                    <div className="text-base font-semibold text-slate-900">
                      배지를 불러오지 못했습니다.
                    </div>
                    <div className="text-sm text-slate-600">
                      네트워크 상태를 확인한 뒤 다시 시도해주세요.
                    </div>
                    <button
                      type="button"
                      className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-900"
                      onClick={() => {
                        setBojBadgeStatus('loading');
                        setBojBadgeReloadKey((k) => k + 1);
                      }}
                    >
                      다시 시도
                    </button>
                  </div>
                ) : null}

                <img
                  key={bojBadgeReloadKey}
                  src="https://mazassumnida.wtf/api/v2/generate_badge?boj=79gun79"
                  alt="Baekjoon badge for 79gun79"
                  className={`mx-auto block max-w-full transition-opacity duration-200 ${
                    bojBadgeStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="eager"
                  onLoad={() => setBojBadgeStatus('loaded')}
                  onError={() => setBojBadgeStatus('error')}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isPaperPreviewOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="학회 논문 미리보기"
          onClick={closePaperPreview}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="text-lg font-bold text-slate-900">
                학회 논문 미리보기
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-900"
                onClick={closePaperPreview}
              >
                닫기
              </button>
            </div>

            <div className="space-y-6">
              {paperStatus === 'loading' ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Spinner
                      size="sm"
                      thickness="thin"
                      label="논문 미리보기 로딩"
                    />
                    미리보기를 불러오는 중입니다... ({paperLoadedCount}/2)
                  </div>
                  <Skeleton className="h-105 w-full rounded-xl border border-slate-200" />
                  <Skeleton className="h-105 w-full rounded-xl border border-slate-200" />
                </div>
              ) : null}

              {paperStatus === 'error' ? (
                <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                  <div className="text-base font-semibold text-slate-900">
                    미리보기를 불러오지 못했습니다.
                  </div>
                  <div className="text-sm text-slate-600">
                    이미지 경로(`/public`)를 확인한 뒤 다시 시도해주세요.
                  </div>
                  <button
                    type="button"
                    className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-900"
                    onClick={() => {
                      setPaperStatus('loading');
                      setPaperLoadedCount(0);
                      setPaperReloadKey((k) => k + 1);
                    }}
                  >
                    다시 시도
                  </button>
                </div>
              ) : null}

              <img
                key={`paper-${paperReloadKey}-1`}
                src="/paper_page_1.png"
                alt="학회논문 1페이지"
                className={`w-full rounded-xl border border-slate-200 transition-opacity duration-200 ${
                  paperStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                onLoad={() => {
                  setPaperLoadedCount((count) => {
                    const next = count + 1;
                    if (next >= 2) setPaperStatus('loaded');
                    return next;
                  });
                }}
                onError={() => setPaperStatus('error')}
              />
              <img
                key={`paper-${paperReloadKey}-2`}
                src="/paper_page_2.png"
                alt="학회논문 2페이지"
                className={`w-full rounded-xl border border-slate-200 transition-opacity duration-200 ${
                  paperStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                onLoad={() => {
                  setPaperLoadedCount((count) => {
                    const next = count + 1;
                    if (next >= 2) setPaperStatus('loaded');
                    return next;
                  });
                }}
                onError={() => setPaperStatus('error')}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-20 sm:mb-32"
        >
          <div className="mb-4 text-sm font-medium text-slate-500 sm:mb-6 sm:text-base">
            About Me
          </div>
          <h2 className="mb-6 text-3xl text-slate-900 sm:mb-8 sm:text-5xl lg:text-6xl">
            반갑습니다! 저는..
          </h2>
        </motion.div>

        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-24 sm:mb-32 lg:mb-40"
        >
          <div className="mb-6 flex items-start gap-4">
            <Mail className="mt-1 h-6 w-6 shrink-0 text-slate-900" />
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
              기본 정보
            </h3>
          </div>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {profileItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
              >
                <dt className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <item.icon className="h-4 w-4 text-slate-900" />
                  {item.label}
                </dt>
                <dd className="text-base text-slate-600">{item.value}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-24 sm:mb-32 lg:mb-40"
        >
          <div className="mb-6 flex items-start gap-4">
            <FolderKanban className="mt-1 h-6 w-6 shrink-0 text-slate-900" />
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
              연혁
            </h3>
          </div>

          <div className="mt-10 max-w-4xl space-y-6">
            {historyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800">
                    <item.icon className="h-4 w-4" />
                    {item.type}
                  </span>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-900">
                    {item.period}
                  </span>
                </div>

                <h4 className="mb-2 text-lg font-bold text-slate-900 sm:text-xl">
                  {item.title}
                </h4>
                {item.details && item.details.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {item.details.map((line, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-start gap-3 text-base leading-relaxed text-slate-600 sm:text-lg"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                        <div className="min-w-0 flex-1">{line}</div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 핵심 가치 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-800 via-green-800 to-emerald-950 p-8 text-white shadow-xl shadow-emerald-900/15 sm:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <Code className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                핵심 가치
              </h3>
            </div>
            <div className="max-w-4xl space-y-4 text-base leading-relaxed text-emerald-50/95 sm:text-lg">
              <p className="text-white">
                좋은 개발자는 코드만 잘 짜는 사람이 아니라고 생각합니다.
              </p>
              <p className="text-emerald-50/80">
                문제의 맥락을 이해하고, 동료와 소통하며,
                <br />
                지속 가능한 시스템을 만드는 것이 더 중요합니다.
              </p>
              <p className="pt-4 font-semibold text-white">
                기술은 도구이고, 목표는 문제 해결입니다.
                <br />그 과정에서 함께 성장하는 것을 가장 중요하게 생각합니다.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
