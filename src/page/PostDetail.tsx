import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../util/firebase';
import { generateThumbnail } from '../util/thumbnail';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Timestamp 형식의 날짜를 YYYY-MM-DD 문자열로 변환
function formatDate(date: string | Timestamp): string {
  if (typeof date === 'string') {
    return date;
  }
  const dateObj = date.toDate();
  return dateObj.toISOString().split('T')[0]; // Returns YYYY-MM-DD
}

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData | null>(null);
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  const displayDate = post ? formatDate(post.updatedAt ?? post.createdAt) : '';
  const fallbackCover = post ? generateThumbnail(post.title) : '';
  const coverSrc = post?.coverImageUrl ?? fallbackCover;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postsCol = collection(db, 'posts');
        const snapshot = await getDocs(postsCol);
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PostData[];

        const foundPost = posts.find((p) => p.id === id);
        if (foundPost) {
          setPost(foundPost);

          // Load markdown file if exists
          if (foundPost.contentMd) {
            const response = await fetch(foundPost.contentMd);
            if (response.ok) {
              const text = await response.text();
              setMarkdown(text);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    // Hysteresis prevents flicker near the boundary when the header height
    // change slightly affects scroll position.
    const enterCompactAt = 84;
    const exitCompactAt = 48;
    let ticking = false;
    let lastY = window.scrollY || 0;
    let lastDirection: 'up' | 'down' | null = null;
    let lockUntil = 0;
    const lockMs = 320;

    const compute = () => {
      const y = window.scrollY || 0;
      const direction: 'up' | 'down' | null =
        y > lastY ? 'down' : y < lastY ? 'up' : null;
      lastY = y;
      if (direction) lastDirection = direction;
      const isInitialCompute = lastDirection === null;

      setIsHeaderCompact((prev) => {
        const now = Date.now();
        if (!isInitialCompute && now < lockUntil) return prev;

        let next = prev;
        if (isInitialCompute) {
          // Initial state: don't apply direction gating.
          next = y > enterCompactAt ? true : y < exitCompactAt ? false : prev;
        } else {
          // Direction gating: prevents layout-shift feedback loops.
          if (!prev && lastDirection === 'down' && y > enterCompactAt) {
            next = true;
          } else if (prev && lastDirection === 'up' && y < exitCompactAt) {
            next = false;
          }
        }

        if (next !== prev) {
          lockUntil = now + lockMs;
        }
        return next;
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        compute();
      });
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            포스트를 찾을 수 없습니다
          </h2>
          <button
            onClick={() => navigate('/#posts')}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header
        className={[
          'sticky top-0 z-40 overflow-hidden border-b border-slate-200 bg-slate-950 transition-all duration-300',
          isHeaderCompact ? 'shadow-lg shadow-slate-900/10' : '',
        ].join(' ')}
      >
        <div className="absolute inset-0">
          <img
            src={coverSrc}
            alt={post.title}
            className={[
              'h-full w-full object-cover transition-opacity duration-300',
              isHeaderCompact ? 'opacity-55' : 'opacity-95',
            ].join(' ')}
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src === fallbackCover) return;
              img.onerror = null;
              img.src = fallbackCover;
            }}
          />
          <div
            className={[
              'absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-slate-950/10 transition-opacity duration-300',
              isHeaderCompact ? 'opacity-90' : 'opacity-100',
            ].join(' ')}
          />
        </div>

        <div className="container mx-auto max-w-6xl px-4">
          <div
            className={[
              'relative flex flex-col',
              isHeaderCompact
                ? 'justify-center sm:justify-between'
                : 'justify-between',
              isHeaderCompact
                ? 'h-20 py-4 sm:h-24 sm:py-4'
                : 'h-56 py-6 sm:h-72 sm:py-8 lg:h-80',
            ].join(' ')}
          >
            <div
              className={[
                'flex items-center',
                isHeaderCompact ? 'gap-3' : '',
              ].join(' ')}
            >
              <button
                onClick={() => navigate('/#posts')}
                aria-label="뒤로 가기"
                title="뒤로 가기"
                className={[
                  'inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/90 font-semibold text-slate-800 shadow-lg ring-1 ring-slate-900/10 backdrop-blur transition-colors hover:bg-white',
                  isHeaderCompact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
                ].join(' ')}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className={isHeaderCompact ? 'hidden sm:inline' : ''}>
                  뒤로 가기
                </span>
              </button>

              {isHeaderCompact ? (
                <div className="min-w-0 flex-1 sm:hidden">
                  <div className="truncate text-sm font-semibold text-white/95">
                    {post.title}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="max-w-4xl">
              <h1
                className={[
                  'font-bold tracking-tight text-white drop-shadow-sm transition-[font-size,line-height] duration-300',
                  isHeaderCompact
                    ? 'line-clamp-1 hidden text-lg leading-tight sm:block sm:text-xl'
                    : 'text-3xl sm:text-4xl lg:text-5xl',
                ].join(' ')}
              >
                {post.title}
              </h1>

              {!isHeaderCompact ? (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {displayDate && (
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/90 ring-1 ring-white/15 backdrop-blur sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
                      <Calendar className="h-3.5 w-3.5 text-emerald-200 sm:h-4 sm:w-4" />
                      <span className="font-medium">{displayDate}</span>
                    </div>
                  )}

                  {post.tags?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-1 text-[11px] font-semibold text-emerald-50 ring-1 ring-emerald-200/20 backdrop-blur sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                        >
                          <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          {post.description && (
            <p className="mb-8 border-l-4 border-emerald-500 pl-6 text-lg leading-relaxed text-slate-700">
              {post.description}
            </p>
          )}

          {markdown ? (
            <div className="markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre: ({ children }) => <>{children}</>,
                  code: ({ className, children, ...props }) => {
                    const languageMatch = /language-(\w+)/.exec(
                      className ?? '',
                    );
                    const isInline = !languageMatch;

                    if (isInline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }

                    const language = languageMatch?.[1] ?? '';
                    const code = String(children).replace(/\n$/, '');

                    return (
                      <div className="not-prose my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-lg">
                        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-slate-200">
                          <span className="font-semibold tracking-wide uppercase">
                            {language}
                          </span>
                        </div>
                        <div className="scrollbar-hide overflow-x-auto overscroll-x-contain">
                          <SyntaxHighlighter
                            language={language}
                            style={oneDark}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              background: 'transparent',
                              padding: '1.25rem',
                              minWidth: 'max-content',
                            }}
                            codeTagProps={{
                              style: {
                                fontFamily:
                                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                              },
                            }}
                          >
                            {code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    );
                  },
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-center text-slate-500">
              <p>마크다운 콘텐츠를 불러올 수 없습니다.</p>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
