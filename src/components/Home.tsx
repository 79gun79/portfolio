import { motion, useMotionValue, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { loading } = useAuth();
  const containerRef = useRef(null);

  const [floatEnabled, setFloatEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const isMobile = window.innerWidth < 640;
    if (isMobile) return !reduceMotion;

    return !reduceMotion && (window.scrollY || 0) < 16;
  });

  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window === 'undefined' ? 800 : window.innerHeight,
  );
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1200 : window.innerWidth,
  );
  const [baseGutterPx, setBaseGutterPx] = useState(() => {
    if (typeof window === 'undefined') return 12;
    if (window.innerWidth >= 1024) return 24;
    if (window.innerWidth >= 640) return 16;
    return 12;
  });

  const aboutRawProgress = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);

      if (window.innerWidth >= 1024) setBaseGutterPx(24);
      else if (window.innerWidth >= 640) setBaseGutterPx(16);
      else setBaseGutterPx(12);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const aboutElement = document.getElementById('about');
      if (!aboutElement) return;

      const rect = aboutElement.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh - rect.top) / vh;

      // If we're at the top of the page, never start in the "About is filling" state.
      // This avoids a stuck blank hero when browsers restore scroll late or layout shifts.
      const isAtTop = (window.scrollY || 0) < 2;
      aboutRawProgress.set(isAtTop ? Math.min(raw, 0) : raw);
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    // In case another effect adjusts scroll position on mount (e.g. scroll restoration handling),
    // re-check once after the current call stack.
    const timeoutId = window.setTimeout(scheduleUpdate, 0);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [aboutRawProgress]);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const isMobileNow = viewportWidth < 640;
    if (isMobileNow) {
      const id = window.requestAnimationFrame(() => setFloatEnabled(true));
      return () => window.cancelAnimationFrame(id);
    }

    const enableThreshold = 8;
    const disableThreshold = 16;

    let rafId = 0;
    const compute = () => {
      rafId = 0;
      const y = window.scrollY || 0;
      setFloatEnabled((prev) => {
        if (y <= enableThreshold) return true;
        if (y >= disableThreshold) return false;
        return prev;
      });
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(compute);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [viewportWidth]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const aboutProgress = useTransform(aboutRawProgress, (value) => {
    if (value <= 0) return 0;
    if (value >= 1) return 1;
    return value;
  });

  const isDesktop = viewportWidth >= 1024;
  const isMobile = viewportWidth < 640;
  const floatKeyframes = isMobile ? [-8, -26, -8] : [-6, -18, -6];
  const floatDuration = isMobile ? 2.6 : 2.8;
  const waitingCardStartHeight = isDesktop ? 56 : isMobile ? 98 : 72;
  const waitingCardMinBaseHeight = isDesktop ? 36 : 44;

  // Fill the viewport a bit earlier than the raw About progress to avoid
  // leaving a visible band of the Home background at the top while About's
  // content is already visible (due to About's large top padding).
  const cardFillOffsetPx = isDesktop ? 180 : 140;
  const cardFillEndProgress = Math.max(
    0.55,
    Math.min(1, 1 - cardFillOffsetPx / Math.max(1, viewportHeight)),
  );
  const cardFillProgress = useTransform(aboutProgress, (value) => {
    if (value <= 0) return 0;
    if (value >= cardFillEndProgress) return 1;
    return value / cardFillEndProgress;
  });

  const cardHeight = useTransform(
    cardFillProgress,
    (progress) =>
      waitingCardStartHeight +
      (viewportHeight - waitingCardStartHeight) * progress,
  );
  const cardRadius = useTransform(cardFillProgress, [0, 1], [24, 0]);
  const cardGutterStartPx = baseGutterPx;
  const cardGutter = useTransform(
    cardFillProgress,
    [0, 1],
    [cardGutterStartPx, 0],
  );
  const cardMaxWidth = useTransform(cardFillProgress, [0, 1], [1536, 10000]);
  const cardOpacity = useTransform(aboutRawProgress, (value) => {
    if (value <= 0.95) return 1;
    if (value >= 1.15) return 0;
    return 1 - (value - 0.95) / 0.2;
  });
  const cardShadow = useTransform(
    cardFillProgress,
    [0, 1],
    ['0 30px 80px rgba(0,0,0,0.28)', '0 0px 0px rgba(0,0,0,0)'],
  );

  const parallaxPatternY = useTransform(aboutProgress, [0.35, 1], [0, -35]);
  const sinkY = useTransform(aboutProgress, [0.35, 1], [0, 160]);
  const sinkScale = useTransform(aboutProgress, [0.35, 1], [1, 0.88]);
  const sinkOpacity = useTransform(aboutProgress, [0.35, 0.85, 1], [1, 0.2, 0]);

  if (loading) return <div>loading...</div>;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#071f0c] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(2, 6, 23, 0.78) 0%, rgba(2, 6, 23, 0.68) 55%, rgba(2, 6, 23, 0.82) 100%), radial-gradient(900px circle at 25% 18%, rgba(180, 255, 170, 0.22), transparent 58%), radial-gradient(1100px circle at 78% 38%, rgba(60, 200, 90, 0.30), transparent 62%), radial-gradient(800px circle at 50% 105%, rgba(10, 60, 20, 0.55), transparent 60%), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0 2px, transparent 2px 7px), linear-gradient(135deg, #071f0c 0%, #0b3d13 30%, #1f7a1f 68%, #8eea6a 100%)',
      }}
    >
      {/* Subtle Pattern */}
      <motion.div
        className="absolute inset-x-0 -inset-y-28 z-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.08) 1px, transparent 0)',
          backgroundSize: '44px 44px',
          y: parallaxPatternY,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 container mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 sm:pt-32 sm:pb-40 lg:px-8 lg:pt-32 lg:pb-40"
        style={{ y: sinkY, scale: sinkScale, opacity: sinkOpacity }}
      >
        <motion.div
          className="mx-auto max-w-6xl"
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="console-font mb-8 text-5xl leading-[1.1] font-black tracking-tight whitespace-pre-line text-white sm:mb-10 sm:text-7xl lg:mb-12 lg:text-[5rem]"
          >
            <span>Console.log{'\n'}('</span>
            <TypeAnimation
              sequence={['Welcome!', 1600, '', 700]}
              wrapper="span"
              speed={50}
              cursor={true}
              repeat={Infinity}
            />
            <span>');</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 max-w-4xl space-y-2 text-lg leading-relaxed text-slate-200 sm:mb-16 sm:text-xl lg:mb-20 lg:text-xl"
          >
            <p>책임감을 가지고 앞장서며,</p>
            <p>
              소통을 통해 함께 성장하는 개발자 <b>이재건</b>입니다.
            </p>
            <p>
              다양한 활동에서 팀장을 맡으며, 구성원을 이끌고 조율하는 경험을
              쌓아왔습니다.
            </p>
            <p>
              앞으로도 협업과 책임을 기반으로, 더 나은 개발자로 나아가겠습니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex max-w-2xl flex-col gap-4 sm:flex-row"
          >
            <a
              href="https://github.com/79gun79"
              target="_blank"
              rel="noreferrer noopener"
              className={twMerge(
                'group inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200/20 bg-emerald-400/15 px-8 py-4 text-lg font-semibold text-white shadow-sm backdrop-blur-sm transition-all hover:border-emerald-200/35 hover:bg-emerald-400/20 focus-visible:ring-2 focus-visible:ring-emerald-200/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
              )}
            >
              깃허브로
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://79gun79.github.io/"
              target="_blank"
              rel="noreferrer noopener"
              className={twMerge(
                'inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/25 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/45 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
              )}
            >
              기술 블로그
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Waiting Card → fills into About on scroll */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-9"
        style={{
          opacity: 1,
          paddingLeft: cardGutter,
          paddingRight: cardGutter,
        }}
      >
        <motion.div className="mx-auto" style={{ maxWidth: cardMaxWidth }}>
          <motion.div
            className="bg-white"
            style={{
              height: `max(env(safe-area-inset-bottom), ${waitingCardMinBaseHeight}px)`,
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-10"
        animate={floatEnabled ? { y: floatKeyframes } : { y: 0 }}
        transition={
          floatEnabled
            ? { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2 }
        }
        style={{
          opacity: cardOpacity,
          paddingLeft: cardGutter,
          paddingRight: cardGutter,
          paddingBottom: floatEnabled
            ? 'max(env(safe-area-inset-bottom), 14px)'
            : 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <motion.div className="mx-auto" style={{ maxWidth: cardMaxWidth }}>
          <motion.div
            className="bg-white"
            style={{
              height: cardHeight,
              borderTopLeftRadius: cardRadius,
              borderTopRightRadius: cardRadius,
              boxShadow: floatEnabled ? '0 0px 0px rgba(0,0,0,0)' : cardShadow,
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
