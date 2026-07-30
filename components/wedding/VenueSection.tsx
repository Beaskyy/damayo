"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { t } from "@/lib/wedding/content";

export function VenueSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#c5a46d" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="font-display text-4xl md:text-7xl mb-2"
            style={{ color: "#f9f7f2" }}
          >
            {t("events.title")}
          </h2>
          <p
            className="font-body tracking-wide font-medium"
            style={{ color: "#f9f7f2" }}
          >
            {t("events.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl border border-gold/20 p-8 shadow-lg text-center"
        >
          <img
            src="/assets/venue-hedsor-DSq2yQw3.png"
            alt="Finca El Olivar"
            className="w-full max-w-lg h-auto mx-auto mb-2"
            loading="lazy"
          />
          <h3 className="font-display text-3xl md:text-4xl text-sage-dark mb-6 border-b border-gold/20 pb-4">
            Finca El Olivar
          </h3>

          <div className="space-y-5 mb-8">
            <div className="flex items-center justify-center gap-3 text-sage-dark">
              <span className="font-body text-base tracking-wide italic opacity-70">
                {t("events.date")}
              </span>
              <span className="text-gold/40">·</span>
              <span className="font-display text-2xl">14:00</span>
            </div>
            <div className="w-12 h-px bg-gold/30 mx-auto" />
            <div className="flex flex-col items-center gap-1 text-sage-dark">
              <span className="font-body text-base tracking-wide">
                Camino de los Olivos s/n, Ronda
              </span>
              <span className="font-body text-sm tracking-wide opacity-70">
                Málaga, 29400 – España
              </span>
            </div>
          </div>

          <div
            className="w-full rounded-xl overflow-hidden mb-6"
            style={{ height: "240px" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12900!2d-5.1663!3d36.7422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0d7e4e0b0b0b0b%3A0x1234567890!2sRonda%2C%20M%C3%A1laga!5e0!3m2!1sen!2ses"
              width="100%"
              height="240"
              style={{
                border: 0,
                filter:
                  "sepia(0.25) saturate(0.6) hue-rotate(5deg) brightness(1.05)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Finca El Olivar, Ronda"
            />
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Finca+El+Olivar+Ronda+Malaga+Spain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm tracking-[0.15em] uppercase text-sage-dark/70 hover:text-gold transition-colors border-b border-gold/30 hover:border-gold pb-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            {t("events.openMaps")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
