import { useId, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Code,
  Palette,
  Database,
  Wrench,
  BadgeCheck,
  Layers,
  Store,
} from 'lucide-react';
import {
  siGit,
  siGithub,
  siFirebase,
  siJavascript,
  siNextdotjs,
  siNotion,
  siPython,
  siReact,
  siStorybook,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
} from 'simple-icons/icons';

type BrandIcon = {
  title?: string;
  hex: string;
  path: string;
};

type SkillItem = {
  id: string;
  title: string;
  keyword: string;
  description: string;
  logos?: BrandIcon[];
  icon?: LucideIcon;
  imageSrc?: string;
  imageAlt?: string;
  tone: 'emerald' | 'slate' | 'indigo' | 'amber';
};

type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: SkillItem[];
};

function toneClasses(tone: SkillItem['tone']) {
  switch (tone) {
    case 'emerald':
      return {
        iconWrap: 'bg-green-50 text-green-700 ring-green-100',
        overlay: 'from-green-900/92 via-slate-900/92 to-green-900/85',
      };
    case 'indigo':
      return {
        iconWrap: 'bg-indigo-50 text-indigo-700 ring-indigo-100',
        overlay: 'from-indigo-900/92 via-slate-900/92 to-indigo-900/85',
      };
    case 'amber':
      return {
        iconWrap: 'bg-amber-50 text-amber-800 ring-amber-100',
        overlay: 'from-amber-900/92 via-slate-900/92 to-amber-900/85',
      };
    case 'slate':
    default:
      return {
        iconWrap: 'bg-slate-100 text-slate-700 ring-slate-200',
        overlay: 'from-slate-900/92 via-slate-900/92 to-slate-800/85',
      };
  }
}

