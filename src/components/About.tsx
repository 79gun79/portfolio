import { motion } from 'motion/react';
import { Link as LinkIcon, Code, X, User } from 'lucide-react';

export function About() {
  return (
    <section
      id="about"
      className="bg-white px-4 py-20 sm:px-6 sm:py-32 lg:py-48"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-20 sm:mb-32"
        >
          <div className="mb-4 text-sm font-medium text-slate-500 sm:mb-6 sm:text-base">
            About Me
          </div>
          <h2 className="mb-6 text-3xl text-slate-900 sm:mb-8 sm:text-5xl lg:text-6xl">
            나란 놈은...
          </h2>
        </motion.div>

        {/* How We Work Together */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-24 sm:mb-32 lg:mb-40"
        >
          <div className="mb-6 flex items-start gap-4">
            <User className="mt-1 h-6 w-6 shrink-0 text-slate-900" />
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
              일하는 방식
            </h3>
          </div>
          <p className="mb-12 max-w-4xl text-base text-slate-600 sm:text-lg lg:text-xl">
            문제를 해결하는 저만의 접근 방식입니다.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {[
              {
                title: '관찰하고 연결하기',
                description:
                  '문제를 표면적으로 보지 않습니다.\n데이터, 사용자 패턴, 비즈니스 맥락을 연결해 본질을 찾습니다.',
              },
              {
                title: '구조화하고 명확히 하기',
                description:
                  '애매한 이해는 버그를 만듭니다.\n시스템과 로직을 명확한 구조로 정리하는 것을 중요하게 생각합니다.',
              },
              {
                title: '실행 가능하게 만들기',
                description:
                  '아이디어는 동작할 때 가치가 있습니다.\n이론보다 실제로 작동하는 시스템을 만드는 데 집중합니다.',
              },
              {
                title: '확장 가능하게 설계하기',
                description:
                  '오늘의 해결책이 내일의 기술 부채가 되지 않도록\n재사용과 확장을 염두에 둔 코드를 작성합니다.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
              >
                <h4 className="mb-3 text-lg font-bold text-slate-900 sm:text-xl">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed whitespace-pre-line text-slate-600 sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 우리가 좋아하는 사람의 모습 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-24 sm:mb-32 lg:mb-40"
        >
          <div className="mb-6 flex items-start gap-4">
            <LinkIcon className="mt-1 h-6 w-6 shrink-0 text-slate-900" />
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
              함께 일하고 싶은 분들
            </h3>
          </div>
          <p className="mb-8 max-w-4xl text-base text-slate-600 sm:text-lg">
            이런 분들과 함께 일하면 시너지가 날 것 같습니다.
          </p>

          <div className="max-w-4xl space-y-4">
            {[
              '기술을 도구로 보고, 문제 해결에 집중하는 분',
              '서로 다른 관점을 존중하고 함께 더 나은 방법을 찾는 분',
              '완벽한 코드보다 지속 가능한 시스템을 만들려는 분',
              '소통을 통해 불확실성을 줄이는 것을 중요하게 생각하는 분',
            ].map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900"></div>
                <p className="text-base text-slate-700 sm:text-lg">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 우리가 맞지 않는 사람 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-24 sm:mb-32 lg:mb-40"
        >
          <div className="mb-6 flex items-start gap-4">
            <X className="mt-1 h-6 w-6 shrink-0 text-slate-900" />
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
              맞지 않는 협업 스타일
            </h3>
          </div>
          <p className="mb-8 max-w-4xl text-base text-slate-600 sm:text-lg">
            솔직히 이런 방식은 저와 잘 맞지 않습니다.
          </p>

          <div className="mb-8 max-w-4xl space-y-4">
            {[
              '맥락 공유 없이 지시만 내리는 방식',
              '피드백을 비난으로 받아들이는 태도',
              '"원래 이렇게 해왔어요"가 유일한 근거인 경우',
              '기술 부채를 방치하고 새로운 기능만 쌓는 방식',
            ].map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"></div>
                <p className="text-base text-slate-600 sm:text-lg">{text}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl rounded-xl border-l-4 border-slate-900 bg-slate-50 p-6 sm:p-8">
            <p className="text-base text-slate-700 sm:text-lg">
              👉 이 기준은 누군가를 평가하려는 것이 아닙니다.
              <br />
              서로의 시간을 존중하기 위한 솔직한 기준입니다.
            </p>
          </div>
        </motion.div>

        {/* 핵심 가치 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-slate-900 p-8 text-white sm:p-10 lg:p-12"
        >
          <div className="mb-6 flex items-start gap-4">
            <Code className="mt-1 h-6 w-6 shrink-0 text-white" />
            <h3 className="text-xl font-bold sm:text-2xl lg:text-3xl">
              핵심 가치
            </h3>
          </div>
          <div className="max-w-4xl space-y-4 text-base leading-relaxed sm:text-lg">
            <p>좋은 개발자는 코드만 잘 짜는 사람이 아니라고 생각합니다.</p>
            <p className="text-slate-300">
              문제의 맥락을 이해하고, 동료와 소통하며,
              <br />
              지속 가능한 시스템을 만드는 것이 더 중요합니다.
            </p>
            <p className="pt-4 font-semibold">
              기술은 도구이고, 목표는 문제 해결입니다.
              <br />그 과정에서 함께 성장하는 것을 가장 중요하게 생각합니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
