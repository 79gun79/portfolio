import { ArrowUpRight, Github, Instagram, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-200">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(900px circle at 20% 10%, rgba(16,185,129,0.22), transparent 55%), radial-gradient(700px circle at 85% 40%, rgba(34,197,94,0.16), transparent 60%), radial-gradient(800px circle at 50% 110%, rgba(255,255,255,0.06), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-6 sm:pt-14 lg:px-8">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Link
                to="/#home"
                className="inline-flex max-w-full items-center text-white"
                aria-label="홈으로 이동"
              >
                <img
                  src="/icon/logo_white.png"
                  alt="79gun79"
                  className="h-14 w-auto max-w-[min(320px,78vw)] shrink-0 object-contain sm:h-16"
                  loading="lazy"
                />
              </Link>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                안녕하세요! 저는 프론트엔드 개발자{' '}
                <span className="font-bold">이재건</span>입니다.
              </p>
            </div>

            <div className="md:col-span-7 md:justify-self-end">
              {/* Mobile: single-row icon bar */}
              <div className="mt-4 flex items-center justify-end gap-3 sm:hidden">
                <a
                  href="mailto:79gun79@naver.com"
                  aria-label="이메일 보내기"
                  title="Email"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 backdrop-blur transition hover:border-emerald-200/30 hover:bg-emerald-400/10"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Siheung%2C%20Gyeonggi-do%2C%20KR"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="위치 보기"
                  title="Location"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 backdrop-blur transition hover:border-emerald-200/30 hover:bg-emerald-400/10"
                >
                  <MapPin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/79gun79"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub 열기"
                  title="GitHub"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 backdrop-blur transition hover:border-emerald-200/30 hover:bg-emerald-400/10"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://79gun79.github.io/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="기술 블로그 열기"
                  title="Tech Blog"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 backdrop-blur transition hover:border-emerald-200/30 hover:bg-emerald-400/10"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/j_gun2/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="인스타그램 열기"
                  title="Instagram"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 backdrop-blur transition hover:border-emerald-200/30 hover:bg-emerald-400/10"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

              {/* sm+: two-column (Contact / Links) */}
              <div className="mt-4 hidden gap-8 sm:grid sm:grid-cols-2 sm:gap-10">
                <div>
                  <div className="text-sm font-bold text-white">Contact</div>
                  <div className="mt-4 flex flex-col gap-3">
                    <a
                      href="mailto:79gun79@naver.com"
                      className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-emerald-200/30 hover:bg-emerald-400/10"
                    >
                      <span className="inline-flex min-w-0 items-center gap-2">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span className="truncate">79gun79@naver.com</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Siheung%2C%20Gyeonggi-do%2C%20KR"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-emerald-200/30 hover:bg-emerald-400/10"
                    >
                      <span className="inline-flex min-w-0 items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">Gyeonggi-do, KR</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-bold text-white">Links</div>
                  <div className="mt-4 flex flex-col gap-3">
                    <a
                      href="https://github.com/79gun79"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-emerald-200/30 hover:bg-emerald-400/10"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href="https://79gun79.github.io/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-emerald-200/30 hover:bg-emerald-400/10"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4" />
                        Tech Blog
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
                    </a>

                    <a
                      href="https://www.instagram.com/j_gun2/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-emerald-200/30 hover:bg-emerald-400/10"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <div>© {year} Jaegeon Lee. All rights reserved.</div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Link to="/#home" className="text-slate-400 hover:text-white">
                Back to top
              </Link>
              <a
                href="mailto:79gun79@naver.com"
                className="text-slate-400 hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="pb-[max(env(safe-area-inset-bottom),0px)]" />
        </div>
      </div>
    </footer>
  );
}
