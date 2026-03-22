export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectData = {
  id: string;
  title: string;
  /** Thumbnail image URL (e.g. '/projects/portfolio.png' under public/) */
  thumbnail?: string;
  /** Logo image URL for modal header (e.g. '/projects/logo.png' under public/) */
  logo?: string;
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
    id: '1',
    title: 'GunBlog',
    thumbnail: '/projects/gunblog.png',
    summary: '학습 관련 내용들을 쭉 정리해놓은 공간입니다.',
    period: '2025. 02. ~ Now',
    stack: ['GitHub Pages', 'SCSS', 'jekyll'],
    highlights: ['jekyll을 이용한 정적 블로그', 'GitHub Pages로 배포'],
    links: [
      { label: 'Live', href: 'https://79gun79.github.io/' },
      { label: 'GitHub', href: 'https://github.com/79gun79/79gun79.github.io' },
    ],
  },
  {
    id: '2',
    title: 'FC Neunggok',
    thumbnail: '/projects/fcNeunggok.png',
    summary: '능곡 구성원들의 단합을 도모하는 공식 커뮤니티',
    logo: '/projects/fcNeunggok_logo.png',
    period: '2026, 01. ~ Now',
    stack: [
      'React',
      'TypeScript',
      'Supabase',
      'Tailwind CSS',
      'Tanstack Query',
    ],
    highlights: ['바이브 디자인을 활용한 UI/UX 구현', '포토 CRUD 구현'],
    links: [
      { label: 'Live', href: 'https://keen-mochi-fef8ff.netlify.app/' },
      { label: 'GitHub', href: 'https://github.com/79gun79/fcNeunggok' },
    ],
  },
  {
    id: '3',
    title: '데일리 코테',
    thumbnail: '/projects/dailycote.png',
    summary: '함께 문제를 풀며 사고력을 키우는 공간, 데일리 코테.',
    period: '2025. 05. ~ 2025. 06.',
    role: 'Front-end / Designer',
    stack: [
      'React',
      'TypeScript',
      'Supabase',
      'Tailwind CSS',
      'React Router',
      'Zustand',
    ],
    highlights: [
      '프로젝트 팀장',
      '개발직군 문제 생성, 풀이 기능 구현',
      '비로그인 모달 창 구현',
      '검색 및 필터 기능 구현',
    ],
    links: [
      { label: 'Live', href: 'https://peaceful-manatee-287118.netlify.app/' },
      { label: 'GitHub', href: 'https://github.com/79gun79/LeeJoChoigo' },
    ],
  },
  {
    id: '4',
    title: 'Gammue',
    thumbnail: '/projects/gammue.png',
    summary:
      '게임 커뮤니티 사이트, Gammue를 통해 다양한 게임의 소식을 빠르게 접해보세요!',
    period: '2025. 04. ~ 2025. 05.',
    role: 'Front-end',
    stack: [
      'React',
      'TypeScript',
      'Axios',
      'Tailwind CSS',
      'React Router',
      'Zustand',
    ],
    highlights: [
      '프로젝트 팀장',
      '게시글 CRUD 구현',
      '낙관적 업데이트로 좋아요 기능 구현',
      '내 게시글, 게시글 바로가기 기능 구현',
    ],
    links: [
      { label: 'Live', href: 'https://funny-speculoos-61daf9.netlify.app/' },
      { label: 'GitHub', href: 'https://github.com/79gun79/FiveCoders' },
    ],
  },
  {
    id: '5',
    title: 'Studium',
    thumbnail: '/projects/studium.png',
    logo: '/projects/studium_logo.png',
    summary: '목표 기반 스터디 관리 플랫폼, 스터디움 Studium ',
    period: '2025. 06. ~ 2025. 08.',
    role: 'Front-end / Product Owner',
    stack: [
      'Next.js',
      'TypeScript',
      'Tanstack Query',
      'Tailwind CSS',
      'Axios',
      'Zustand',
    ],
    highlights: [
      '프로젝트 오너(FE & BE 총괄)',
      '리워드 상점 시스템 구현',
      '전체적인 스켈레톤 구조 설계 및 로딩 구현',
      '마이페이지 및 로그아웃 기능 구현',
    ],
    links: [
      { label: 'Live', href: 'https://studium-9to6.vercel.app/' },
      {
        label: 'GitHub',
        href: 'https://github.com/prgrms-web-devcourse-final-project/WEB4_5_9to6_FE',
      },
    ],
  },
];
