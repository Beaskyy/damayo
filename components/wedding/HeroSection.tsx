"use client";

import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { t } from "@/lib/wedding/content";

interface HeroSectionProps {
  name1: string;
  name2: string;
  family1?: string;
  family2?: string;
}

export function HeroSection({
  name1,
  name2,
  family1 = "Oyeyinka",
  family2 = "Adams-Kilani",
}: HeroSectionProps) {
  const scrollToCountdown = () => {
    document
      .getElementById("countdown")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/hero-video-BkP1eoiB.mp4"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex flex-col items-center text-center px-6 pt-20 md:pt-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base tracking-[0.4em] uppercase text-white mb-4 font-body font-semibold drop-shadow-lg"
          >
            The families of
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-0"
          >
            <span className="font-display font-normal text-4xl md:text-6xl text-white block leading-[0.9] drop-shadow-lg">
              {family1}
            </span>
            <span className="font-display font-normal text-3xl md:text-4xl text-white my-4 block italic drop-shadow-lg">
              &
            </span>
            <span className="font-display font-normal text-4xl md:text-6xl text-white block leading-[0.9] drop-shadow-lg">
              {family2}
            </span>
          </motion.h1>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center text-center px-6 pb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <span className="h-px bg-white/70 w-12 md:w-24" />
            <span className="text-white text-xl drop-shadow-lg">✦</span>
            <span className="h-px bg-white/70 w-12 md:w-24" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-2xl md:text-4xl font-body tracking-widest text-white drop-shadow-lg font-light">
              {t("hero.date")}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        onClick={scrollToCountdown}
        className="relative z-10 flex flex-col items-center gap-2 text-center text-white hover:text-gold transition-colors cursor-pointer pb-8"
      >
        <span className="text-xs tracking-[0.3em] uppercase font-body drop-shadow-lg">
          {t("hero.rsvp")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 drop-shadow-lg" />
        </motion.div>
      </motion.button>
    </section>
  );
}

export function MusicToggle({
  isMuted,
  onToggle,
}: {
  isMuted: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gold/30 shadow-lg flex items-center justify-center text-sage-dark hover:bg-white hover:scale-110 transition-all duration-300"
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </motion.button>
  );
}
