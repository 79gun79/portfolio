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

  const displayProjects = [...projectData, ...projectData, ...projectData];
  const thumbnailSrcFor = (id: string) => {
    const hash = Array.from(id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const hueA = (hash * 29) % 360;
    const hueB = (hueA + 42) % 360;
    const hueC = (hueA + 120) % 360;

    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720">\n  <defs>\n    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">\n      <stop offset="0" stop-color="hsl(${hueA} 80% 68%)"/>\n      <stop offset="0.55" stop-color="hsl(${hueB} 82% 60%)"/>\n      <stop offset="1" stop-color="hsl(${hueC} 70% 54%)"/>\n    </linearGradient>\n    <radialGradient id="r1" cx="20%" cy="20%" r="70%">\n      <stop offset="0" stop-color="rgba(255,255,255,0.55)"/>\n      <stop offset="1" stop-color="rgba(255,255,255,0)"/>\n    </radialGradient>\n    <radialGradient id="r2" cx="85%" cy="95%" r="75%">\n      <stop offset="0" stop-color="rgba(0,0,0,0.18)"/>\n      <stop offset="1" stop-color="rgba(0,0,0,0)"/>\n    </radialGradient>\n    <pattern id="p" width="18" height="18" patternUnits="userSpaceOnUse">\n      <path d="M0 18 L18 0" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>\n    </pattern>\n  </defs>\n  <rect width="1200" height="720" fill="url(#g)"/>\n  <rect width="1200" height="720" fill="url(#r1)"/>\n  <rect width="1200" height="720" fill="url(#r2)"/>\n  <rect width="1200" height="720" fill="url(#p)" opacity="0.55"/>\n</svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };

  const activeProject = useMemo<ProjectData | null>(() => {
    if (!activeId) return null;
    return projectData.find((p) => p.id === activeId) ?? null;
  }, [activeId]);

  return (
    <section
      id="projects"
      className={twMerge(
        'relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-32 lg:py-44',
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
            Projects
          </div>
          <h2 className="mb-3 text-3xl text-slate-900 sm:text-5xl lg:text-6xl">
            제가 만든 것들...
          </h2>
          <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
            클릭하시면 자세한 프로젝트를 볼 수 있습니다.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-white/60 via-white/20 to-transparent sm:w-12"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-white/60 via-white/20 to-transparent sm:w-12"
            aria-hidden="true"
          />

          <div className="relative overflow-hidden py-12">
            <motion.div
              className="flex gap-6 px-1 py-1"
              animate={{
                x: [0, -(160 + 24) * projectData.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
            >
              {displayProjects.map((p, i) => {
                return (
                  <button
                    key={`${p.id}-${i}`}
                    onClick={() => setActiveId(p.id)}
                    className="group relative h-40 w-40 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-emerald-50 via-white to-slate-50 shadow-md transition-all duration-300 hover:scale-105 hover:border-emerald-300 hover:from-emerald-100 hover:via-white hover:to-slate-100 hover:shadow-2xl"
                    aria-label={`${p.title} 상세 열기`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                      <img
                        src={p.thumbnail ?? thumbnailSrcFor(p.id)}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        className="mb-2 h-20 w-20 object-contain transition-all duration-300 group-hover:scale-110"
                      />
                      <p className="text-md line-clamp-2 text-center font-bold text-slate-700 transition-all duration-300 group-hover:text-emerald-700">
                        {p.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-sm"
              onClick={() => setActiveId(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed inset-0 z-60 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-label={`${activeProject.title} 상세`}
            >
              <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                <div className="pointer-events-none absolute -top-36 -right-36 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.26),transparent_62%)]" />

                <div className="absolute top-6 left-6 z-10 h-24 w-24 overflow-hidden rounded-2xl border-2 border-white bg-linear-to-br from-slate-50 to-slate-100 shadow-lg ring-1 ring-slate-900/5">
                  <img
                    src={
                      activeProject.logo ??
                      activeProject.thumbnail ??
                      thumbnailSrcFor(activeProject.id)
                    }
                    alt={activeProject.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-6 pl-36">
                  <div>
                    <div className="text-sm font-semibold text-emerald-700">
                      Project
                    </div>
                    <div className="mt-1 text-2xl font-bold text-slate-900">
                      {activeProject.title}
                    </div>
                    <div className="mt-2 space-y-1 text-sm font-medium text-slate-600">
                      <div>{activeProject.period ?? '—'}</div>
                      {activeProject.role && <div>{activeProject.role}</div>}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:outline-none"
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
        )}
      </AnimatePresence>
    </section>
  );
}
