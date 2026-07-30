"use client";

import { motion } from "framer-motion";
import { t } from "@/lib/wedding/content";
import { GalleryMarquee } from "./GalleryMarquee";

const galleryImages = [
  "/assets/gallery-1-CndRyTXZ.jpg",
  "/assets/gallery-2-LJ9SqFT7.jpg",
  "/assets/gallery-3-BqTMMcNY.jpg",
  "/assets/gallery-4-D3agzgGx.jpg",
  "/assets/gallery-5-Ca9X0lht.jpg",
];

const galleryPositions = [
  "center 20%",
  "center 55%",
  "center 30%",
  "center 40%",
  "center 35%",
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
  "/assets/gallery-6-KQCB4EG9.jpg",
  "/assets/gallery-7-CHFbVCJd.jpg",
  "/assets/gallery-8-LSBB5t-f.jpg",
  "/assets/gallery-9-C_h0QLUe.jpg",
  "/assets/gallery-10-BbneIAac.jpg",
];

export const secondaryGalleryPositions = [
  "center 40%",
  "center 35%",
  "right 50%",
  "center 30%",
  "right 40%",
];
