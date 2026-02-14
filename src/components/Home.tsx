import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, SquareTerminal } from 'lucide-react';
import { useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { loading } = useAuth();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  if (loading) return <div>loading...</div>;

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white"
    >
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-slate-50 via-white to-green-50/30" />

      {/* Subtle Mesh Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.08) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 sm:pt-32 sm:pb-40 lg:px-8 lg:pt-40 lg:pb-48">
        <motion.div
          className="mx-auto max-w-6xl"
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-slate-700 sm:mb-10 lg:mb-16"
          >
            <SquareTerminal className="h-4 w-4" />
            <span className="text-sm font-medium">This is Gun's Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="console-font mb-8 text-5xl leading-[1.1] font-black tracking-tight text-slate-900 sm:mb-10 sm:text-7xl lg:mb-16 lg:text-[8rem]"
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
            className="mb-12 max-w-4xl space-y-2 text-lg leading-relaxed text-slate-600 sm:mb-16 sm:text-xl lg:mb-20 lg:text-2xl"
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
              href="#contact"
              className={twMerge(
                'group inline-flex items-center justify-center gap-2 rounded-xl bg-green-900 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-green-800',
              )}
            >
              깃허브로
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#vision"
              className={twMerge(
                'inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all hover:border-slate-900',
              )}
            >
              더 알아보기
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-slate-300 p-2 sm:h-12 sm:w-8"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-2 w-1 rounded-full bg-slate-400 sm:h-3 sm:w-1.5"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
