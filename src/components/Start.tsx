import { useEffect } from 'react';
import { motion } from 'motion/react';

type StartProps = {
  onFinish: () => void;
  durationMs?: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Start({ onFinish, durationMs = 1600 }: StartProps) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      onFinish();
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timerId = window.setTimeout(() => {
      onFinish();
    }, durationMs);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onFinish();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [durationMs, onFinish]);

  return (
    <motion.div
      role="dialog"
      aria-label="Start animation"
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-green-50/40" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.10) 1px, transparent 0)',
          backgroundSize: '44px 44px',
        }}
      />

      <button
        type="button"
        onClick={onFinish}
        className="absolute top-6 right-6 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-colors hover:bg-white"
        aria-label="Skip intro"
      >
        Skip
      </button>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <motion.p
          className="mb-3 text-xs font-semibold tracking-[0.25em] text-slate-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          2026 · PORTFOLIO
        </motion.p>

        <motion.h1
          className="console-font text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
        >
          Jaegeon Lee
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
        >
          나의 포트폴리오 사이트에 오신 것을 환영합니다!
        </motion.p>

        <div className="mt-10 h-0.5 w-full overflow-hidden rounded-full bg-slate-200/70">
          <motion.div
            className="h-full w-full origin-left bg-green-700"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: durationMs / 1000, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
