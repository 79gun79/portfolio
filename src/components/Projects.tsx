import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { projectData, type ProjectData } from '../data/projectData';

function ProjectTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50/70 px-3 py-1 text-xs font-semibold text-emerald-800">
      {children}
    </span>
  );
}

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeProject = useMemo<ProjectData | null>(() => {
    if (!activeId) return null;
    return projectData.find((p) => p.id === activeId) ?? null;
  }, [activeId]);

  return (
    <section
      id="projects"
      className={twMerge(
        'relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-32 lg:py-44',
        // subtle background tint that matches the "green / grass" mood
        'bg-[radial-gradient(1200px_600px_at_10%_0%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(900px_500px_at_90%_10%,rgba(34,197,94,0.10),transparent_55%)]',
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: false, amount: 0.25 }}
          className="mb-10 sm:mb-14"
        >
          <div className="mb-4 text-sm font-medium text-slate-500 sm:mb-6 sm:text-base">
            Our Projects
          </div>
          <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            프로젝트 소개
          </h2>
          <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
            실제로 만들면서 해결했던 문제와 결과를 간결하게 정리했습니다. 카드를
            클릭하면 상세 내용을 확인할 수 있어요.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectData.map((p, index) => (
            <motion.button
              key={p.id}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: false, amount: 0.2 }}
              onClick={() => setActiveId(p.id)}
              className={twMerge(
                'group relative w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 p-6 text-left shadow-sm backdrop-blur-sm',
                'transition-all hover:-translate-y-0.5 hover:border-emerald-200/70 hover:shadow-md',
                'focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:outline-none',
              )}
            >
              {/* Accent */}
              <div className="pointer-events-none absolute -top-28 -right-28 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.22),transparent_65%)]" />

              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-emerald-700">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="mt-2 text-xl font-bold text-slate-900">
                    {p.title}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                  자세히
                </div>
              </div>

              <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate-600">
                {p.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {p.stack.slice(0, 5).map((t) => (
                  <ProjectTag key={t}>{t}</ProjectTag>
                ))}
                {p.stack.length > 5 ? (
                  <span className="text-xs font-semibold text-slate-500">
                    +{p.stack.length - 5}
                  </span>
                ) : null}
              </div>

              <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                <span className="font-medium">
                  {p.period ?? '—'}
                  {p.role ? ` · ${p.role}` : ''}
                </span>
                <span className="font-semibold text-emerald-700 transition-colors group-hover:text-emerald-800">
                  View
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-sm"
              onClick={() => setActiveId(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
              role="dialog"
              aria-modal="true"
              aria-label={`${activeProject.title} 상세`}
            >
              <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                {/* Top accent */}
                <div className="pointer-events-none absolute -top-36 -right-36 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.26),transparent_62%)]" />

                <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-6">
                  <div>
                    <div className="text-sm font-semibold text-emerald-700">
                      Project
                    </div>
                    <div className="mt-1 text-2xl font-bold text-slate-900">
                      {activeProject.title}
                    </div>
                    <div className="mt-2 text-sm font-medium text-slate-600">
                      {activeProject.period ?? '—'}
                      {activeProject.role ? ` · ${activeProject.role}` : ''}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:outline-none"
                    aria-label="닫기"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6 p-6">
                  <p className="text-base leading-relaxed text-slate-700">
                    {activeProject.summary}
                  </p>

                  <div>
                    <div className="mb-3 text-sm font-semibold text-slate-900">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.stack.map((t) => (
                        <ProjectTag key={t}>{t}</ProjectTag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-semibold text-slate-900">
                      Highlights
                    </div>
                    <ul className="space-y-2">
                      {activeProject.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-3 text-sm text-slate-700"
                        >
                          <span className="mt-1 h-2 w-2 flex-none rounded-full bg-emerald-500" />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeProject.links?.length ? (
                    <div>
                      <div className="mb-3 text-sm font-semibold text-slate-900">
                        Links
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {activeProject.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target={
                              l.href.startsWith('http') ? '_blank' : undefined
                            }
                            rel={
                              l.href.startsWith('http')
                                ? 'noreferrer noopener'
                                : undefined
                            }
                            className={twMerge(
                              'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm',
                              'transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:outline-none',
                            )}
                          >
                            <ExternalLink className="h-4 w-4 text-emerald-700" />
                            {l.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
