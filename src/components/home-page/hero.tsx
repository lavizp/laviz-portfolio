import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextRoll } from '../motion-primitives/text-roll';
import { TextScramble } from '../motion-primitives/text-scramble';
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '500%']);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const gradientStyle = 'linear-gradient(180deg, #111132, #505064)';

  const planetsBgUrl = '/sun.png';
  return (
    <div
      className="w-full min-h-screen relative flex items-center justify-center overflow-hidden"
      ref={ref}
      style={{
        background: gradientStyle,
      }}
    >
      <motion.div
        style={{ y: yText }}
        className="flex flex-col gap-2 items-center"
      >
        <TextRoll className="text-white text-center text-7xl md:text-[100px] z-5 p-4 font-extrabold">
          LAVIZ PANDEY
        </TextRoll>
        <TextScramble
          className="font-mono text-md uppercase text-white"
          duration={1.2}
          characterSet="."
        >
          Welcome to my portfolio
        </TextScramble>
      </motion.div>
      <motion.div
        className="absolute w-full h-full bg-cover bg-bottom z-30"
        style={{ backgroundImage: `url('/mountains.png')` }}
      ></motion.div>
      <motion.div
        className="absolute w-full h-full bg-cover bg-bottom z-20"
        style={{
          y: yBg,
          backgroundImage: `url(${planetsBgUrl})`,
        }}
      ></motion.div>
      <motion.div
        className="absolute w-full h-full bg-cover bg-bottom z-10"
        style={{
          x: yBg,
          backgroundImage: `url('/stars.png')`,
        }}
      ></motion.div>
    </div>
  );
}