function BrandLogo({
  icon,
  className,
}: {
  icon: BrandIcon;
  className: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={{ color: `#${icon.hex}` }}
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

function SkillCard({
  item,
  isOpen,
  onToggle,
}: {
  item: SkillItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  const tones = toneClasses(item.tone);
  const logos = item.logos ?? [];
  const isMultiLogo = logos.length > 1;
  const FallbackIcon = item.icon;
  const imageSrc = item.imageSrc;

  return (
    <button
      type="button"
      onClick={() => onToggle(item.id)}
      aria-expanded={isOpen}
      className="group relative h-full min-h-32 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:min-h-36 sm:p-5"
    >
      <div className="flex items-start gap-4">
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${tones.iconWrap}`}
          aria-hidden="true"
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={item.imageAlt ?? ''}
              className="h-7 w-7 object-contain"
              loading="lazy"
              draggable={false}
            />
          ) : logos.length > 0 && isMultiLogo ? (
            <span className="grid grid-cols-2 gap-1">
              {logos.slice(0, 2).map((logo) => (
                <BrandLogo
                  key={logo.title ?? logo.path}
                  icon={logo}
                  className="h-5 w-5"
                />
              ))}
            </span>
          ) : logos.length > 0 ? (
            <BrandLogo icon={logos[0]} className="h-6 w-6" />
          ) : FallbackIcon ? (
            <FallbackIcon className="h-6 w-6" />
          ) : null}
        </span>

        <div className="min-w-0 flex-1">
          <div className="min-w-0">
            <div className="truncate text-base font-bold text-slate-900">
              {item.title}
            </div>
            <div className="mt-1 truncate text-sm font-medium text-slate-600">
              {item.keyword}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 p-5 opacity-0 transition duration-200 ${
          isOpen ? 'opacity-100' : 'group-hover:opacity-100'
        }`}
        aria-hidden={!isOpen}
      >
        <div className={`absolute inset-0 bg-linear-to-br ${tones.overlay}`} />
        <div className="relative flex h-full w-full flex-col">
          <div className="flex-1 overflow-auto pr-1 text-sm leading-relaxed text-white/95 [scrollbar-width:thin]">
            {item.description}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Skills() {
  const sectionLabelId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  const groups: SkillGroup[] = useMemo(
    () => [
      {
        title: 'Framework & State',
        icon: Layers,
        items: [
          {
            id: 'next-react',
            title: 'Next.js & React',
            keyword: 'SSR · SEO · Routing',
            description:
              'SEO 최적화와 SSR을 활용한 빠른 초기 렌더링을 중시합니다. 직관적이고 효율적인 라우팅 설계로 사용자 경험을 개선하고, 안정적인 웹 아키텍처를 구축하는 데 주력합니다.',
            logos: [siNextdotjs, siReact],
            tone: 'emerald',
          },
          {
            id: 'vue',
            title: 'Vue',
            keyword: 'SFC · 반응성 · 컴포넌트 설계',
            description:
              '단일 파일 컴포넌트(SFC) 기반으로 화면을 구조화하고, 반응성 시스템을 이해한 상태 관리/렌더링 최적화에 집중합니다. Composition API를 중심으로 재사용 가능한 UI 로직을 모듈화하고, 컴포넌트 경계를 명확히 나눠 유지보수하기 쉬운 구조를 지향합니다.',
            logos: [siVuedotjs],
            tone: 'emerald',
          },
          {
            id: 'zustand',
            title: 'Zustand',
            keyword: '전역 상태 · Store 설계 · 간결한 API',
            description:
              '불필요한 보일러플레이트를 줄이면서도 예측 가능한 전역 상태를 구성합니다. selector 기반 구독으로 리렌더링 범위를 제어하고, derived state/비동기 액션/영속화(persist) 등을 활용해 화면 규모가 커져도 흐름이 무너지지 않도록 스토어를 설계합니다.',
            icon: Store,
            tone: 'indigo',
          },
        ],
      },
      {
        title: 'Languages',
        icon: Code,
        items: [
          {
            id: 'javascript',
            title: 'JavaScript',
            keyword: 'Core 이해 · 알고리즘 · 비즈니스 로직',
            description:
              '꾸준한 알고리즘 문제 해결을 통해 언어의 코어 동작 원리를 깊이 이해하고, 복잡한 프론트엔드 비즈니스 로직을 탄탄하게 구현합니다.',
            logos: [siJavascript],
            tone: 'amber',
          },
          {
            id: 'typescript',
            title: 'TypeScript',
            keyword: '타입 설계 · 안정성 · 리팩토링',
            description:
              '명확한 타입 모델링으로 런타임 오류를 사전에 줄이고, 컴포넌트/도메인/API 경계를 타입으로 고정해 유지보수성을 높입니다. 제네릭·유틸리티 타입·타입가드(좁히기)를 활용해 복잡한 상태와 데이터 흐름도 예측 가능하게 구현합니다.',
            logos: [siTypescript],
            tone: 'indigo',
          },
          {
            id: 'python',
            title: 'Python',
            keyword: '자동화 · 데이터 처리 · 문제 해결',
            description:
              '간단한 자동화 스크립트부터 데이터 전처리/분석, 알고리즘 문제 해결까지 폭넓게 활용합니다. 읽기 쉬운 코드와 함수 단위의 모듈화를 중시하고, 필요한 경우 외부 API 연동으로 반복 작업을 줄이는 방식으로 생산성을 높입니다.',
            logos: [siPython],
            tone: 'slate',
          },
        ],
      },
      {
        title: 'UI & Styling',
        icon: Palette,
        items: [
          {
            id: 'tailwind',
            title: 'Tailwind CSS',
            keyword: 'Utility-First · Responsive · 유지보수',
            description:
              '유틸리티 클래스를 적극 활용하여 빠르고 직관적으로 반응형 웹 UI를 구현하고 유지보수성을 높입니다.',
            logos: [siTailwindcss],
            tone: 'emerald',
          },
          {
            id: 'storybook',
            title: 'Storybook',
            keyword: 'UI 문서화 · 독립 테스트 · 협업',
            description:
              'UI 컴포넌트를 독립적인 환경에서 테스트하고 시각적으로 명확하게 문서화하여, 백엔드 개발자 등 다양한 팀원들과의 협업 효율을 극대화합니다.',
            logos: [siStorybook],
            tone: 'indigo',
          },
        ],
      },
      {
        title: 'Backend & BaaS',
        icon: Database,
        items: [
          {
            id: 'supabase',
            title: 'Supabase',
            keyword: 'Auth · Realtime DB · 빠른 구축',
            description:
              '사용자 인증(Auth)부터 실시간 데이터베이스 연동, 커뮤니티 게시판 기능까지 빠르게 구축하여, 프론트엔드 비즈니스 로직 개발에 집중하면서도 완성도 높은 풀스택 서비스를 구현합니다.',
            logos: [siSupabase],
            tone: 'slate',
          },
          {
            id: 'firebase',
            title: 'Firebase',
            keyword: 'Auth · Firestore · Hosting/Storage',
            description:
              'Firebase Auth로 로그인/세션 흐름을 빠르게 구성하고, Firestore를 활용해 읽기·쓰기 패턴과 쿼리를 고려한 데이터 모델링을 진행합니다. Hosting/Storage를 통해 배포와 파일 업로드를 간단히 연결하며, Security Rules로 접근 제어를 설정해 클라이언트 중심 구조에서도 보안을 놓치지 않도록 설계합니다.',
            logos: [siFirebase],
            tone: 'amber',
          },
        ],
      },
      {
        title: 'Co-work & Tools',
        icon: Wrench,
        items: [
          {
            id: 'notion',
            title: 'Notion',
            keyword: '문서화 · 회의록 · 리딩',
            description:
              '단순한 메모를 넘어 프로젝트의 체계적인 문서화, 회의록 정리 등을 통해 협업 환경을 기록하고 리딩하는 데 적극적으로 활용합니다.',
            logos: [siNotion],
            tone: 'slate',
          },
          {
            id: 'git-github',
            title: 'Git / GitHub',
            keyword: '브랜치 전략 · 코드 통합 · 버전 관리',
            description:
              '체계적인 버전 관리와 브랜치 전략을 통해 안전하고 효율적인 코드 통합을 진행합니다.',
            logos: [siGit, siGithub],
            tone: 'emerald',
          },
        ],
      },
      {
        title: 'Certification',
        icon: BadgeCheck,
        items: [
          {
            id: 'cert-engineer-info-processing',
            title: '정보처리기사',
            keyword: '2024-06 · 한국산업인력공단',
            description: '2024-06 정보처리기사 | 한국산업인력공단',
            imageSrc: '/certification_1.png',
            imageAlt: '정보처리기사 자격증 아이콘',
            tone: 'slate',
          },

          {
            id: 'cert-python-ymb',
            title: 'CSP 1급 (Python)',
            keyword: '2024-12 · YMB IT',
            description:
              '2024-12 Coding Specialist Professional 1급 Python | YMB IT',
            imageSrc: '/certification_2.png',
            imageAlt: 'Coding Specialist Professional Python 자격증 아이콘',
            tone: 'slate',
          },
          {
            id: 'cert-sql-developer',
            title: 'SQL Developer',
            keyword: '2025-04 · K-Data 데이터자격검정',
            description: '2025-04 SQL Developer | K-Data 데이터자격검정',
            imageSrc: '/certification_3.png',
            imageAlt: 'SQL Developer 자격증 아이콘',
            tone: 'slate',
          },
        ],
      },
    ],
    [],
  );

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-32 lg:py-48"
      aria-labelledby={sectionLabelId}
    >
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-green-50/30" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.08) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative container mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16">
          <div className="mb-4 text-sm font-medium text-slate-500 sm:mb-6 sm:text-base">
            Skills
          </div>
          <h2
            id={sectionLabelId}
            className="mb-3 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            제가 잘하는 것들...
          </h2>
          <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
            클릭하시면 자세한 기술 스택과 설명을 볼 수 있습니다.
          </p>
        </div>

        <div>
          {groups.map((group) => (
            <div
              key={group.title}
              className="mb-16 last:mb-0 sm:mb-20 lg:mb-24"
            >
              <div className="mb-6 flex items-start gap-4">
                <group.icon className="mt-1 h-6 w-6 shrink-0 text-slate-900" />
                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
                  {group.title}
                </h3>
              </div>

              <div className="grid auto-rows-[1fr] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <SkillCard
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={toggleOpen}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
