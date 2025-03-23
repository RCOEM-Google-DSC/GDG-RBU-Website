/* eslint-disable */

"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarqueeDemo } from "../marquee";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.20]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <>
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden  bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden hidden md:block">
  <ElegantShape
    delay={0.3}
    width={640}
    height={180}
    rotate={32}
    gradient="bg-[linear-gradient(to_right,#0F9D58,#0F9D58)]"
    className="md:-left-[-66%] md:top-[16%]"
  />
  
  <ElegantShape
    delay={0.3}
    width={640}
    height={180}
    rotate={-32}
    gradient="bg-[linear-gradient(to_right,#EA4335,#EA4335)]"
    className="md:left-[-5%] md:top-[15%]"
  />

  <ElegantShape
    delay={0.5}
    width={700}
    height={180}
    rotate={32}
    gradient="bg-[linear-gradient(to_right,#4285F4,#4285F4)]"
    className="md:right-[60%] md:top-[65%]"
  />
  
  <ElegantShape
    delay={0.3}
    width={660}
    height={180}
    rotate={-32}
    gradient="bg-[linear-gradient(to_right,#FBBC04,#FBBC04)]"
    className="md:-left-[-66%] md:top-[65%]"
  />

</div>
<div className="block md:hidden">
  <ElegantShape
    delay={0.4}
    width={700}
    height={150}
    rotate={-40}
   gradient="bg-[linear-gradient(to_right,#EA4335,#EA4335)]"
    className="left-[-44%] -bottom-[-80%]"
  /> 

<ElegantShape
    delay={0.4}
    width={700}
    height={150}
    rotate={52}
   gradient="bg-[linear-gradient(to_right,#0F9D58,#0F9D58)]"
    className="right-[-116%] -bottom-[-40%]"
  /> 

  <ElegantShape
    delay={0.7}
    width={700}
    height={150}
    rotate={-48}
   gradient="bg-[linear-gradient(to_right,#FBBC04,#FBBC04)]"
    className="left-[35%] top-[46%]"
  /> 

  <ElegantShape
    delay={0.4}
    width={700}
    height={150}
    rotate={48}
    gradient="bg-[linear-gradient(to_right,#4285F4,#4285F4)]"
    className="left-[-85%] bottom-[20%]"
  />

  
</div>


      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.38] mb-8 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-rose-500/80" />
            <span className="text-sm text-white/80 tracking-wide">{badge}</span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-white/30">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-yellow-400 to-green-600 "
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal tracking-wide max-w-xl mx-auto px-4">
              Empowering students with cutting-edge tech skills, community, and
              resources for a future in technology. Join us to learn, build, and
              connect with fellow developers!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}

export { HeroGeometric };
