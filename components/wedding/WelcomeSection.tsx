"use client";

import { motion } from "framer-motion";
import { t } from "@/lib/wedding/content";
import { GalleryMarquee } from "./GalleryMarquee";

const galleryImages = [
  "/assets/images/DAMZ_0613copy.jpg",
  "/assets/images/DAMZ_0618copy.jpg",
  "/assets/images/DAMZ_0628copy.jpg",
  "/assets/images/DAMZ_0635copy.jpg",
  "/assets/images/DAMZ_0641copy.jpg",
  "/assets/images/DAMZ_0644copy.jpg",
  "/assets/images/DAMZ_0649copy.jpg",
  "/assets/images/DAMZ_0653copy.jpg",
];

const galleryPositions = [
  "center 25%",
  "center 30%",
  "center 25%",
  "center 30%",
  "center 25%",
  "center 30%",
  "center 25%",
  "center 30%",
];

export function WelcomeSection() {
  return (
    <section className="section-padding pb-0 bg-ivory">
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-7xl text-sage-dark mb-6"
        >
          {t("welcome.title")}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="text-sage-dark/90 font-body text-lg leading-relaxed italic">
            <p>{t("welcome.text")}</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full overflow-hidden"
      >
        <GalleryMarquee images={galleryImages} positions={galleryPositions} />
      </motion.div>
    </section>
  );
}

export const secondaryGalleryImages = [
  "/assets/images/DAMZ_0662copy.jpg",
  "/assets/images/DAMZ_0669copy.jpg",
  "/assets/images/DAMZ_0670copy.jpg",
  "/assets/images/DAMZ_0677copy.jpg",
  "/assets/images/DAMZ_0681copy.jpg",
  "/assets/images/DAMZ_0690copy.jpg",
  "/assets/images/DAMZ_0707copy.jpg",
];

export const secondaryGalleryPositions = [
  "center 25%",
  "center 30%",
  "center 25%",
  "center 30%",
  "center 25%",
  "center 30%",
  "center 25%",
];
