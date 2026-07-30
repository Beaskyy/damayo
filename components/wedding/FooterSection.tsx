"use client";

import { motion } from "framer-motion";
import { t } from "@/lib/wedding/content";
import { formatFooterDate } from "@/lib/wedding/utils";

export function FooterSection({
  name1,
  name2,
  date,
}: {
  name1: string;
  name2: string;
  date: string;
}) {
  const formatted = formatFooterDate(date);

  return (
    <footer
      className="py-16 text-center relative overflow-hidden"
      style={{
        backgroundImage: "url(/assets/white-textured-paper-KasY8RAJ.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <p className="font-display text-5xl md:text-6xl text-sage-dark mb-1 leading-tight">
          {name1}
        </p>
        <p className="font-display text-3xl md:text-4xl text-sage-dark italic mb-1">
          &
        </p>
        <p className="font-display text-5xl md:text-6xl text-sage-dark mb-2 leading-tight">
          {name2}
        </p>
        <p className="text-lg text-gold font-body font-semibold tracking-wide">
          {formatted}
        </p>
        <p className="text-sm text-sage-dark/60 mt-12 font-body font-medium">
          {t("footer.madeBy")}{" "}
          <a
            href="https://www.thedigitalyes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors underline underline-offset-2 font-semibold"
          >
            The Digital Yes
          </a>
        </p>
      </motion.div>
    </footer>
  );
}
