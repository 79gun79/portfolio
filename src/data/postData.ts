import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../util/firebase';

const samplePosts: PostData[] = [
  {
    id: '1',
    title: 'Firebase Google Login: 팝업 방식으로 안정화',
    description:
      'Redirect 방식에서 no-result가 발생하는 케이스를 추적하고, 팝업 로그인으로 전환해 안정적으로 인증을 완료했습니다.',
    tags: ['Firebase', 'Auth', 'React'],
    readingTimeMinutes: 3,
    coverImageUrl:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Tailwind Theme 토큰으로 Brown 팔레트 추가',
    description:
      '프로젝트의 @theme 토큰에 brown 계열 팔레트를 정의하고, 네비게이션과 UI 컴포넌트에 자연스럽게 적용했습니다.',
    tags: ['Tailwind', 'Design System'],
    readingTimeMinutes: 2,
  },
  {
    id: '3',
    title: '포트폴리오 메인 섹션 모션/타이포 다듬기',
    description:
      '모션과 타이포 스케일을 정리해 랜딩 경험을 개선하고, 레이아웃 리듬을 맞췄습니다.',
    tags: ['UI', 'Motion'],
    readingTimeMinutes: 4,
    coverImageUrl: '/example1.gif',
  },
];

export async function seedPosts() {
  const col = collection(db, 'posts');
  // collection(getFirestore(app), 컬렉션명)

  for (const p of samplePosts) {
    await addDoc(col, {
      ...p,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  console.log('초기 데이터 생성 완료');
}
