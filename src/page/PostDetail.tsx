import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../util/firebase';
import ReactMarkdown from 'react-markdown';

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

  const displayDate = post ? formatDate(post.updatedAt ?? post.createdAt) : '';

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
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <button
            onClick={() => navigate('/#posts')}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로 가기
          </button>

          {post.coverImageUrl && (
            <div className="mb-6 overflow-hidden rounded-2xl">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="aspect-video w-full object-cover"
              />
            </div>
          )}

          <h1 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            {displayDate && (
              <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="h-4 w-4" />
                <span>{displayDate}</span>
              </div>
            )}

            {post.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/60 bg-emerald-50/70 px-3 py-1 text-xs font-semibold text-emerald-800"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          {post.description && (
            <p className="mb-8 border-l-4 border-emerald-500 pl-6 text-lg leading-relaxed text-slate-700">
              {post.description}
            </p>
          )}

          {markdown ? (
            <div className="prose prose-lg prose-slate prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:text-slate-900 prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-3xl prose-h2:text-slate-900 prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-2xl prose-h3:text-slate-800 prose-p:mb-6 prose-p:leading-relaxed prose-p:text-slate-700 prose-a:font-semibold prose-a:text-emerald-600 prose-a:no-underline prose-a:transition-colors hover:prose-a:text-emerald-700 hover:prose-a:underline prose-strong:font-bold prose-strong:text-slate-900 prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:my-2 prose-li:text-slate-700 prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-code:font-mono prose-code:text-emerald-700 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-900 prose-pre:p-6 prose-pre:text-sm prose-pre:leading-relaxed prose-pre:text-slate-100 prose-pre:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-700 prose-img:rounded-xl prose-img:shadow-md max-w-none">
              <ReactMarkdown
                components={{
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
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
