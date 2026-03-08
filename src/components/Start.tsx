import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

type StartProps = {
  onFinish: () => void;
  durationMs?: number;
};

const MIN_VISIBLE_MS = 2000;
const NAV_LOGO_SRC = '/icon/logo_none.png';
const MAX_ASSET_WAIT_MS = 10000;

export function Start({ onFinish, durationMs = 1600 }: StartProps) {
  const minVisibleMs = Math.max(MIN_VISIBLE_MS, durationMs);
  const progress = useMotionValue(0);
  const startAtRef = useRef(0);

  const [logoReady, setLogoReady] = useState(false);
  const [skipRequested, setSkipRequested] = useState(false);

  useEffect(() => {
    if (startAtRef.current) return;
    startAtRef.current =
      typeof performance === 'undefined' ? Date.now() : performance.now();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const img = new Image();
    img.decoding = 'async';
    img.src = NAV_LOGO_SRC;

    const markReady = () => {
      if (cancelled) return;
      setLogoReady(true);
    };

    const fallbackTimer = window.setTimeout(markReady, MAX_ASSET_WAIT_MS);

    if (img.complete) {
      window.clearTimeout(fallbackTimer);
      markReady();
      return () => {
        cancelled = true;
      };
    }

    img.onload = () => {
      window.clearTimeout(fallbackTimer);
      markReady();
    };
    img.onerror = () => {
      window.clearTimeout(fallbackTimer);
      markReady();
    };

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSkipRequested(true);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    let finished = false;

    const tick = () => {
      rafId = 0;
      if (finished) return;

      const startAt = startAtRef.current || 0;
      const now =
        typeof performance === 'undefined' ? Date.now() : performance.now();
      const elapsed = Math.max(0, now - startAt);

      const canClose = elapsed >= minVisibleMs && (logoReady || skipRequested);

      if (elapsed < minVisibleMs) {
        progress.set(Math.min(0.9, (elapsed / minVisibleMs) * 0.9));
      } else if (!logoReady && !skipRequested) {
        const t = (elapsed - minVisibleMs) / 650;
        progress.set(0.945 + 0.02 * Math.sin(t * Math.PI * 2));
      } else {
        progress.set(1);
      }

      if (canClose) {
        finished = true;
        window.setTimeout(onFinish, 220);
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      finished = true;
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [logoReady, minVisibleMs, onFinish, progress, skipRequested]);

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
          Jaegeon LEE
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
        >
          <b>이재건</b>의 포트폴리오 사이트에 오신 것을 환영합니다!
        </motion.p>

        <div className="mt-10 h-0.5 w-full overflow-hidden rounded-full bg-slate-200/70">
          <motion.div
            className="h-full w-full origin-left bg-green-700"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </motion.div>
  );
}
