import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// Timestamp 형식의 날짜를 YYYY-MM-DD 문자열로 변환
function formatDate(date: string | Timestamp): string {
  if (typeof date === 'string') {
    return date;
  }
  const dateObj = date.toDate();
  return dateObj.toISOString().split('T')[0]; // Returns YYYY-MM-DD
}

// 기본 썸네일 생성
function generateThumbnail(title: string): string {
  const hash = Array.from(title).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hue = (hash * 37) % 360;
  const hueB = (hue + 60) % 360;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl(${hue} 75% 92%)" />
      <stop offset="100%" stop-color="hsl(${hueB} 70% 88%)" />
    </linearGradient>
    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="rgba(0,0,0,0.05)"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <circle cx="900" cy="150" r="180" fill="rgba(255,255,255,0.4)" opacity="0.6"/>
  <circle cx="200" cy="480" r="120" fill="rgba(255,255,255,0.3)" opacity="0.5"/>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export type PostProps = {
  post: PostData;
  className?: string;
};

export function Post({ post, className }: PostProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const classNames = twMerge(
    'group relative block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300',
    'hover:border-emerald-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/50',
    'cursor-pointer',
    className,
  );

  const imageUrl = post.coverImageUrl ?? generateThumbnail(post.title);
  const displayDate = post.updatedAt ?? post.createdAt;

  const content = (
    <>
      <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-slate-50 to-slate-100">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/40 via-slate-900/10 to-transparent" />

        {/* 좌측 상단 날짜 배지 */}
        {displayDate && (
          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-lg ring-1 ring-slate-900/5 backdrop-blur-sm">
            <Calendar className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-semibold text-slate-700">
              {formatDate(displayDate)}
            </span>
          </div>
        )}
      </div>

      <div className="relative p-6 sm:p-8">
        {/* 장식용 gradient accent */}
        <div className="pointer-events-none absolute top-0 right-8 left-8 h-px bg-linear-to-r from-transparent via-emerald-200 to-transparent" />

        <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-700 sm:text-2xl">
          {post.title}
        </h3>

        {post.description && (
          <p className="mb-5 line-clamp-3 text-base leading-relaxed text-slate-600">
            {post.description}
          </p>
        )}

        {post.tags?.length ? (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/60 bg-emerald-50/70 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition-colors group-hover:text-emerald-600">
          <span>자세히 보기</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </>
  );

  return (
    <article onClick={handleClick} className={classNames}>
      {content}
    </article>
  );
}
