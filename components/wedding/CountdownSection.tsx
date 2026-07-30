"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { t } from "@/lib/wedding/content";
import { getCountdown } from "@/lib/wedding/utils";

export function CountdownSection({ targetDate }: { targetDate: string }) {
  const [countdown, setCountdown] = useState(getCountdown(targetDate));

  useEffect(() => {
    const update = () => setCountdown(getCountdown(targetDate));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const items = [
    { value: countdown.days, label: t("countdown.days") },
    { value: countdown.hours, label: t("countdown.hours") },
    { value: countdown.minutes, label: t("countdown.minutes") },
  ];

  return (
    <section
      id="countdown"
      className="py-16 md:py-20 px-4 relative overflow-hidden"
      style={{
        backgroundImage: "url(/assets/white-textured-paper-KasY8RAJ.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative max-w-xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-7xl text-sage-dark mb-1"
        >
          {t("countdown.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sage-dark/60 text-sm font-body tracking-[0.25em] uppercase mb-10"
        >
          {t("countdown.until")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          {items.map((item, index) => (
            <div key={item.label} className="flex items-center">
              <div className="flex flex-col items-center px-4 md:px-7">
                <span className="font-display text-4xl md:text-6xl text-sage-dark leading-none">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="mt-2 text-[10px] tracking-[0.25em] uppercase text-gold/80 font-body">
                  {item.label}
                </span>
              </div>
              {index < items.length - 1 && (
                <span className="w-px h-8 bg-sage-dark/20 mx-1 mb-4" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
