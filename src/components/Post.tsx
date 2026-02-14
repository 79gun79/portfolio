import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Timestamp } from 'firebase/firestore';

// Timestamp 형식의 날짜를 YYYY-MM-DD 문자열로 변환
function formatDate(date: string | Timestamp): string {
  if (typeof date === 'string') {
    return date;
  }
  const dateObj = date.toDate();
  return dateObj.toISOString().split('T')[0]; // Returns YYYY-MM-DD
}

export type PostProps = {
  post: PostData;
  className?: string;
  onClick?: () => void;
};

export function Post({ post, className, onClick }: PostProps) {
  const classNames = twMerge(
    'group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all',
    'hover:border-brown-200 hover:-translate-y-0.5 hover:shadow-md',
    onClick ? 'cursor-pointer' : undefined,
    className,
  );

  const content = (
    <>
      {post.coverImageUrl && (
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <img
            src={post.coverImageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/20 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6 sm:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
          {post.createdAt && (
            <div className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          )}
          {typeof post.readingTimeMinutes === 'number' && (
            <div className="inline-flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          )}
        </div>

        <h3 className="group-hover:text-brown-700 mb-2 text-xl! font-bold tracking-tight text-slate-900 transition-colors sm:text-2xl!">
          {post.title}
        </h3>

        {post.description && (
          <p className="mb-5 line-clamp-3 text-base! leading-relaxed text-slate-600">
            {post.description}
          </p>
        )}

        {post.tags?.length ? (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-brown-50! text-brown-800! inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
              >
                <Tag className="h-3.5 w-3.5" />
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="text-brown-700 inline-flex items-center gap-2 text-sm font-semibold">
          <span>자세히 보기</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </>
  );

  if (post.coverImageUrl) {
    return (
      <a
        href={post.coverImageUrl}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames}
      >
        {content}
      </a>
    );
  }

  return (
    <article onClick={onClick} className={classNames}>
      {content}
    </article>
  );
}
