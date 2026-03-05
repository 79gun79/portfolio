import { motion, useMotionValue, useScroll, useTransform } from 'motion/react';
import { ArrowRight, SquareTerminal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { loading } = useAuth();
  const containerRef = useRef(null);

  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window === 'undefined' ? 800 : window.innerHeight,
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
      aboutRawProgress.set(raw);
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [aboutRawProgress]);

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

  const cardHeight = useTransform(aboutProgress, [0, 1], [96, viewportHeight]);
  const cardRadius = useTransform(aboutProgress, [0, 1], [24, 0]);
  const cardGutter = useTransform(aboutProgress, [0, 1], [baseGutterPx, 0]);
  const cardMaxWidth = useTransform(aboutProgress, [0, 1], [1536, 10000]);
  const cardOpacity = useTransform(aboutRawProgress, (value) => {
    if (value <= 0.95) return 1;
    if (value >= 1.15) return 0;
    return 1 - (value - 0.95) / 0.2;
  });
  const cardShadow = useTransform(
    aboutProgress,
    [0, 1],
    ['0 30px 80px rgba(0,0,0,0.28)', '0 0px 0px rgba(0,0,0,0)'],
  );

  const parallaxBgY = useTransform(aboutProgress, [0.35, 1], [0, -80]);
  const parallaxOverlayY = useTransform(aboutProgress, [0.35, 1], [0, -50]);
  const parallaxPatternY = useTransform(aboutProgress, [0.35, 1], [0, -35]);
  const sinkY = useTransform(aboutProgress, [0.35, 1], [0, 160]);
  const sinkScale = useTransform(aboutProgress, [0.35, 1], [1, 0.88]);
  const sinkOpacity = useTransform(aboutProgress, [0.35, 0.85, 1], [1, 0.2, 0]);

  if (loading) return <div>loading...</div>;

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
        style={{ backgroundImage: "url('/background.png')", y: parallaxBgY }}
      />

      {/* Readability Overlay */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-linear-to-b from-slate-950/80 via-slate-950/70 to-slate-950/85"
        style={{ y: parallaxOverlayY }}
      />

      {/* Subtle Pattern */}
      <motion.div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.08) 1px, transparent 0)',
          backgroundSize: '44px 44px',
          y: parallaxPatternY,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 container mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 sm:pt-32 sm:pb-40 lg:px-8 lg:pt-40 lg:pb-48"
        style={{ y: sinkY, scale: sinkScale, opacity: sinkOpacity }}
      >
        <motion.div
          className="mx-auto max-w-6xl"
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/90 ring-1 ring-white/20 backdrop-blur-sm sm:mb-10 lg:mb-16"
          >
            <SquareTerminal className="h-4 w-4" />
            <span className="text-sm font-medium">This is Gun's Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="console-font mb-8 text-5xl leading-[1.1] font-black tracking-tight text-white sm:mb-10 sm:text-7xl lg:mb-16 lg:text-[8rem]"
          >
            <TypeAnimation
              sequence={["Console.log\n('Welcome!');", 2000, '', 500]}
              wrapper="span"
              speed={50}
              style={{ whiteSpace: 'pre-line' }}
              cursor={true}
              repeat={Infinity}
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 max-w-4xl space-y-2 text-lg leading-relaxed text-slate-200 sm:mb-16 sm:text-xl lg:mb-20 lg:text-2xl"
          >
            <p>책임감을 가지고 앞장서며,</p>
            <p>
              소통을 통해 함께 성장하는 개발자 <b>이재건</b>입니다.
            </p>
            <p>
              다양한 팀 활동에서 팀장을 맡으며, 구성원을 이끌고 조율하는 경험을
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
        className="pointer-events-none fixed inset-x-0 bottom-0 z-10"
        style={{
          opacity: cardOpacity,
          paddingLeft: cardGutter,
          paddingRight: cardGutter,
        }}
      >
        <motion.div className="mx-auto" style={{ maxWidth: cardMaxWidth }}>
          <motion.div
            className="bg-white"
            style={{
              height: cardHeight,
              borderTopLeftRadius: cardRadius,
              borderTopRightRadius: cardRadius,
              boxShadow: cardShadow,
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
