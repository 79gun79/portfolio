export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectData = {
  id: string;
  title: string;
  summary: string;
  period?: string;
  role?: string;
  stack: string[];
  highlights: string[];
  links?: ProjectLink[];
};

// TODO: Replace with your real projects.
export const projectData: ProjectData[] = [
  {
    id: 'portfolio',
    title: "Gun's Portfolio",
    summary: '잔디 톤 그라디언트와 인터랙션으로 구성한 포트폴리오 SPA.',
    period: '2025',
    role: 'Design & Frontend',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Firebase'],
    highlights: [
      'Home→About 전환에서 레이어 빈틈/띠 현상 제거',
      'Start 화면: 최소 2초 + 로고 로드까지 유지 + 진행바 항상 애니메이션',
      '글로벌 타이포 우선순위 문제(@layer base) 디버깅/해결',
    ],
    links: [
      { label: 'Live', href: '/' },
      { label: 'GitHub', href: 'https://github.com/yourname/portfolio' },
    ],
  },
  {
    id: 'project-2',
    title: 'Project Title',
    summary: '프로젝트 소개 문장을 여기에 적어주세요. (1~2줄 권장)',
    period: 'YYYY.MM - YYYY.MM',
    role: 'Frontend',
    stack: ['React', 'TypeScript'],
    highlights: ['핵심 성과 1', '핵심 성과 2', '핵심 성과 3'],
    links: [{ label: 'GitHub', href: 'https://github.com/yourname/project' }],
  },
  {
    id: 'project-3',
    title: 'Another Project',
    summary: '문제 정의 → 해결 → 결과를 한 문장으로 요약해보세요.',
    period: 'YYYY',
    role: 'Full-stack',
    stack: ['Node.js', 'PostgreSQL', 'Docker'],
    highlights: ['기술 포인트 1', '기술 포인트 2', '기술 포인트 3'],
  },
];
