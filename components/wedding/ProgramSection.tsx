"use client";

import { motion } from "framer-motion";
import { t } from "@/lib/wedding/content";

const schedule = [
  { time: "14:00", labelKey: "program.arrival" as const, side: "right" as const },
  { time: "14:30", labelKey: "program.ceremony" as const, side: "left" as const },
  { time: "16:00", labelKey: "program.cocktails" as const, side: "right" as const },
  { time: "18:00", labelKey: "program.dinner" as const, side: "left" as const },
  { time: "20:00", labelKey: "program.cake" as const, side: "right" as const },
  { time: "00:00", labelKey: "program.finish" as const, side: "left" as const },
];

export function ProgramSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        backgroundImage: "url(/assets/white-textured-paper-KasY8RAJ.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-7xl text-sage-dark mb-2">
            {t("program.title")}
          </h2>
          <p className="text-gold font-body tracking-wide font-medium">
            {t("program.date")}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-3 bottom-3 w-px bg-sage-dark/40 -translate-x-1/2" />
          <div className="space-y-0">
            {schedule.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                className="relative flex items-center py-3"
              >
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-px bg-sage-dark/40" />
                <div className="w-1/2 pr-8 text-right">
                  {item.side === "left" && (
                    <div>
                      <p className="font-body font-bold text-sage-dark tracking-[0.15em] text-sm md:text-base">
                        {item.time}
                      </p>
                      <p className="font-body text-sage-dark/80 tracking-[0.15em] uppercase text-xs md:text-sm mt-0.5">
                        {t(item.labelKey)}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-1/2 pl-8 text-left">
                  {item.side === "right" && (
                    <div>
                      <p className="font-body font-bold text-sage-dark tracking-[0.15em] text-sm md:text-base">
                        {item.time}
                      </p>
                      <p className="font-body text-sage-dark/80 tracking-[0.15em] uppercase text-xs md:text-sm mt-0.5">
                        {t(item.labelKey)}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DressCodeSection() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/assets/venue-hedsor-front-COdUzTcT.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="relative z-10 px-6 md:px-16 py-10 md:py-16">
        <div className="max-w-4xl mx-auto flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl border border-sage/30 p-8 md:p-12 shadow-lg text-center w-full max-w-2xl"
          >
            <h2 className="font-display text-4xl md:text-7xl text-sage-dark mb-8">
              {t("dress.title")}
            </h2>
            <div className="mb-8">
              <h3 className="font-display text-3xl md:text-4xl text-sage-dark mb-2">
                {t("dress.women")}
              </h3>
              <p className="text-sage-dark/70 font-body text-sm italic leading-relaxed max-w-md mx-auto">
                {t("dress.womenDesc")}
              </p>
            </div>
            <div className="w-16 h-px bg-sage/30 mx-auto mb-8" />
            <div>
              <h3 className="font-display text-3xl md:text-4xl text-sage-dark mb-2">
                {t("dress.men")}
              </h3>
              <p className="text-sage-dark/70 font-body text-sm italic leading-relaxed max-w-md mx-auto">
                {t("dress.menDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
